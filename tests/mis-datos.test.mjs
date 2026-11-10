import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";

function moduleUrl(file, imports = {}) {
  let javascript = ts.transpileModule(readFileSync(new URL(file, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  for (const [specifier, url] of Object.entries(imports)) javascript = javascript.replace(`from "${specifier}"`, `from "${url}"`);
  return `data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`;
}

const checklistDataUrl = moduleUrl("../app/_data/checklist.ts");
const checklistStorageUrl = moduleUrl("../app/checklist/_lib/storage.ts", { "../../_data/checklist": checklistDataUrl });
const routeStorageUrl = moduleUrl("../app/mi-ruta/_lib/storage.ts");
const applicationModelUrl = moduleUrl("../app/mi-ruta/aplicaciones/_lib/model.ts");
const applicationStorageUrl = moduleUrl("../app/mi-ruta/aplicaciones/_lib/storage.ts", { "./model": applicationModelUrl });
const backup = await import(moduleUrl("../app/mi-ruta/mis-datos/_lib/backup.ts", {
  "../../../checklist/_lib/storage": checklistStorageUrl,
  "../../aplicaciones/_lib/storage": applicationStorageUrl,
  "../../_lib/storage": routeStorageUrl,
}));
const model = await import(applicationModelUrl);

const keys = {
  route: "ruta-alemania:mi-ruta:v1",
  applications: "ruta-alemania:aplicaciones:v1",
  checklist: "ruta-alemania-checklist",
};
const now = "2026-11-10T12:00:00.000Z";
const route = {
  version: 1,
  preferences: { studyLevel: "master", studyLanguage: "english", stage: "exploring", startSemester: "undecided", startYear: null, priority: "program" },
  completedTaskIds: ["definir-area"],
};
const draft = {
  universityName: "Universidad de prueba", programName: "Programa de prueba", studyLevel: "master", city: "Dresde",
  officialProgramUrl: "https://example.org/programa", applicationPortalUrl: "", intakeSemester: "", intakeYear: null,
  deadline: "", notes: "Nota privada",
};
const application = model.createApplication(draft, "app-1", now);

function storage(entries = []) {
  const data = new Map(entries);
  return {
    data,
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => { data.set(key, value); },
    removeItem: (key) => { data.delete(key); },
  };
}

function allEntries() {
  return [
    [keys.route, JSON.stringify(route)],
    [keys.applications, JSON.stringify({ version: 1, applications: [application] })],
    [keys.checklist, JSON.stringify(["definir-area", "pasaporte-vigente"])],
  ];
}

test("round-trip export and replace restore all three domains without touching unrelated keys", () => {
  const source = storage([...allEntries(), ["unrelated", "private-value"]]);
  const exported = backup.createBackup(source, now);
  assert.deepEqual(Object.values(exported.domains).map((domain) => domain.state), ["included", "included", "included"]);
  assert.equal(JSON.stringify(exported).includes("private-value"), false);
  const parsed = backup.parseBackup(JSON.stringify(exported));
  assert.equal(parsed.status, "ready");
  const target = storage([
    [keys.route, JSON.stringify({ ...route, completedTaskIds: [] })],
    [keys.applications, JSON.stringify({ version: 1, applications: [] })],
    [keys.checklist, "[]"],
    ["unrelated", "keep-me"],
  ]);
  const preview = backup.previewRestore(target, parsed.backup);
  assert.deepEqual(preview.counts, { miRuta: 1, aplicaciones: 0, checklist: 0 });
  assert.deepEqual(backup.restoreBackup(target, parsed.backup, preview), { status: "restored" });
  assert.deepEqual(JSON.parse(target.getItem(keys.route)), route);
  assert.deepEqual(JSON.parse(target.getItem(keys.applications)).applications, [application]);
  assert.deepEqual(JSON.parse(target.getItem(keys.checklist)), ["definir-area", "pasaporte-vigente"]);
  assert.equal(target.getItem("unrelated"), "keep-me");
});

test("empty and partial backups distinguish missing, invalid and unsupported data", () => {
  const empty = backup.createBackup(storage(), now);
  assert.ok(Object.values(empty.domains).every((domain) => domain.state === "missing"));
  assert.equal(backup.parseBackup(JSON.stringify(empty)).status, "ready");
  const target = storage(allEntries());
  const before = [...target.data.entries()];
  assert.equal(backup.restoreBackup(target, empty, backup.previewRestore(target, empty)).status, "error");
  assert.deepEqual([...target.data.entries()], before);

  const source = storage([[keys.route, JSON.stringify(route)], [keys.applications, JSON.stringify({ version: 2, applications: [] })], [keys.checklist, "{broken"]]);
  const partial = backup.createBackup(source, now);
  assert.deepEqual(partial.domains.aplicaciones, { state: "excluded", reason: "unsupported" });
  assert.deepEqual(partial.domains.checklist, { state: "excluded", reason: "invalid" });
  assert.equal(partial.domains.miRuta.state, "included");
  const preview = backup.previewRestore(target, partial);
  assert.deepEqual(backup.restoreBackup(target, partial, preview), { status: "restored" });
  assert.equal(target.getItem(keys.applications), before.find(([key]) => key === keys.applications)[1]);
  assert.equal(target.getItem(keys.checklist), before.find(([key]) => key === keys.checklist)[1]);
});

test("malformed, oversized, incompatible and unsafe backup content is rejected", () => {
  assert.equal(backup.parseBackup("{broken").status, "error");
  assert.equal(backup.parseBackup("x".repeat(backup.MAX_BACKUP_BYTES + 1)).status, "error");
  assert.ok(backup.validateBackupFile("backup.txt", "text/plain", 10));
  assert.ok(backup.validateBackupFile("backup.json", "application/json", 0));
  assert.equal(backup.validateBackupFile("backup.json", "application/json", 100), null);
  const valid = backup.createBackup(storage(allEntries()), now);
  for (const changed of [
    { ...valid, schemaVersion: 2 },
    { ...valid, format: "other" },
    { ...valid, domains: { ...valid.domains, checklist: { state: "included", data: ["unknown-id"] } } },
    { ...valid, domains: { ...valid.domains, checklist: { state: "included", data: ["definir-area", "definir-area"] } } },
    { ...valid, domains: { ...valid.domains, miRuta: { state: "included", data: { ...route, completedTaskIds: ["same", "same"] } } } },
    { ...valid, domains: { ...valid.domains, miRuta: { state: "included", data: { ...route, completedTaskIds: [""] } } } },
    { ...valid, domains: { ...valid.domains, aplicaciones: { state: "included", data: { version: 1, applications: [application, application] } } } },
    { ...valid, domains: { ...valid.domains, aplicaciones: { state: "included", data: { version: 1, applications: [{ ...application, officialProgramUrl: "javascript:alert(1)" }] } } } },
  ]) assert.equal(backup.parseBackup(JSON.stringify(changed)).status, "error");
});

test("preview and cancellation perform no writes; changed local data blocks stale restore", () => {
  const target = storage(allEntries());
  const imported = backup.createBackup(storage([[keys.route, JSON.stringify({ ...route, completedTaskIds: [] })]]), now);
  const before = [...target.data.entries()];
  const preview = backup.previewRestore(target, imported);
  assert.deepEqual([...target.data.entries()], before);
  // Cancelling means no call to restoreBackup.
  assert.deepEqual([...target.data.entries()], before);
  target.setItem(keys.checklist, "[]");
  assert.match(backup.restoreBackup(target, imported, preview).message, /cambiaron/);
  assert.equal(target.getItem(keys.route), before.find(([key]) => key === keys.route)[1]);
});

test("a failed multi-key write rolls back originals and does not affect unrelated storage", () => {
  const target = storage([...allEntries(), ["unrelated", "keep-me"]]);
  const before = new Map(target.data);
  const incoming = backup.createBackup(storage([
    [keys.route, JSON.stringify({ ...route, completedTaskIds: [] })],
    [keys.applications, JSON.stringify({ version: 1, applications: [] })],
    [keys.checklist, "[]"],
  ]), now);
  const preview = backup.previewRestore(target, incoming);
  const originalSet = target.setItem;
  let failed = false;
  target.setItem = (key, value) => {
    if (key === keys.applications && !failed) { failed = true; throw new Error("quota"); }
    originalSet(key, value);
  };
  const result = backup.restoreBackup(target, incoming, preview);
  assert.equal(result.status, "error");
  assert.match(result.message, /recuperaron/);
  assert.deepEqual(target.data, before);
});

test("invalid current storage blocks replacement before any write", () => {
  const target = storage([[keys.route, "{broken"], ["unrelated", "keep-me"]]);
  const incoming = backup.createBackup(storage(allEntries()), now);
  const before = new Map(target.data);
  assert.throws(() => backup.previewRestore(target, incoming), /no podemos validar/);
  assert.deepEqual(target.data, before);
});
