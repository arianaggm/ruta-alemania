import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

import { getPublishedUpdates, updates } from "../app/_data/updates.ts";

function source(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
}

test("About preview and shared bej navigation point to the real editorial route", () => {
  const home = source("app/page.tsx");
  const header = source("app/_components/bej-home-nav.tsx");
  const footer = source("app/_components/bej-footer.tsx");
  assert.match(home, /<Link href="\/que-es-bej" className=\{styles\.lightTextLink\}>Conoce más/);
  assert.match(header, /label: "¿Qué es bej\?", href: "\/que-es-bej"/);
  assert.match(footer, /href="\/que-es-bej">¿Qué es bej\?/);
  assert.match(footer, /href="\/novedades">Novedades/);
  assert.ok(existsSync(new URL("../app/que-es-bej/page.tsx", import.meta.url)));
  assert.ok(existsSync(new URL("../app/novedades/page.tsx", import.meta.url)));
});

test("About page keeps meanings distinct and identifies May and future plans", () => {
  const page = source("app/que-es-bej/page.tsx");
  for (const heading of ["Un nombre,", "La historia detrás de", "Conoce a", "El futuro de"]) {
    assert.ok(page.includes(heading), `Missing editorial section: ${heading}`);
  }
  assert.match(page, /Berufseinstiegsjahr/);
  assert.match(page, /no es el nombre de esta plataforma ni una vía de admisión universitaria/);
  assert.match(page, /site\.inali\.gob\.mx\/pdf\/norma_maya\.pdf/);
  assert.match(page, /service-bw\.de\/zufi\/leistungen\/243/);
  assert.match(page, /Nací en México y ahora estudio en Alemania/);
  assert.match(page, /Es una idea para el futuro, no una función disponible hoy/);
  assert.doesNotMatch(page, /<Image|<img/);
});

test("Novedades starts empty, excludes drafts and sorts published entries newest first", () => {
  assert.deepEqual(updates, []);
  assert.deepEqual(getPublishedUpdates(updates), []);
  const entries = [
    { id: "older", publishedAt: "2025-01-01", title: "A", summary: "A", category: "content", status: "published" },
    { id: "draft", publishedAt: "2026-01-01", title: "B", summary: "B", category: "feature", status: "draft" },
    { id: "newer", publishedAt: "2025-06-01", title: "C", summary: "C", category: "fix", status: "published" },
  ];
  assert.deepEqual(getPublishedUpdates(entries).map((entry) => entry.id), ["newer", "older"]);
  assert.deepEqual(entries.map((entry) => entry.id), ["older", "draft", "newer"]);
  const page = source("app/novedades/page.tsx");
  assert.match(page, /Aún no hay novedades publicadas/);
  assert.match(page, /<time dateTime=\{entry\.publishedAt\}>/);
  assert.match(page, /getPublishedUpdates\(updates\)/);
});
