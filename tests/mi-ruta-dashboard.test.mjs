import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const dashboard = readFileSync(new URL("../app/mi-ruta/_components/route-dashboard.tsx", import.meta.url), "utf8");
const applications = readFileSync(new URL("../app/mi-ruta/_components/applications-summary.tsx", import.meta.url), "utf8");

test("dashboard follows goal, progress, next steps, applications, roadmap, resources, backup", () => {
  const markers = [
    'id="study-goal-heading"',
    'id="progress-heading"',
    'id="next-steps-heading"',
    "<ApplicationsSummary />",
    'id="roadmap-heading"',
    "Guías para tu momento",
    'id="backup-heading"',
  ];
  let position = -1;
  for (const marker of markers) {
    const next = dashboard.indexOf(marker);
    assert.ok(next > position, `Dashboard section missing or out of order: ${marker}`);
    position = next;
  }
  assert.match(applications, /id="applications-summary-heading"/);
});

test("dashboard reuses roadmap selection and completion, and keeps key destinations", () => {
  assert.match(dashboard, /const stages = buildRoadmap\(preferences\)/);
  assert.match(dashboard, /const nextSteps = getNextSteps\(stages, completedTaskIds, preferences\.priority\)/);
  assert.match(dashboard, /onChange=\{\(\) => toggleTask\(task\.id, data\)\}/);
  assert.match(dashboard, /aria-valuenow=\{completed\}/);
  assert.match(dashboard, /href=\{task\.href\}/);
  for (const path of ["/mi-ruta/empezar", "/mi-ruta/aplicaciones", "/mi-ruta/mis-datos", "/guias"]) {
    const source = path === "/mi-ruta/aplicaciones" ? applications : dashboard;
    assert.ok(source.includes(`href="${path}"`), `Dashboard destination missing: ${path}`);
    assert.ok(existsSync(new URL(`../app${path}/page.tsx`, import.meta.url)));
  }
});

test("applications summary only reads validated data and handles unreadable storage", () => {
  assert.match(applications, /loadApplications\(\)/);
  assert.match(applications, /loaded\?\.status === "ready"/);
  assert.match(applications, /loaded\.status === "unavailable"/);
  assert.doesNotMatch(applications, /localStorage|saveApplications|updateApplications|setItem|removeItem/);
});
