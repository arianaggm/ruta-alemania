import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";

function moduleUrl(file, imports = {}) {
  let javascript = ts.transpileModule(readFileSync(new URL(file, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  for (const [specifier, url] of Object.entries(imports)) {
    javascript = javascript.replaceAll(`"${specifier}"`, `"${url}"`);
  }
  return `data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`;
}

const navigation = await import(moduleUrl("../app/_components/navigation.ts"));
const initialLoad = await import(moduleUrl("../app/mi-ruta/_lib/initial-load.ts"));
const routeStorage = await import(moduleUrl("../app/mi-ruta/_lib/storage.ts"));
const modelUrl = moduleUrl("../app/mi-ruta/aplicaciones/_lib/model.ts");
const applicationStorage = await import(moduleUrl("../app/mi-ruta/aplicaciones/_lib/storage.ts", { "./model": modelUrl }));
const ids = await import(moduleUrl("../app/mi-ruta/aplicaciones/_lib/local-id.ts"));

function storageStub(entries = [], throws = false) {
  const records = new Map(entries);
  const writes = [];
  globalThis.window = {
    localStorage: {
      getItem(key) {
        if (throws) throw new Error("Storage blocked");
        return records.get(key) ?? null;
      },
      setItem(key, value) { writes.push([key, value]); },
    },
  };
  return { records, writes };
}

test("mobile menu has native open/close semantics and links close it after navigation", () => {
  const source = readFileSync(new URL("../app/_components/navbar.tsx", import.meta.url), "utf8");
  assert.match(source, /<details ref=\{mobileMenuRef\}[^>]*lg:hidden/);
  assert.match(source, /<summary[\s\S]*aria-label="Menú principal"/);
  assert.match(source, /<nav[\s\S]*aria-label="Navegación principal móvil"/);
  assert.match(source, /onClick=\{\(\) => closeMobileMenu\(mobileMenuRef.current\)\}/);
  const menu = { open: true };
  navigation.closeMobileMenu(menu);
  assert.equal(menu.open, false);
  navigation.closeMobileMenu(null);
  assert.deepEqual(navigation.globalNavigationLinks.map((link) => link.href), ["/", "/guias", "/becas", "/buscadores", "/checklist", "/mi-ruta"]);
});

test("first visit resolves to onboarding and an empty applications list without writing storage", async () => {
  const { writes } = storageStub();
  assert.deepEqual(await initialLoad.readInitialState(routeStorage.loadSavedRoute, { status: "unavailable" }), { status: "empty" });
  assert.deepEqual(await initialLoad.readInitialState(applicationStorage.loadApplications, { status: "unavailable" }), {
    status: "ready", data: { version: 1, applications: [] },
  });
  assert.deepEqual(writes, []);
  const dashboard = readFileSync(new URL("../app/mi-ruta/_components/route-dashboard.tsx", import.meta.url), "utf8");
  const applications = readFileSync(new URL("../app/mi-ruta/aplicaciones/_components/applications-board.tsx", import.meta.url), "utf8");
  assert.match(dashboard, /loaded.status === "empty" \? "Crear Mi Ruta"/);
  assert.match(dashboard, /href="\/mi-ruta\/empezar"/);
  assert.match(applications, /Tu primer programa empieza aquí/);
  assert.match(applications, /readInitialState<ApplicationsLoadResult>/);
});

test("saved profile and applications load on the LAN origin without rewriting either key", async () => {
  const route = {
    version: 1,
    preferences: { studyLevel: "master", studyLanguage: "english", stage: "exploring", startSemester: "undecided", startYear: null, priority: "program" },
    completedTaskIds: ["definir-area"],
  };
  const applications = { version: 1, applications: [] };
  const { records, writes } = storageStub([
    [routeStorage.MI_RUTA_STORAGE_KEY, JSON.stringify(route)],
    [applicationStorage.APPLICATIONS_STORAGE_KEY, JSON.stringify(applications)],
  ]);
  assert.deepEqual(await initialLoad.readInitialState(routeStorage.loadSavedRoute, { status: "unavailable" }), { status: "ready", data: route });
  assert.deepEqual(await initialLoad.readInitialState(applicationStorage.loadApplications, { status: "unavailable" }), { status: "ready", data: applications });
  assert.equal(records.get(routeStorage.MI_RUTA_STORAGE_KEY), JSON.stringify(route));
  assert.equal(records.get(applicationStorage.APPLICATIONS_STORAGE_KEY), JSON.stringify(applications));
  assert.deepEqual(writes, []);
});

test("malformed and unavailable storage settles into explicit error states without deleting data", async () => {
  const { records, writes } = storageStub([
    [routeStorage.MI_RUTA_STORAGE_KEY, "{broken"],
    [applicationStorage.APPLICATIONS_STORAGE_KEY, "{broken"],
    ["ruta-alemania-checklist", '["pasaporte-vigente"]'],
  ]);
  assert.deepEqual(await initialLoad.readInitialState(routeStorage.loadSavedRoute, { status: "unavailable" }), { status: "invalid" });
  assert.deepEqual(await initialLoad.readInitialState(applicationStorage.loadApplications, { status: "unavailable" }), { status: "invalid" });
  assert.equal(records.get("ruta-alemania-checklist"), '["pasaporte-vigente"]');
  assert.deepEqual(writes, []);

  storageStub([], true);
  assert.deepEqual(await initialLoad.readInitialState(routeStorage.loadSavedRoute, { status: "unavailable" }), { status: "unavailable" });
  assert.deepEqual(await initialLoad.readInitialState(applicationStorage.loadApplications, { status: "unavailable" }), { status: "unavailable" });
  assert.deepEqual(await initialLoad.readInitialState(() => { throw new Error("Unexpected read failure"); }, { status: "unavailable" }), { status: "unavailable" });
});

test("onboarding still advances, saves, and navigates after initial loading", () => {
  const source = readFileSync(new URL("../app/mi-ruta/_components/onboarding.tsx", import.meta.url), "utf8");
  assert.match(source, /readInitialState<LoadResult>/);
  assert.match(source, /setLoaded\(true\)/);
  assert.match(source, /setStep\(step \+ 1\)/);
  assert.match(source, /saveEditedProfile\(answers, saved\)/);
  assert.match(source, /router.push\("\/mi-ruta"\)/);
  assert.match(source, /onSubmit=\{\(event\) => \{ event.preventDefault\(\); next\(\); \}\}/);
});

test("new application IDs work on a non-secure LAN origin without randomUUID", () => {
  const values = Uint8Array.from({ length: 16 }, (_, index) => index);
  const source = { getRandomValues: (buffer) => { buffer.set(values); return buffer; } };
  assert.equal(ids.createLocalId(source), "00010203-0405-4607-8809-0a0b0c0d0e0f");
  assert.equal(ids.createLocalId({ randomUUID: () => "uuid-from-browser" }), "uuid-from-browser");
  assert.match(ids.createLocalId(undefined), /./);
});

test("development origin config includes the iPhone LAN host", () => {
  const source = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");
  assert.match(source, /allowedDevOrigins: \["192\.168\.0\.100", "127\.0\.0\.1"\]/);
});
