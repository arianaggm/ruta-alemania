import { appendFile, readFile, rename, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { registry } from "./registry.mjs";
import { deliverPlanned, emptyNotificationState, NotificationDeliveryError, planAlerts, validateNotificationState } from "./notifications-core.mjs";

const outputDir = process.env.SCHOLARSHIP_MONITOR_DIR || join(process.cwd(), "reports", "scholarship-monitor");
const statePath = join(outputDir, "notification-state.json");

export async function sendBrevo(message, credentials, fetchImpl = fetch) {
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.test(credentials.sender) || !email.test(credentials.recipient)) throw new NotificationDeliveryError("Dirección de correo inválida.");
  let response;
  try {
    response = await fetchImpl("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": credentials.apiKey,
      },
      body: JSON.stringify({
        sender: { name: "Ruta Alemania", email: credentials.sender },
        to: [{ email: credentials.recipient }],
        subject: message.subject,
        textContent: message.textContent,
      }),
      signal: AbortSignal.timeout(20_000),
    });
  } catch {
    throw new NotificationDeliveryError("Error de conexión con Brevo.");
  }
  if (!response.ok) throw new NotificationDeliveryError(`Brevo respondió HTTP ${response.status}.`);
  let payload;
  try { payload = await response.json(); } catch { throw new NotificationDeliveryError("Respuesta inválida de Brevo."); }
  if (typeof payload?.messageId !== "string" || !payload.messageId) throw new NotificationDeliveryError("Brevo no confirmó un identificador de mensaje.");
}

async function readState() {
  try {
    return validateNotificationState(JSON.parse(await readFile(statePath, "utf8")), registry);
  } catch (error) {
    if (error?.code === "ENOENT") return emptyNotificationState();
    throw error;
  }
}

async function writeState(state) {
  validateNotificationState(state, registry);
  const temporary = `${statePath}.${process.pid}.tmp`;
  await writeFile(temporary, `${JSON.stringify(state, null, 2)}\n`, "utf8");
  await rename(temporary, statePath);
}

async function record(status, message) {
  await writeFile(join(outputDir, "notification-status.json"), `${JSON.stringify({ status, message }, null, 2)}\n`, "utf8");
  await appendFile(join(outputDir, "latest.md"), `\n## Notificación editorial\n\n${message}\n`, "utf8");
  if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, `\nNotificación editorial: ${message}\n`, "utf8");
  console.log(message);
  if (status === "failed") console.log("::warning::La notificación editorial falló; revisa latest.md.");
}

async function main() {
  const results = JSON.parse(await readFile(join(outputDir, "monitor-results.json"), "utf8"));
  const { state, alerts } = planAlerts(results, await readState(), registry);
  await writeState(state); // Queue changes before contacting Brevo so a delivery failure can be retried.
  const runUrl = `${process.env.GITHUB_SERVER_URL || ""}/${process.env.GITHUB_REPOSITORY || ""}/actions/runs/${process.env.GITHUB_RUN_ID || ""}`;
  const outcome = await deliverPlanned({
    state, alerts,
    testMode: process.env.SCHOLARSHIP_NOTIFICATION_TEST === "true",
    credentials: {
      apiKey: process.env.BREVO_API_KEY,
      sender: process.env.BREVO_SENDER_EMAIL,
      recipient: process.env.SCHOLARSHIP_ALERT_EMAIL,
    },
    runUrl,
    send: sendBrevo,
  });
  if (outcome.status === "sent") await writeState(outcome.state);
  await record(outcome.status, outcome.message);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main().catch(async () => {
    try { await record("failed", "No se pudo confirmar el estado final de la notificación por datos locales inválidos o un error de escritura. Revisa Brevo antes de reintentar."); }
    catch { console.error("No se pudo registrar el fallo de notificación."); }
    process.exitCode = 1;
  });
}
