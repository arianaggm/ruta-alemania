import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const home = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8");
const hero = readFileSync(new URL("../app/_components/hero.tsx", import.meta.url), "utf8");
const featureCard = readFileSync(new URL("../app/_components/feature-card.tsx", import.meta.url), "utf8");
const guides = readFileSync(new URL("../app/_content/guides/catalog.ts", import.meta.url), "utf8");

test("hero offers Mi Ruta first and public guides second", () => {
  assert.match(hero, /href="\/mi-ruta\/empezar"[\s\S]*?>\s*Crear Mi Ruta\s*<\/Link>/);
  assert.match(hero, /href="\/guias"[\s\S]*?>\s*Explorar guías\s*<\/Link>/);
  assert.ok(hero.indexOf('href="/mi-ruta/empezar"') < hero.indexOf('href="/guias"'));
});

test("homepage feature cards are complete links to existing resources", () => {
  assert.match(featureCard, /<Link\s+href=\{href\}[\s\S]*?<h3/);
  for (const destination of ["/becas", "/guias", "/checklist", "/buscadores"]) {
    assert.ok(home.includes(`href: "${destination}"`), `Feature destination missing: ${destination}`);
  }
});

test("homepage literal internal destinations have routes", () => {
  const destinations = new Set(
    [...home.matchAll(/\bhref(?:=|:)\s*"(\/[^"#]*)"/g), ...hero.matchAll(/\bhref="(\/[^"#]*)"/g)]
      .map((match) => match[1]),
  );
  for (const destination of destinations) {
    if (destination.startsWith("/guias/")) {
      assert.ok(existsSync(new URL("../app/guias/[slug]/page.tsx", import.meta.url)));
      assert.ok(guides.includes(`"slug": "${destination.slice("/guias/".length)}"`), `Guide missing: ${destination}`);
      continue;
    }
    const page = new URL(`../app${destination}/page.tsx`, import.meta.url);
    assert.ok(existsSync(page), `Route missing: ${destination}`);
  }
  assert.match(home, /href=\{`\/guias\/\$\{guide\.slug\}`\}/);
  assert.ok(existsSync(new URL("../app/guias/[slug]/page.tsx", import.meta.url)));
});
