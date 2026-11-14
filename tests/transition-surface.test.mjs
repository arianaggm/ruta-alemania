import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

function source(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
}

test("persistent root surface matches bej shells during cross-route navigation", () => {
  const globalCss = source("app/globals.css");
  const homeCss = source("app/home.module.css");
  const miBejCss = source("app/mi-ruta/mi-bej.module.css");
  assert.match(globalCss, /html\s*\{\s*background: #fff5e8;/);
  assert.match(globalCss, /body\s*\{\s*background: #fff5e8;/);
  assert.doesNotMatch(globalCss, /radial-gradient/);
  assert.match(homeCss, /--bej-ivory: #fff5e8/);
  assert.match(miBejCss, /\.shell\s*\{[\s\S]*?background: var\(--bej-ivory\)/);
});

test("smooth scrolling is declared for Next navigation and respects reduced motion", () => {
  const layout = source("app/layout.tsx");
  const globalCss = source("app/globals.css");
  assert.match(layout, /data-scroll-behavior="smooth"/);
  assert.doesNotMatch(layout, /scroll-smooth/);
  assert.match(globalCss, /@media \(prefers-reduced-motion: reduce\)[\s\S]*scroll-behavior: auto/);
});

test("Mi bej links remain client-side and the dashboard has an explicit loading state", () => {
  const nav = source("app/_components/bej-home-nav.tsx");
  const dashboard = source("app/mi-ruta/_components/route-dashboard.tsx");
  assert.match(nav, /import Link from "next\/link"/);
  assert.match(nav, /\{ label: "Mi bej", href: "\/mi-ruta" \}/);
  assert.match(nav, /<Link key=\{link\.href\} href=\{destination\(link\.href\)\}/);
  assert.match(dashboard, /if \(!loaded\) return <main className=\{styles\.main\}><p role="status">Cargando Mi bej…<\/p><\/main>/);
  assert.doesNotMatch(dashboard, /window\.location|router\.replace|router\.push/);
});
