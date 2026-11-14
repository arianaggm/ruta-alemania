import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

function source(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
}

test("personal workspace presents Mi bej while preserving legacy routes", () => {
  const navigation = source("app/mi-ruta/_lib/navigation.ts");
  const dashboard = source("app/mi-ruta/_components/route-dashboard.tsx");
  const onboarding = source("app/mi-ruta/_components/onboarding.tsx");
  const shell = source("app/mi-ruta/layout.tsx");

  assert.match(navigation, /label: "Mi bej", href: "\/mi-ruta"/);
  assert.match(navigation, /href: "\/mi-ruta\/aplicaciones"/);
  assert.match(navigation, /href: "\/mi-ruta\/mis-datos"/);
  assert.match(dashboard, /TU ESPACIO PERSONAL/);
  assert.match(dashboard, /Cada paso <em>cuenta\.<\/em>/);
  assert.match(dashboard, /const nextSteps = getNextSteps\(stages, completedTaskIds, preferences\.priority\)/);
  assert.match(dashboard, /aria-valuenow=\{completed\}/);
  assert.match(onboarding, /Comencemos tu camino/);
  assert.match(onboarding, /saveEditedProfile\(answers, saved\)/);
  assert.match(shell, /BejHomeNav/);
  assert.match(shell, /BejFooter/);
  assert.match(shell, /dmSans\.variable/);
  assert.match(shell, /fraunces\.variable/);
});

test("legacy browser storage and backup contracts remain unchanged", () => {
  assert.match(source("app/mi-ruta/_lib/storage.ts"), /MI_RUTA_STORAGE_KEY = "ruta-alemania:mi-ruta:v1"/);
  assert.match(source("app/mi-ruta/aplicaciones/_lib/storage.ts"), /APPLICATIONS_STORAGE_KEY = "ruta-alemania:aplicaciones:v1"/);
  assert.match(source("app/checklist/_lib/storage.ts"), /CHECKLIST_STORAGE_KEY = "ruta-alemania-checklist"/);
  const backup = source("app/mi-ruta/mis-datos/_lib/backup.ts");
  assert.match(backup, /BACKUP_FORMAT = "ruta-alemania-backup"/);
  assert.match(backup, /application: "Ruta Alemania"/);
});
