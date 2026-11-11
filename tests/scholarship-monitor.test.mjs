import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { scholarships } from "../app/_data/scholarships.ts";
import { registry } from "../scripts/scholarship-monitor/registry.mjs";
import { compareSnapshots, extractSnapshot, parseRobots, renderReport, validateSnapshotStore } from "../scripts/scholarship-monitor/core.mjs";
import { describeComparison, findRestorableSnapshot, snapshotCandidates } from "../scripts/scholarship-monitor/restore-core.mjs";

const before = readFileSync(new URL("./fixtures/scholarship-source-before.html", import.meta.url), "utf8");
const after = readFileSync(new URL("./fixtures/scholarship-source-after.html", import.meta.url), "utf8");
const url = "https://official.example/scholarship";

test("registry matches twelve catalog records while preserving the original six IDs and editorial status", () => {
  assert.equal(registry.length, 12);
  assert.equal(scholarships.length, 12);
  assert.equal(new Set(registry.map((item) => item.id)).size, 12);
  assert.equal(new Set(registry.map((item) => item.sourceUrl)).size, 12);
  assert.deepEqual(registry.slice(0, 6).map((item) => item.id), [
    "daad-epos", "daad-study-scholarships", "heinrich-boell", "deutschlandstipendium", "friedrich-ebert", "erasmus-mobility",
  ]);
  assert.deepEqual(registry.map((item) => item.title), scholarships.map((item) => item.title));
  for (const [index, item] of registry.entries()) {
    assert.equal(item.sourceUrl, scholarships[index].sourceUrl);
    assert.equal(item.sourceUrl, scholarships[index].officialUrl);
    assert.equal(item.catalogVerificationStatus, scholarships[index].verificationStatus);
    assert.equal(item.catalogLastChecked, scholarships[index].lastChecked);
    assert.equal(scholarships[index].verificationStatus, "pending");
    assert.equal(scholarships[index].lastChecked, null);
  }
  assert.notEqual(registry[5].id, registry[6].id);
  assert.notEqual(registry[5].sourceUrl, registry[6].sourceUrl);
});

test("a restored six-source artifact keeps old history and gives new sources independent baselines", async () => {
  const entries = Object.fromEntries(registry.slice(0, 6).map((item) => [
    item.id, extractSnapshot(before, item.sourceUrl, "Study Scholarships", "2026-11-01T00:00:00Z"),
  ]));
  const restored = await findRestorableSnapshot({
    artifacts: [artifact(11, 1)], currentRunId: "2", branch: "main", registry,
    getRun: async (id) => successfulRun(id),
    downloadSnapshot: async () => JSON.stringify({ version: 1, entries }),
  });
  assert.equal(restored.kind, "restored");
  const store = restored.store;
  const original = structuredClone(store.entries);
  const statuses = registry.map((item) => {
    const current = extractSnapshot(before, item.sourceUrl, "Study Scholarships", "2026-11-11T00:00:00Z");
    const comparison = compareSnapshots(store.entries[item.id], current);
    store.entries[item.id] = current;
    return comparison.status;
  });
  assert.deepEqual(statuses.slice(0, 6), Array(6).fill("unchanged"));
  assert.deepEqual(statuses.slice(6), Array(6).fill("baseline"));
  assert.deepEqual(Object.keys(store.entries).slice(0, 6), Object.keys(original));
  for (const id of Object.keys(original)) assert.equal(store.entries[id].hash, original[id].hash);
});

test("HTML fixture extracts only explicit section text and detects old/new changes", () => {
  const old = extractSnapshot(before, url, "Study Scholarships", "2026-11-01T00:00:00Z");
  const next = extractSnapshot(after, url, "Study Scholarships", "2026-11-10T00:00:00Z");
  assert.equal(old.fields.deadline, "Consult the current call.");
  assert.deepEqual(compareSnapshots(old, next).changes, [
    { field: "deadline", old: "Consult the current call.", new: "See the new call for dates." },
  ]);
  assert.equal(compareSnapshots(old, next).status, "content-changed");
  assert.equal(compareSnapshots(next, next).status, "unchanged");
  assert.equal(compareSnapshots(null, next).status, "baseline");
  assert.throws(() => extractSnapshot("<html>Blocked</html>", url, "Study Scholarships", "now"));
});

test("robots rules deny disallowed paths and honor a more specific allow", () => {
  const rules = parseRobots("User-agent: *\nDisallow: /private\nAllow: /private/public\nCrawl-delay: 3");
  assert.equal(rules.allows("https://official.example/private/file"), false);
  assert.equal(rules.allows("https://official.example/private/public/page"), true);
  assert.equal(rules.delayMs, 3_000);
});

test("snapshot validation rejects malformed stores without losing the old snapshot", () => {
  const valid = extractSnapshot(before, registry[0].sourceUrl, "Study Scholarships", "2026-11-01T00:00:00Z");
  assert.equal(validateSnapshotStore({ version: 1, entries: { [registry[0].id]: valid } }, registry).entries[registry[0].id].hash, valid.hash);
  assert.throws(() => validateSnapshotStore({ version: 2, entries: {} }, registry));
  assert.throws(() => validateSnapshotStore({ version: 1, entries: { [registry[0].id]: { ...valid, hash: "bad" } } }, registry));
});

test("editorial report identifies unavailable sources and field differences", () => {
  const report = renderReport([
    { ...registry[0], status: "source-unavailable", checkedAt: null, reviewNeeded: true, error: "HTTP 429" },
    { ...registry[1], status: "content-changed", checkedAt: "now", reviewNeeded: true, changes: [{ field: "deadline", old: "old", new: "new" }] },
  ], "now");
  assert.match(report, /HTTP 429/);
  assert.match(report, /anterior: "old"; nuevo: "new"/);
  assert.match(report, /https:\/\/www2.daad.de/);
});

const saved = {
  version: 1,
  entries: {
    [registry[0].id]: extractSnapshot(before, registry[0].sourceUrl, "Study Scholarships", "2026-11-01T00:00:00Z"),
  },
};
const artifact = (id, runId, name = `scholarship-monitor-snapshot-${runId}-1`) => ({
  id,
  name,
  expired: false,
  created_at: `2026-11-${String(id).padStart(2, "0")}T00:00:00Z`,
  workflow_run: { id: runId },
});
const successfulRun = (id) => ({
  id,
  conclusion: "success",
  head_branch: "main",
  path: ".github/workflows/scholarship-monitor.yml@main",
});

test("first workflow run explicitly establishes a new baseline", async () => {
  const result = await findRestorableSnapshot({
    artifacts: [], currentRunId: "1", branch: "main", registry,
    getRun: () => assert.fail("No prior run should be consulted"),
    downloadSnapshot: () => assert.fail("No artifact should be downloaded"),
  });
  assert.equal(result.kind, "new-baseline");
  assert.match(result.reason, /Primera ejecución.*línea de base nueva/);
  const report = renderReport([{ ...registry[0], status: "baseline", reviewNeeded: true }], "now", result.reason);
  assert.match(report, /Comparación:.*línea de base nueva/);
});

test("second workflow run restores the legacy first-run artifact and compares unchanged content", async () => {
  const result = await findRestorableSnapshot({
    artifacts: [artifact(11, 1, "scholarship-monitor-snapshot")],
    currentRunId: "2", branch: "main", registry,
    getRun: async (id) => successfulRun(id),
    downloadSnapshot: async () => JSON.stringify(saved),
  });
  assert.equal(result.kind, "restored");
  assert.equal(result.runId, 1);
  assert.deepEqual(result.notificationState, { version: 1, sources: {} });
  assert.equal(compareSnapshots(result.store.entries[registry[0].id], saved.entries[registry[0].id]).status, "unchanged");
});

test("restoration validates and preserves notification state bundled with snapshots", async () => {
  const notificationState = { version: 1, sources: {
    [registry[0].id]: { outageAlerted: true, lastAlertedHash: null, pendingChange: null },
  } };
  const options = {
    artifacts: [artifact(11, 1)], currentRunId: "2", branch: "main", registry,
    getRun: async (id) => successfulRun(id),
    downloadSnapshot: async () => ({ snapshotText: JSON.stringify(saved), notificationStateText: JSON.stringify(notificationState) }),
  };
  const restored = await findRestorableSnapshot(options);
  assert.deepEqual(restored.notificationState, notificationState);
  await assert.rejects(findRestorableSnapshot({
    ...options,
    downloadSnapshot: async () => ({ snapshotText: JSON.stringify(saved), notificationStateText: '{"version":2}' }),
  }), /No se pudo restaurar ningún snapshot válido/);
});

test("an invalid newer snapshot is reported and an older valid successful run is restored", async () => {
  const result = await findRestorableSnapshot({
    artifacts: [artifact(12, 2), artifact(11, 1)], currentRunId: "3", branch: "main", registry,
    getRun: async (id) => successfulRun(id),
    downloadSnapshot: async (entry) => entry.id === 12 ? "{broken" : JSON.stringify(saved),
  });
  assert.equal(result.runId, 1);
  assert.equal(result.warnings.length, 1);
  assert.match(result.warnings[0], /Artefacto 12/);
  assert.match(describeComparison(result, false), /Se descartaron artefactos posteriores: Artefacto 12/);
});

test("all invalid prior successful artifacts stop restoration rather than implying unchanged", async () => {
  await assert.rejects(findRestorableSnapshot({
    artifacts: [artifact(11, 1)], currentRunId: "2", branch: "main", registry,
    getRun: async (id) => successfulRun(id),
    downloadSnapshot: async () => JSON.stringify({ version: 2, entries: {} }),
  }), /No se pudo restaurar ningún snapshot válido/);
});

test("failed, foreign-branch, expired and current-run artifacts never become the baseline", async () => {
  const entries = [artifact(11, 1), { ...artifact(12, 2), expired: true }, artifact(13, 3)];
  assert.deepEqual(snapshotCandidates(entries, "3").map((item) => item.id), [11]);
  const result = await findRestorableSnapshot({
    artifacts: entries, currentRunId: "3", branch: "main", registry,
    getRun: async (id) => ({ ...successfulRun(id), conclusion: "failure" }),
    downloadSnapshot: () => assert.fail("Failed runs must not be downloaded"),
  });
  assert.equal(result.kind, "new-baseline");
  assert.match(result.reason, /ejecución exitosa/);
});

test("monitor refuses inconsistent restore status instead of silently starting a new baseline", () => {
  assert.throws(() => describeComparison({ kind: "restored", runId: 1, artifactId: 11 }, true), /no coincide/);
  assert.throws(() => describeComparison({ kind: "new-baseline", reason: "No hay snapshot" }, false), /no coincide/);
  assert.match(describeComparison({ kind: "new-baseline", reason: "No hay snapshot" }, true), /No hay snapshot/);
});
