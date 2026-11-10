import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { registry } from "../scripts/scholarship-monitor/registry.mjs";
import { compareSnapshots, extractSnapshot, parseRobots, renderReport, validateSnapshotStore } from "../scripts/scholarship-monitor/core.mjs";

const before = readFileSync(new URL("./fixtures/scholarship-source-before.html", import.meta.url), "utf8");
const after = readFileSync(new URL("./fixtures/scholarship-source-after.html", import.meta.url), "utf8");
const url = "https://official.example/scholarship";

test("registry matches all six existing catalog records and pending verification", () => {
  const catalog = readFileSync(new URL("../app/_data/scholarships.ts", import.meta.url), "utf8");
  assert.equal(registry.length, 6);
  assert.equal(new Set(registry.map((item) => item.id)).size, 6);
  for (const item of registry) {
    assert.match(catalog, new RegExp(`title: "${item.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    assert.ok(catalog.includes(item.sourceUrl));
  }
  assert.equal((catalog.match(/verificationStatus: "pending",/g) ?? []).length, 6);
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
