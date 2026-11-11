import assert from "node:assert/strict";
import { test } from "node:test";
import { registry } from "../scripts/scholarship-monitor/registry.mjs";
import { alertEmail, deliverPlanned, emptyNotificationState, planAlerts, validateNotificationState } from "../scripts/scholarship-monitor/notifications-core.mjs";
import { sendBrevo } from "../scripts/scholarship-monitor/notify.mjs";

const hash = "a".repeat(64);
const runUrl = "https://github.com/example/ruta-alemania/actions/runs/123";
const credentials = { apiKey: "test-key", sender: "sender@example.org", recipient: "editor@example.org" };
const results = (overrides = {}) => ({
  version: 1,
  rows: registry.map((item) => ({ id: item.id, status: "unchanged", hash: null, changes: [], error: null, ...overrides[item.id] })),
});

test("baseline and unchanged sources produce no change email", async () => {
  const baseline = results(Object.fromEntries(registry.map((item) => [item.id, { status: "baseline" }])));
  const planned = planAlerts(baseline, emptyNotificationState(), registry);
  assert.deepEqual(planned.alerts, []);
  const outcome = await deliverPlanned({ ...planned, testMode: false, credentials, runUrl, send: () => assert.fail("No email expected") });
  assert.equal(outcome.status, "no-action");
  assert.deepEqual(planAlerts(results(), outcome.state, registry).alerts, []);
});

test("six new baselines do not alert while an existing source changes", () => {
  const oldId = registry[0].id;
  const mixed = results({
    [oldId]: { status: "content-changed", hash, changes: [] },
    ...Object.fromEntries(registry.slice(6).map((item) => [item.id, { status: "baseline" }])),
  });
  const priorState = { version: 1, sources: {
    [registry[1].id]: { outageAlerted: true, lastAlertedHash: null, pendingChange: null },
  } };
  const planned = planAlerts(mixed, priorState, registry);
  assert.deepEqual(planned.alerts.map((alert) => alert.id), [oldId]);
  assert.equal(planned.alerts[0].kind, "content-change");
  assert.deepEqual(planned.state.sources[registry[1].id], {
    outageAlerted: false, lastAlertedHash: null, pendingChange: null,
  });
  for (const item of registry.slice(6)) assert.equal(planned.state.sources[item.id].pendingChange, null);
});

test("content changes include official links, old/new values, run link and an editorial warning", async () => {
  const id = registry[0].id;
  const planned = planAlerts(results({ [id]: {
    status: "content-changed", hash,
    changes: [{ field: "deadline", old: "Antes", new: "Ahora" }],
  } }), emptyNotificationState(), registry);
  assert.equal(planned.alerts.length, 1);
  const email = alertEmail(planned.alerts, runUrl);
  assert.equal(email.subject, "Ruta Alemania — Cambios detectados en becas");
  assert.match(email.textContent, /Antes/);
  assert.match(email.textContent, /Ahora/);
  assert.match(email.textContent, /NO confirma que una beca esté abierta/);
  assert.ok(email.textContent.includes(registry[0].sourceUrl));
  assert.ok(email.textContent.includes(runUrl));
  assert.ok(!email.textContent.includes(registry[1].title));
  const sent = await deliverPlanned({ ...planned, testMode: false, credentials, runUrl, send: async () => {} });
  assert.equal(sent.status, "sent");
  assert.deepEqual(planAlerts(results({ [id]: { status: "content-changed", hash, changes: [] } }), sent.state, registry).alerts, []);
});

test("delivery failure keeps a pending content alert across an unchanged next run", async () => {
  const id = registry[0].id;
  const planned = planAlerts(results({ [id]: { status: "content-changed", hash, changes: [] } }), emptyNotificationState(), registry);
  const failed = await deliverPlanned({ ...planned, testMode: false, credentials, runUrl, send: async () => { throw new Error("secret must not appear"); } });
  assert.equal(failed.status, "failed");
  assert.ok(!failed.message.includes("secret"));
  const retried = planAlerts(results(), failed.state, registry);
  assert.equal(retried.alerts.length, 1);
  assert.equal(retried.alerts[0].kind, "content-change");
});

test("an outage alerts once, stays quiet while persistent, and alerts again after recovery", async () => {
  const id = registry[2].id;
  const outage = results({ [id]: { status: "source-unavailable", error: "HTTP 429" } });
  const first = planAlerts(outage, emptyNotificationState(), registry);
  assert.equal(first.alerts[0].kind, "source-unavailable");
  assert.match(alertEmail(first.alerts, runUrl).textContent, /Problema de monitoreo/);
  const accepted = await deliverPlanned({ ...first, testMode: false, credentials, runUrl, send: async () => {} });
  assert.deepEqual(planAlerts(outage, accepted.state, registry).alerts, []);
  const recovered = planAlerts(results(), accepted.state, registry);
  assert.equal(recovered.state.sources[id].outageAlerted, false);
  assert.equal(planAlerts(outage, recovered.state, registry).alerts.length, 1);
});

test("missing credentials skip delivery without dropping a pending alert", async () => {
  const id = registry[0].id;
  const planned = planAlerts(results({ [id]: { status: "content-changed", hash, changes: [] } }), emptyNotificationState(), registry);
  const outcome = await deliverPlanned({ ...planned, testMode: false, credentials: { ...credentials, apiKey: "" }, runUrl, send: () => assert.fail("No API call expected") });
  assert.equal(outcome.status, "skipped");
  assert.equal(outcome.state.sources[id].pendingChange.hash, hash);
  assert.match(outcome.message, /omitida/);
});

test("explicit test mode sends only a labeled TEST email and does not acknowledge real changes", async () => {
  const id = registry[0].id;
  const planned = planAlerts(results({ [id]: { status: "content-changed", hash, changes: [] } }), emptyNotificationState(), registry);
  let message;
  const outcome = await deliverPlanned({ ...planned, testMode: true, credentials, runUrl, send: async (value) => { message = value; } });
  assert.equal(outcome.status, "test-sent");
  assert.match(message.subject, /^\[PRUEBA\]/);
  assert.ok(!message.textContent.includes(registry[0].title));
  assert.equal(outcome.state.sources[id].pendingChange.hash, hash);
});

test("Brevo request is plain text and API failures do not expose credentials", async () => {
  let captured;
  await sendBrevo({ subject: "Prueba", textContent: "Texto" }, credentials, async (url, options) => {
    captured = { url, options };
    return { ok: true, json: async () => ({ messageId: "accepted" }) };
  });
  assert.equal(captured.url, "https://api.brevo.com/v3/smtp/email");
  assert.equal(captured.options.headers["api-key"], credentials.apiKey);
  assert.equal(JSON.parse(captured.options.body).textContent, "Texto");
  await assert.rejects(sendBrevo({ subject: "Prueba", textContent: "Texto" }, credentials, async () => ({ ok: false, status: 401 })), /HTTP 401/);
  const planned = planAlerts(results({ [registry[0].id]: { status: "content-changed", hash, changes: [] } }), emptyNotificationState(), registry);
  const outcome = await deliverPlanned({ ...planned, testMode: false, credentials, runUrl,
    send: (message, values) => sendBrevo(message, values, async () => ({ ok: false, status: 429 })),
  });
  assert.match(outcome.message, /HTTP 429/);
  assert.ok(!outcome.message.includes(credentials.apiKey));
  assert.throws(() => validateNotificationState({ version: 1, sources: { [registry[0].id]: { outageAlerted: "yes" } } }, registry));
});
