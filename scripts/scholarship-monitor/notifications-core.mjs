const statuses = new Set(["baseline", "unchanged", "content-changed", "source-unavailable"]);
const hashPattern = /^[a-f0-9]{64}$/;

export class NotificationDeliveryError extends Error {}

export function emptyNotificationState() {
  return { version: 1, sources: {} };
}

export function validateNotificationState(value, registry) {
  if (!value || value.version !== 1 || !value.sources || typeof value.sources !== "object" || Array.isArray(value.sources)) {
    throw new Error("Estado de notificaciones incompatible.");
  }
  const ids = new Set(registry.map((item) => item.id));
  for (const [id, source] of Object.entries(value.sources)) {
    const pending = source?.pendingChange;
    if (!ids.has(id) || !source || typeof source !== "object" || typeof source.outageAlerted !== "boolean" ||
      !(source.lastAlertedHash === null || hashPattern.test(source.lastAlertedHash)) ||
      !(pending === null || (pending && hashPattern.test(pending.hash) && Array.isArray(pending.changes) && pending.changes.length <= 8 && pending.changes.every((change) =>
        typeof change.field === "string" && change.field.length <= 40 &&
        (change.old === null || typeof change.old === "string" && change.old.length <= 1_500) &&
        (change.new === null || typeof change.new === "string" && change.new.length <= 1_500))))) {
      throw new Error(`Estado de notificaciones inválido: ${id}.`);
    }
  }
  return value;
}

export function validateMonitorResults(value, registry) {
  if (!value || value.version !== 1 || !Array.isArray(value.rows) || value.rows.length !== registry.length) {
    throw new Error("Resultados del monitoreo incompatibles.");
  }
  const ids = new Set(registry.map((item) => item.id));
  const seen = new Set();
  for (const row of value.rows) {
    if (!ids.has(row?.id) || seen.has(row.id) || !statuses.has(row.status) ||
      (row.status === "content-changed" && !hashPattern.test(row.hash)) ||
      !Array.isArray(row.changes)) throw new Error("Resultados del monitoreo inválidos.");
    seen.add(row.id);
  }
  return value;
}

export function planAlerts(results, previousState, registry) {
  validateMonitorResults(results, registry);
  validateNotificationState(previousState, registry);
  const state = structuredClone(previousState);
  const alerts = [];
  for (const row of results.rows) {
    const source = state.sources[row.id] ?? { outageAlerted: false, lastAlertedHash: null, pendingChange: null };
    if (row.status === "content-changed" && row.hash !== source.lastAlertedHash) {
      source.pendingChange = {
        hash: row.hash,
        changes: row.changes.slice(0, 8).map((change) => ({
          field: String(change.field).slice(0, 40),
          old: change.old === null ? null : String(change.old).slice(0, 500),
          new: change.new === null ? null : String(change.new).slice(0, 500),
        })),
      };
    }
    if (row.status === "content-changed" && row.hash === source.lastAlertedHash) source.pendingChange = null;
    if (row.status !== "source-unavailable") source.outageAlerted = false;
    state.sources[row.id] = source;
    const target = registry.find((item) => item.id === row.id);
    if (source.pendingChange) {
      alerts.push({ id: row.id, kind: "content-change", title: target.title, url: target.sourceUrl, ...source.pendingChange });
    }
    if (row.status === "source-unavailable" && !source.outageAlerted) {
      alerts.push({ id: row.id, kind: "source-unavailable", title: target.title, url: target.sourceUrl, reason: String(row.error ?? "La fuente no respondió.").slice(0, 300) });
    }
  }
  return { state, alerts };
}

export function markAlertsAccepted(state, alerts) {
  const updated = structuredClone(state);
  for (const alert of alerts) {
    const source = updated.sources[alert.id];
    if (alert.kind === "content-change" && source.pendingChange?.hash === alert.hash) {
      source.lastAlertedHash = alert.hash;
      source.pendingChange = null;
    }
    if (alert.kind === "source-unavailable") source.outageAlerted = true;
  }
  return updated;
}

const fieldNames = {
  deadline: "Fecha límite", eligibility: "Elegibilidad", amounts: "Importes",
  requirements: "Requisitos", applicationLink: "Solicitud", applicationLinks: "Enlaces de solicitud",
};

export function alertEmail(alerts, runUrl) {
  const lines = ["Ruta Alemania detectó información que requiere revisión editorial.", "", "Una detección NO confirma que una beca esté abierta ni que sus condiciones apliquen a estudiantes de México.", ""];
  for (const alert of alerts) {
    lines.push(alert.title, alert.url);
    if (alert.kind === "content-change") {
      lines.push("Cambio de contenido detectado respecto al último snapshot válido.");
      if (alert.changes.length) {
        for (const change of alert.changes) {
          lines.push(`- ${fieldNames[change.field] ?? change.field}: antes ${JSON.stringify(change.old)}; ahora ${JSON.stringify(change.new)}`);
        }
      } else lines.push("- Cambió el texto de la página; revisa la fuente y el informe.");
    } else {
      lines.push("Problema de monitoreo: no se pudo consultar la fuente.", `- ${alert.reason}`);
    }
    lines.push("");
  }
  lines.push(`Ejecución de GitHub Actions: ${runUrl}`, "", "Revisa las fuentes oficiales y el informe antes de modificar el catálogo público.");
  return {
    subject: "Ruta Alemania — Cambios detectados en becas",
    textContent: lines.join("\n"),
  };
}

export function testEmail(runUrl) {
  return {
    subject: "[PRUEBA] Ruta Alemania — Cambios detectados en becas",
    textContent: `PRUEBA de notificaciones editoriales de Ruta Alemania.\n\nEste mensaje no informa cambios reales ni confirma convocatorias abiertas.\n\nEjecución de GitHub Actions: ${runUrl}`,
  };
}

export async function deliverPlanned({ state, alerts, testMode, credentials, runUrl, send }) {
  if (!credentials.apiKey || !credentials.sender || !credentials.recipient) {
    return { state, status: "skipped", message: "Notificación omitida: faltan secretos de Brevo, remitente o destinatario." };
  }
  if (!testMode && alerts.length === 0) {
    return { state, status: "no-action", message: "Sin cambios nuevos ni problemas de monitoreo pendientes; no se envió correo." };
  }
  if (!/^https:\/\/github\.com\/[^/]+\/[^/]+\/actions\/runs\/\d+$/.test(runUrl)) {
    return { state, status: "failed", message: "No hay una URL válida de la ejecución de GitHub Actions." };
  }
  try {
    await send(testMode ? testEmail(runUrl) : alertEmail(alerts, runUrl), credentials);
    return testMode
      ? { state, status: "test-sent", message: "Correo de PRUEBA aceptado por Brevo; no se marcaron alertas reales como enviadas." }
      : { state: markAlertsAccepted(state, alerts), status: "sent", message: `Brevo aceptó una alerta editorial sobre ${alerts.length} cambio(s) o problema(s).` };
  } catch (error) {
    const detail = error instanceof NotificationDeliveryError ? ` ${error.message}` : "";
    return { state, status: "failed", message: `Brevo no aceptó el correo o falló la conexión.${detail} Las alertas quedan pendientes para otro run.` };
  }
}
