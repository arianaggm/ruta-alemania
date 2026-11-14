import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import { filterGuides } from "../app/guias/_lib/filter-guides.ts";

const guides = [
  { slug: "maestrias", title: "Cómo buscar maestrías", summary: "Programas de posgrado", category: "Aplicación", tags: ["universidad"] },
  { slug: "documentos", title: "Documentos desde México", summary: "Prepara certificados", category: "Documentos", tags: ["VPD", "uni-assist"] },
  { slug: "becas", title: "Becas para mexicanos", summary: "Opciones de apoyo", category: "Becas", tags: ["financiamiento"] },
];

test("guide search ignores accents and includes titles, summaries and tags", () => {
  assert.deepEqual(filterGuides(guides, "Todas", "maestrias").map((guide) => guide.slug), ["maestrias"]);
  assert.deepEqual(filterGuides(guides, "Todas", "mexico").map((guide) => guide.slug), ["documentos"]);
  assert.deepEqual(filterGuides(guides, "Todas", "vpd").map((guide) => guide.slug), ["documentos"]);
  assert.deepEqual(filterGuides(guides, "Todas", "apoyo").map((guide) => guide.slug), ["becas"]);
});

test("category and search combine without changing guide order", () => {
  assert.deepEqual(filterGuides(guides, "Aplicación", "maestría").map((guide) => guide.slug), ["maestrias"]);
  assert.deepEqual(filterGuides(guides, "Becas", "maestría"), []);
  assert.deepEqual(filterGuides(guides, "Todas", " ").map((guide) => guide.slug), guides.map((guide) => guide.slug));
});

test("featured guide is a catalog view, not a duplicate record", () => {
  const browser = readFileSync(new URL("../app/guias/_components/guides-browser.tsx", import.meta.url), "utf8");
  const page = readFileSync(new URL("../app/guias/page.tsx", import.meta.url), "utf8");
  assert.match(browser, /guides\.find\(\(guide\) => guide\.slug === featuredSlug\)/);
  assert.match(browser, /filteredGuides\.filter\(\(guide\) => guide\.slug !== featuredSlug\)/);
  assert.match(browser, /type="search"/);
  assert.match(browser, /aria-live="polite"/);
  assert.match(page, /_content\/guides\/catalog/);
  assert.doesNotMatch(page, /_content\/guides\/articles/);
});

test("guide layout reuses bej branding while leaving other routes untouched", () => {
  const layout = readFileSync(new URL("../app/guias/layout.tsx", import.meta.url), "utf8");
  const nav = readFileSync(new URL("../app/_components/bej-home-nav.tsx", import.meta.url), "utf8");
  assert.match(layout, /dmSans\.variable/);
  assert.match(layout, /fraunces\.variable/);
  assert.match(layout, /BejHomeNav/);
  assert.match(layout, /BejFooter/);
  assert.match(nav, /pathname !== "\/" \? `\/\$\{href\}`/);
});
