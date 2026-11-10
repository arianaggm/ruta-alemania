import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";

// Transpile the TS module in memory so these tests run on the project's Node 20+ baseline.
function moduleUrl(file, imports = {}) {
  const source = readFileSync(new URL(file, import.meta.url), "utf8");
  let javascript = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  for (const [specifier, url] of Object.entries(imports)) {
    javascript = javascript.replace(`from "${specifier}"`, `from "${url}"`);
  }
  return `data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`;
}

const storage = await import(moduleUrl("../app/mi-ruta/_lib/storage.ts"));
const roadmap = await import(moduleUrl("../app/mi-ruta/_lib/roadmap.ts", {
  "../../_data/checklist": moduleUrl("../app/_data/checklist.ts"),
  "../../_content/guides/catalog": moduleUrl("../app/_content/guides/catalog.ts"),
  "../../_data/scholarships": moduleUrl("../app/_data/scholarships.ts"),
}));

function localStorageStub(entries = []) {
  const data = new Map(entries);
  globalThis.window = {
    localStorage: {
      getItem: (key) => data.get(key) ?? null,
      setItem: (key, value) => data.set(key, value),
    },
  };
  return data;
}

const originalPreferences = {
  studyLevel: "master",
  studyLanguage: "english",
  stage: "exploring",
  startSemester: "undecided",
  startYear: null,
  priority: "program",
};

test("editing updates every answer while preserving the latest completed IDs and the separate checklist", () => {
  const checklist = JSON.stringify(["pasaporte-vigente"]);
  const oldSnapshot = { version: 1, preferences: originalPreferences, completedTaskIds: ["definir-area"] };
  const latest = { ...oldSnapshot, completedTaskIds: ["definir-area", "mi-ruta-investigar-supervision"] };
  const data = localStorageStub([
    [storage.MI_RUTA_STORAGE_KEY, JSON.stringify(latest)],
    ["ruta-alemania-checklist", checklist],
  ]);
  const editedPreferences = {
    studyLevel: "bachelor",
    studyLanguage: "german",
    stage: "accepted",
    startSemester: "summer",
    startYear: 2028,
    priority: "relocation",
  };

  const result = storage.saveEditedProfile(editedPreferences, oldSnapshot);
  assert.equal(result.status, "saved");
  assert.deepEqual(result.data.preferences, editedPreferences);
  assert.deepEqual(result.data.completedTaskIds, latest.completedTaskIds);
  assert.equal(data.get("ruta-alemania-checklist"), checklist);
  assert.deepEqual(storage.loadSavedRoute(), { status: "ready", data: result.data });
});

test("a corrupt record does not overwrite progress during an existing edit", () => {
  const oldSnapshot = { version: 1, preferences: originalPreferences, completedTaskIds: ["definir-area"] };
  const data = localStorageStub([[storage.MI_RUTA_STORAGE_KEY, "{invalid"]]);
  assert.deepEqual(storage.saveEditedProfile({ ...originalPreferences, priority: "funding" }, oldSnapshot), { status: "invalid" });
  assert.equal(data.get(storage.MI_RUTA_STORAGE_KEY), "{invalid");
});

test("new onboarding can save, and an explicitly restarted corrupt profile can be replaced", () => {
  const data = localStorageStub();
  assert.equal(storage.saveEditedProfile(originalPreferences, null).status, "saved");
  data.set(storage.MI_RUTA_STORAGE_KEY, "{invalid");
  const result = storage.saveEditedProfile(originalPreferences, null);
  assert.equal(result.status, "saved");
  assert.deepEqual(storage.loadSavedRoute(), { status: "ready", data: result.data });
});

test("editing stage and level recalculates tasks while retaining hidden completion for a later edit", () => {
  const oldProfile = { version: 1, preferences: originalPreferences, completedTaskIds: ["definir-area"] };
  localStorageStub([[storage.MI_RUTA_STORAGE_KEY, JSON.stringify(oldProfile)]]);
  const changed = storage.saveEditedProfile({
    ...originalPreferences,
    studyLevel: "bachelor",
    studyLanguage: "german",
    stage: "accepted",
    priority: "relocation",
  }, oldProfile);
  assert.equal(changed.status, "saved");
  const acceptedStages = roadmap.buildRoadmap(changed.data.preferences);
  assert.deepEqual(acceptedStages.map((stage) => stage.id), ["visa-mudanza", "primeras-semanas"]);
  assert.equal(acceptedStages.flatMap((stage) => stage.tasks).filter((task) => changed.data.completedTaskIds.includes(task.id)).length, 0);
  assert.deepEqual(changed.data.completedTaskIds, ["definir-area"]);

  const changedBack = storage.saveEditedProfile(originalPreferences, changed.data);
  assert.equal(changedBack.status, "saved");
  const exploringTasks = roadmap.buildRoadmap(changedBack.data.preferences).flatMap((stage) => stage.tasks);
  assert.equal(exploringTasks.filter((task) => changedBack.data.completedTaskIds.includes(task.id)).length, 1);
  assert.ok(exploringTasks.some((task) => task.id === "buscar-programas" && task.title === "Buscar programas en inglés"));
  assert.ok(roadmap.getRecommendedGuides(changedBack.data.preferences).some((guide) => guide.slug === "como-buscar-maestrias-en-alemania"));
});
