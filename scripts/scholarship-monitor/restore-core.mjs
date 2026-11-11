import { validateSnapshotStore } from "./core.mjs";
import { emptyNotificationState, validateNotificationState } from "./notifications-core.mjs";

const workflowPath = ".github/workflows/scholarship-monitor.yml";
const isSnapshotName = (name) =>
  name === "scholarship-monitor-snapshot" ||
  /^scholarship-monitor-snapshot-\d+-\d+$/.test(name);

export function snapshotCandidates(artifacts, currentRunId) {
  return artifacts
    .filter((artifact) =>
      artifact &&
      !artifact.expired &&
      isSnapshotName(artifact.name) &&
      Number.isSafeInteger(artifact.id) &&
      Number.isSafeInteger(artifact.workflow_run?.id) &&
      String(artifact.workflow_run.id) !== String(currentRunId),
    )
    .sort((left, right) =>
      Date.parse(right.created_at) - Date.parse(left.created_at) || right.id - left.id,
    );
}

export async function findRestorableSnapshot({
  artifacts,
  currentRunId,
  branch,
  getRun,
  downloadSnapshot,
  registry,
}) {
  const candidates = snapshotCandidates(artifacts, currentRunId);
  const warnings = [];
  let priorSuccessfulRuns = 0;

  for (const artifact of candidates) {
    // A named artifact alone is not proof that its workflow completed successfully.
    const run = await getRun(artifact.workflow_run.id);
    if (
      run.id !== artifact.workflow_run.id ||
      run.conclusion !== "success" ||
      run.head_branch !== branch ||
      !(run.path === workflowPath || run.path?.startsWith(`${workflowPath}@`))
    ) continue;

    priorSuccessfulRuns += 1;
    try {
      const downloaded = await downloadSnapshot(artifact);
      const store = validateSnapshotStore(
        JSON.parse(typeof downloaded === "string" ? downloaded : downloaded.snapshotText), registry,
      );
      const notificationState = downloaded.notificationStateText
        ? validateNotificationState(JSON.parse(downloaded.notificationStateText), registry)
        : emptyNotificationState();
      return {
        kind: "restored",
        store,
        notificationState,
        artifactId: artifact.id,
        runId: run.id,
        warnings,
      };
    } catch (error) {
      warnings.push(`Artefacto ${artifact.id} de la ejecución ${run.id}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (priorSuccessfulRuns > 0) {
    throw new Error(`No se pudo restaurar ningún snapshot válido de ejecuciones exitosas. ${warnings.join(" ")}`);
  }

  const namedArtifacts = artifacts.filter((artifact) => isSnapshotName(artifact?.name));
  const reason = namedArtifacts.length === 0
    ? "Primera ejecución sin snapshot previo; se establecerá una línea de base nueva."
    : candidates.length === 0
      ? "No hay snapshots anteriores vigentes de otra ejecución; se establecerá una línea de base nueva."
      : "No hay un snapshot vigente de una ejecución exitosa en esta rama; se establecerá una línea de base nueva.";
  return {
    kind: "new-baseline",
    reason,
    warnings,
  };
}

export function describeComparison(status, missing) {
  if (status?.kind === "restored" && !missing && Number.isSafeInteger(status.runId) && Number.isSafeInteger(status.artifactId)) {
    const warnings = Array.isArray(status.warnings) && status.warnings.length
      ? ` Se descartaron artefactos posteriores: ${status.warnings.join(" ")}`
      : "";
    return `Snapshot restaurado de la ejecución ${status.runId} (artefacto ${status.artifactId}).${warnings}`;
  }
  if (status?.kind === "new-baseline" && missing && typeof status.reason === "string") return status.reason;
  throw new Error("El estado de restauración no coincide con el snapshot disponible. No se ejecutará el monitoreo.");
}
