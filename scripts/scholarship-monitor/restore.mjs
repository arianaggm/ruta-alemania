import { execFile } from "node:child_process";
import { mkdir, mkdtemp, rename, rm, writeFile, appendFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { registry } from "./registry.mjs";
import { findRestorableSnapshot } from "./restore-core.mjs";

const execFileAsync = promisify(execFile);
const outputDir = process.env.SCHOLARSHIP_MONITOR_DIR || join(process.cwd(), "reports", "scholarship-monitor");
const maxArchiveBytes = 5_000_000;
const maxSnapshotBytes = 2_000_000;

async function githubJson(path, token, repository) {
  const response = await fetch(`${process.env.GITHUB_API_URL || "https://api.github.com"}/repos/${repository}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`GitHub API respondió HTTP ${response.status} al consultar ${path.split("?")[0]}.`);
  return response.json();
}

async function listArtifacts(token, repository) {
  const artifacts = [];
  for (let page = 1; page <= 10; page += 1) {
    const result = await githubJson(`/actions/artifacts?per_page=100&page=${page}`, token, repository);
    if (!Array.isArray(result.artifacts)) throw new Error("GitHub devolvió una lista de artefactos inválida.");
    artifacts.push(...result.artifacts);
    if (artifacts.length >= result.total_count || result.artifacts.length < 100) return artifacts;
  }
  throw new Error("Hay demasiados artefactos para revisar con seguridad.");
}

async function readBounded(response, maxBytes) {
  const announced = Number(response.headers.get("content-length"));
  if (announced > maxBytes) throw new Error("El artefacto supera el tamaño permitido.");
  const reader = response.body?.getReader();
  if (!reader) throw new Error("El artefacto está vacío.");
  const chunks = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      throw new Error("El artefacto supera el tamaño permitido.");
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}

async function downloadSnapshot(artifact, token, repository) {
  const apiUrl = `${process.env.GITHUB_API_URL || "https://api.github.com"}/repos/${repository}/actions/artifacts/${artifact.id}/zip`;
  const response = await fetch(apiUrl, {
    headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${token}` },
    redirect: "manual",
    signal: AbortSignal.timeout(20_000),
  });
  if (response.status !== 302) throw new Error(`La descarga respondió HTTP ${response.status}.`);
  const location = response.headers.get("location");
  if (!location || new URL(location).protocol !== "https:") throw new Error("La descarga no proporcionó una URL HTTPS válida.");
  const archiveResponse = await fetch(location, { signal: AbortSignal.timeout(30_000) });
  if (!archiveResponse.ok) throw new Error(`La descarga del artefacto respondió HTTP ${archiveResponse.status}.`);
  const archive = await readBounded(archiveResponse, maxArchiveBytes);
  const directory = await mkdtemp(join(tmpdir(), "ruta-alemania-snapshot-"));
  try {
    const zipPath = join(directory, "snapshot.zip");
    await writeFile(zipPath, archive);
    const { stdout: listing } = await execFileAsync("unzip", ["-Z1", zipPath], {
      encoding: "utf8", maxBuffer: 20_000, timeout: 10_000,
    });
    const names = new Set(listing.trim().split(/\r?\n/));
    if (!names.has("snapshots.json")) throw new Error("El artefacto no contiene snapshots.json.");
    const { stdout: snapshotText } = await execFileAsync("unzip", ["-p", zipPath, "snapshots.json"], {
      encoding: "utf8",
      maxBuffer: maxSnapshotBytes,
      timeout: 10_000,
    });
    if (Buffer.byteLength(snapshotText, "utf8") > maxSnapshotBytes) throw new Error("El snapshot supera el tamaño permitido.");
    let notificationStateText = null;
    if (names.has("notification-state.json")) {
      const extracted = await execFileAsync("unzip", ["-p", zipPath, "notification-state.json"], {
        encoding: "utf8", maxBuffer: 100_000, timeout: 10_000,
      });
      notificationStateText = extracted.stdout;
    }
    return { snapshotText, notificationStateText };
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

async function writeStatus(status) {
  await mkdir(outputDir, { recursive: true });
  await writeFile(join(outputDir, "restore-status.json"), `${JSON.stringify(status, null, 2)}\n`, "utf8");
  if (process.env.GITHUB_STEP_SUMMARY) {
    const summary = status.kind === "restored"
      ? `Snapshot restaurado del run ${status.runId} (artefacto ${status.artifactId}).`
      : status.kind === "new-baseline" ? status.reason : `Restauración fallida: ${status.reason}`;
    await appendFile(process.env.GITHUB_STEP_SUMMARY, `## Monitoreo de becas\n\n${summary}\n`, "utf8");
  }
}

async function main() {
  const { GITHUB_TOKEN: token, GITHUB_REPOSITORY: repository, GITHUB_RUN_ID: currentRunId, GITHUB_REF_NAME: branch } = process.env;
  if (!token || !/^[\w.-]+\/[\w.-]+$/.test(repository ?? "") || !/^\d+$/.test(currentRunId ?? "") || !branch) {
    throw new Error("Faltan datos seguros del contexto de GitHub Actions.");
  }
  const artifacts = await listArtifacts(token, repository);
  const runCache = new Map();
  const result = await findRestorableSnapshot({
    artifacts,
    currentRunId,
    branch,
    registry,
    getRun: async (id) => {
      if (!runCache.has(id)) runCache.set(id, await githubJson(`/actions/runs/${id}`, token, repository));
      return runCache.get(id);
    },
    downloadSnapshot: (artifact) => downloadSnapshot(artifact, token, repository),
  });
  if (result.kind === "restored") {
    const path = join(outputDir, "snapshots.json");
    await mkdir(outputDir, { recursive: true });
    const temporary = `${path}.${process.pid}.tmp`;
    await writeFile(temporary, `${JSON.stringify(result.store, null, 2)}\n`, "utf8");
    await rename(temporary, path);
    const statePath = join(outputDir, "notification-state.json");
    const stateTemporary = `${statePath}.${process.pid}.tmp`;
    await writeFile(stateTemporary, `${JSON.stringify(result.notificationState, null, 2)}\n`, "utf8");
    await rename(stateTemporary, statePath);
  }
  const status = result.kind === "restored"
    ? { kind: result.kind, artifactId: result.artifactId, runId: result.runId, warnings: result.warnings }
    : { kind: result.kind, reason: result.reason, warnings: result.warnings };
  await writeStatus(status);
  console.log(status.kind === "restored" ? `Snapshot restaurado: ejecución ${status.runId}, artefacto ${status.artifactId}.` : status.reason);
  for (const warning of status.warnings) console.warn(warning);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main().catch(async (error) => {
    const reason = error instanceof Error ? error.message : String(error);
    console.error(reason);
    try {
      await writeStatus({ kind: "restore-failed", reason });
      await writeFile(join(outputDir, "latest.md"), `# Monitoreo editorial de becas\n\nRestauración fallida: ${reason}\n\nNo se consultaron las fuentes ni se estableció una nueva línea de base.\n`, "utf8");
    } catch (writeError) {
      console.error(writeError);
    }
    process.exitCode = 1;
  });
}
