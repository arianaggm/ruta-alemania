import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { scholarships } from "../app/_data/scholarships.ts";
import { filterScholarships, initialFilters } from "../app/becas/_lib/filter-scholarships.ts";

test("default scholarship view preserves all twelve catalog records and order", () => {
  assert.equal(scholarships.length, 12);
  assert.deepEqual(filterScholarships(scholarships, initialFilters, " "), scholarships);
});

test("scholarship search is accent insensitive and combines with existing filters", () => {
  assert.deepEqual(
    filterScholarships(scholarships, initialFilters, "boll").map((item) => item.title),
    ["Heinrich Böll Foundation Scholarship"],
  );
  assert.deepEqual(
    filterScholarships(scholarships, { ...initialFilters, degreeLevel: "Doctorado" }, "kaad"),
    scholarships.filter((item) => item.title === "KAAD — Programas de becas"),
  );
  assert.deepEqual(
    filterScholarships(scholarships, { ...initialFilters, language: "Inglés" }, "kaad"),
    [],
  );
  assert.ok(filterScholarships(scholarships, initialFilters, "maestria")
    .some((item) => item.title === "Erasmus+ Mobility"));
});

test("scholarship selects retain substring matching for multi-level and bilingual entries", () => {
  const masters = filterScholarships(scholarships, { ...initialFilters, degreeLevel: "Maestría" }, "");
  assert.ok(masters.length > 0);
  assert.ok(masters.every((item) => item.degreeLevel.includes("Maestría")));

  const english = filterScholarships(scholarships, { ...initialFilters, language: "Inglés" }, "");
  assert.ok(english.some((item) => item.language === "Inglés / Alemán"));
  assert.ok(english.every((item) => item.language.includes("Inglés")));
});

test("scholarship browser exposes labelled controls, count, reset and qualified sources", () => {
  const browser = readFileSync(new URL("../app/becas/_components/scholarships-browser.tsx", import.meta.url), "utf8");
  const card = readFileSync(new URL("../app/_components/scholarship-card.tsx", import.meta.url), "utf8");
  const layout = readFileSync(new URL("../app/becas/layout.tsx", import.meta.url), "utf8");

  assert.match(browser, /type="search"/);
  assert.match(browser, /htmlFor={`scholarship-\$\{group\.id\}`}/);
  assert.match(browser, /role="status" aria-live="polite"/);
  assert.match(browser, /setFilters\(initialFilters\); setQuery\(""\)/);
  assert.match(browser, /no necesariamente tiene una convocatoria abierta/);
  assert.match(card, /Plazo indicado · por verificar/);
  assert.match(card, /href=\{scholarship\.officialUrl\}/);
  assert.match(card, /rel="noopener noreferrer"/);
  assert.match(layout, /BejHomeNav/);
  assert.match(layout, /fraunces\.variable/);
});
