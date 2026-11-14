import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const nav = readFileSync(new URL("../app/_components/bej-home-nav.tsx", import.meta.url), "utf8");

test("bej hero puts the personal path first without hiding free guides", () => {
  assert.match(home, /Cada camino comienza/);
  assert.match(home, /href="\/mi-ruta\/empezar">Crear mi bej/);
  assert.match(home, /href="\/guias">Explorar guías/);
  assert.ok(home.indexOf("Crear mi bej") < home.indexOf("Explorar guías"));
  assert.match(home, /Espacio reservado para la ilustración oficial de <BrandName \/>/);
});

test("bej homepage keeps real public and personal tool routes", () => {
  for (const destination of ["/guias", "/becas", "/buscadores", "/checklist", "/mi-ruta", "/mi-ruta/aplicaciones", "/mi-ruta/mis-datos"]) {
    assert.ok(home.includes(`href="${destination}"`), `Destination missing: ${destination}`);
  }
  assert.match(home, /href=\{`\/guias\/\$\{guide\.slug\}`\}/);
  assert.match(home, /_content\/guides\/catalog/);
  for (const anchor of ["inicio", "por-donde-empiezo", "sobre-mi", "que-es-bej"]) {
    assert.ok(home.includes(`id="${anchor}"`), `Anchor missing: ${anchor}`);
  }
});

test("bej navigation has working destinations and closes its mobile menu", () => {
  assert.match(nav, /label: "Inicio", href: "#inicio"/);
  assert.match(nav, /label: "¿Qué es bej\?", href: "\/que-es-bej"/);
  assert.match(nav, /label: "Mi bej", href: "\/mi-ruta"/);
  assert.match(nav, /href="\/mi-ruta\/empezar"/);
  assert.match(nav, /onClick=\{closeMenu\}/);
  assert.match(nav, /menuRef\.current\.open = false/);
});

test("homepage literal internal destinations resolve to routes", () => {
  const destinations = new Set([...home.matchAll(/\bhref="(\/[^"#]*)"/g), ...nav.matchAll(/\bhref: "(\/[^"#]*)"/g)]
    .map((match) => match[1]));
  for (const destination of destinations) {
    assert.ok(existsSync(new URL(`../app${destination}/page.tsx`, import.meta.url)), `Route missing: ${destination}`);
  }
  assert.ok(existsSync(new URL("../app/guias/[slug]/page.tsx", import.meta.url)));
});
