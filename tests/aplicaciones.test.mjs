import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";

function moduleUrl(file, imports = {}) {
  let javascript = ts.transpileModule(readFileSync(new URL(file, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  for (const [specifier, url] of Object.entries(imports)) {
    javascript = javascript.replace(`from "${specifier}"`, `from "${url}"`);
  }
  return `data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`;
}

const modelUrl = moduleUrl("../app/mi-ruta/aplicaciones/_lib/model.ts");
const model = await import(modelUrl);
const storage = await import(moduleUrl("../app/mi-ruta/aplicaciones/_lib/storage.ts", { "./model": modelUrl }));

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

const draft = {
  universityName: "  Universidad de prueba  ",
  programName: "  Programa de prueba ",
  studyLevel: "master",
  city: "  Berlín ",
  officialProgramUrl: "https://example.org/programa",
  applicationPortalUrl: "https://example.org/solicitud",
  intakeSemester: "winter",
  intakeYear: 2028,
  deadline: "2028-02-29",
  notes: "  Revisar requisitos. ",
};
const createdAt = "2026-11-09T12:00:00.000Z";
const updatedAt = "2026-11-10T12:00:00.000Z";

test("create, edit and delete preserve stable identity and existing documents", () => {
  const application = model.createApplication(draft, "app-1", createdAt);
  assert.equal(application.universityName, "Universidad de prueba");
  assert.equal(application.programName, "Programa de prueba");
  assert.equal(application.status, "saved");
  assert.equal(application.documents.length, 6);
  assert.ok(application.documents.every((document) => !document.completed));
  assert.equal(new Set(application.documents.map((document) => document.id)).size, 6);

  const edited = model.editApplication(application, { ...draft, programName: "Programa nuevo", notes: "Nota actualizada" }, updatedAt);
  assert.equal(edited.id, "app-1");
  assert.equal(edited.createdAt, createdAt);
  assert.equal(edited.updatedAt, updatedAt);
  assert.equal(edited.programName, "Programa nuevo");
  assert.deepEqual(edited.documents, application.documents);
  assert.deepEqual(model.deleteApplication([edited], "app-1"), []);
});

test("status and per-application documents survive storage reloads", () => {
  localStorageStub();
  const first = model.createApplication(draft, "app-1", createdAt);
  const second = model.createApplication({ ...draft, programName: "Otro programa" }, "app-2", createdAt);
  let result = storage.updateApplications(() => [first, second]);
  assert.equal(result.status, "ready");

  result = storage.updateApplications((applications) => applications.map((application) => application.id === "app-1"
    ? model.changeStatus(application, "submitted", updatedAt) : application));
  assert.equal(result.status, "ready");
  result = storage.updateApplications((applications) => applications.map((application) => application.id === "app-1"
    ? model.addDocument(application, "Constancia adicional", "doc-custom", updatedAt) : application));
  result = storage.updateApplications((applications) => applications.map((application) => application.id === "app-1"
    ? model.editDocument(application, "doc-custom", "Constancia especial", updatedAt) : application));
  result = storage.updateApplications((applications) => applications.map((application) => application.id === "app-1"
    ? model.toggleDocument(application, "doc-custom", updatedAt) : application));

  const reloaded = storage.loadApplications();
  assert.equal(reloaded.status, "ready");
  assert.equal(reloaded.data.applications[0].status, "submitted");
  assert.deepEqual(reloaded.data.applications[0].documents.at(-1), { id: "doc-custom", name: "Constancia especial", completed: true });
  assert.equal(reloaded.data.applications[1].documents.length, 6);

  result = storage.updateApplications((applications) => applications.map((application) => application.id === "app-1"
    ? model.removeDocument(application, "doc-custom", updatedAt) : application));
  assert.equal(result.data.applications[0].documents.length, 6);
  assert.equal(result.data.applications[1].documents.length, 6);
});

test("invalid and unsupported storage are not silently overwritten", () => {
  const data = localStorageStub([[storage.APPLICATIONS_STORAGE_KEY, "{broken"]]);
  assert.deepEqual(storage.loadApplications(), { status: "invalid" });
  assert.deepEqual(storage.updateApplications(() => []), { status: "invalid" });
  assert.equal(data.get(storage.APPLICATIONS_STORAGE_KEY), "{broken");
  assert.deepEqual(storage.parseApplications(JSON.stringify({ applications: [] })), { status: "invalid" });

  data.set(storage.APPLICATIONS_STORAGE_KEY, JSON.stringify({ version: 2, applications: [] }));
  assert.deepEqual(storage.loadApplications(), { status: "unsupported" });
  assert.deepEqual(storage.updateApplications(() => []), { status: "unsupported" });
  assert.equal(JSON.parse(data.get(storage.APPLICATIONS_STORAGE_KEY)).version, 2);

  const valid = model.createApplication(draft, "app-1", createdAt);
  for (const broken of [
    { ...valid, officialProgramUrl: "javascript:alert(1)" },
    { ...valid, deadline: "2028-02-30" },
    { ...valid, documents: [{ id: "same", name: "CV", completed: false }, { id: "same", name: "Pasaporte", completed: true }] },
  ]) {
    assert.deepEqual(storage.parseApplications(JSON.stringify({ version: 1, applications: [broken] })), { status: "invalid" });
  }
  assert.deepEqual(storage.parseApplications(JSON.stringify({ version: 1, applications: [valid, valid] })), { status: "invalid" });
});

test("application writes leave Mi Ruta and checklist storage untouched", () => {
  const route = JSON.stringify({ version: 1, preferences: { stage: "exploring" }, completedTaskIds: ["definir-area"] });
  const checklist = JSON.stringify(["pasaporte-vigente"]);
  const data = localStorageStub([
    ["ruta-alemania:mi-ruta:v1", route],
    ["ruta-alemania-checklist", checklist],
  ]);
  storage.updateApplications(() => [model.createApplication(draft, "app-1", createdAt)]);
  storage.updateApplications((applications) => model.deleteApplication(applications, "app-1"));
  assert.equal(data.get("ruta-alemania:mi-ruta:v1"), route);
  assert.equal(data.get("ruta-alemania-checklist"), checklist);
});

test("every status filter reflects saved and updated applications after reload", () => {
  localStorageStub();
  const initial = model.applicationStatuses.map((status, index) => model.changeStatus(
    model.createApplication({ ...draft, programName: `Programa ${index}` }, `app-${index}`, createdAt),
    status,
    updatedAt,
  ));
  assert.equal(storage.updateApplications(() => initial).status, "ready");
  const reloaded = storage.loadApplications();
  assert.equal(reloaded.status, "ready");
  assert.equal(model.filterApplications(reloaded.data.applications, "all").length, initial.length);
  for (const status of model.applicationStatuses) {
    const matching = model.filterApplications(reloaded.data.applications, status);
    assert.equal(matching.length, 1);
    assert.equal(matching[0].status, status);
  }

  const changed = storage.updateApplications((applications) => applications.map((application) => application.id === "app-0"
    ? model.changeStatus(application, "submitted", updatedAt) : application));
  assert.equal(changed.status, "ready");
  const afterRefresh = storage.loadApplications();
  assert.equal(model.filterApplications(afterRefresh.data.applications, "saved").length, 0);
  assert.equal(model.filterApplications(afterRefresh.data.applications, "submitted").length, 2);
});

test("deletion requires confirmation; cancellation does not write or affect other storage", () => {
  const route = '{"progress":"keep"}';
  const checklist = '["keep"]';
  const data = localStorageStub([
    ["ruta-alemania:mi-ruta:v1", route],
    ["ruta-alemania-checklist", checklist],
  ]);
  const first = model.createApplication(draft, "app-1", createdAt);
  const second = model.createApplication({ ...draft, programName: "Segundo" }, "app-2", createdAt);
  storage.updateApplications(() => [first, second]);
  const beforeCancel = data.get(storage.APPLICATIONS_STORAGE_KEY);
  let removeCalls = 0;
  const remove = () => {
    removeCalls++;
    return storage.updateApplications((applications) => model.deleteApplication(applications, "app-1")).status === "ready";
  };

  assert.equal(model.runConfirmedDeletion(false, remove), true);
  assert.equal(removeCalls, 0);
  assert.equal(data.get(storage.APPLICATIONS_STORAGE_KEY), beforeCancel);
  assert.equal(storage.loadApplications().data.applications.length, 2);

  assert.equal(model.runConfirmedDeletion(true, remove), true);
  assert.equal(removeCalls, 1);
  assert.deepEqual(storage.loadApplications().data.applications.map((application) => application.id), ["app-2"]);
  assert.equal(data.get("ruta-alemania:mi-ruta:v1"), route);
  assert.equal(data.get("ruta-alemania-checklist"), checklist);
});

test("URLs, dates, sorting and upcoming deadline selection are safe and deterministic", () => {
  assert.equal(model.isSafeExternalUrl("https://example.org"), true);
  assert.equal(model.isSafeExternalUrl("http://example.org"), true);
  assert.equal(model.isSafeExternalUrl("javascript:alert(1)"), false);
  assert.equal(model.isSafeExternalUrl("https://user:secret@example.org"), false);
  assert.equal(model.isSafeExternalUrl("https://example.org/has space"), false);
  assert.equal(model.isSafeExternalUrl("/relative"), false);
  assert.equal(model.isValidDate("2028-02-29"), true);
  assert.equal(model.isValidDate("2028-02-30"), false);
  assert.ok(model.validateDraft({ ...draft, universityName: "  " }));

  const past = model.createApplication({ ...draft, deadline: "2026-11-08" }, "past", createdAt);
  const today = model.createApplication({ ...draft, deadline: "2026-11-09" }, "today", createdAt);
  const future = model.createApplication({ ...draft, deadline: "2026-11-12" }, "future", createdAt);
  const unknown = model.createApplication({ ...draft, deadline: "" }, "unknown", createdAt);
  const submitted = model.changeStatus(model.createApplication({ ...draft, deadline: "2026-11-11" }, "submitted", createdAt), "submitted", updatedAt);
  assert.deepEqual(model.sortByDeadline([unknown, future, past, today]).map((application) => application.id), ["past", "today", "future", "unknown"]);
  assert.deepEqual(model.upcomingDeadlines([unknown, submitted, future, past, today], "2026-11-09").map((application) => application.id), ["today", "future"]);
});
