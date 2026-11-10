import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";

function moduleUrl(file) {
  const javascript = ts.transpileModule(readFileSync(new URL(file, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return `data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`;
}

const globalNavigation = await import(moduleUrl("../app/_components/navigation.ts"));
const routeNavigation = await import(moduleUrl("../app/mi-ruta/_lib/navigation.ts"));
const formFocus = await import(moduleUrl("../app/mi-ruta/aplicaciones/_lib/form-focus.ts"));

function rgb(hex) {
  return hex.replace("#", "").match(/../g).map((part) => Number.parseInt(part, 16));
}

function luminance(colors) {
  const linear = colors.map((color) => {
    const value = color / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

function contrast(foreground, background) {
  const a = luminance(rgb(foreground));
  const b = luminance(rgb(background));
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

function blend(foreground, background, opacity) {
  return rgb(foreground).map((channel, index) => Math.round(channel * opacity + rgb(background)[index] * (1 - opacity)));
}

function colorToken(name) {
  const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
  const match = css.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, "i"));
  assert.ok(match, `Missing color token ${name}`);
  return match[1];
}

test("readable rose meets normal-text contrast on the light palette", () => {
  const rose = colorToken("rosa-contraste");
  for (const background of ["#ffffff", colorToken("antique-white"), colorToken("peach-fuzz"), colorToken("butter")]) {
    assert.ok(contrast(rose, background) >= 4.5, `${rose} on ${background}`);
  }
  assert.ok(contrast("#ffffff", rose) >= 4.5);
  assert.ok(contrast("#ffffff", "#8d2048") >= 4.5);
  assert.ok(contrast("#8d2048", colorToken("peach-fuzz")) >= 4.5);
  for (const background of ["#ffffff", colorToken("antique-white"), colorToken("peach-fuzz"), colorToken("butter")]) {
    const fadedDark = blend(colorToken("dark-text"), background, 0.7);
    assert.ok((Math.max(luminance(fadedDark), luminance(rgb(background))) + 0.05)
      / (Math.min(luminance(fadedDark), luminance(rgb(background))) + 0.05) >= 4.5);
  }
});

test("global and Mi Ruta navigation resolve active destinations without changing routes", () => {
  assert.deepEqual(globalNavigation.globalNavigationLinks.map((link) => link.href), ["/", "/guias", "/becas", "/buscadores", "/checklist", "/mi-ruta"]);
  assert.equal(globalNavigation.activeGlobalHref("/"), "/");
  assert.equal(globalNavigation.activeGlobalHref("/guias/como-buscar-maestrias-en-alemania"), "/guias");
  assert.equal(globalNavigation.activeGlobalHref("/buscadores"), "/buscadores");
  assert.equal(globalNavigation.activeGlobalHref("/mi-ruta/aplicaciones"), "/mi-ruta");
  assert.equal(routeNavigation.activeMiRutaHref("/mi-ruta/empezar"), "/mi-ruta");
  assert.equal(routeNavigation.activeMiRutaHref("/mi-ruta/aplicaciones"), "/mi-ruta/aplicaciones");
  assert.equal(routeNavigation.activeMiRutaHref("/mi-ruta/mis-datos"), "/mi-ruta/mis-datos");
  assert.equal(routeNavigation.activeMiRutaHref("/becas"), null);
});

test("navigation markup keeps tablet menu collapsed and exposes current-page semantics", () => {
  const navbar = readFileSync(new URL("../app/_components/navbar.tsx", import.meta.url), "utf8");
  const routeNav = readFileSync(new URL("../app/mi-ruta/_components/mi-ruta-nav.tsx", import.meta.url), "utf8");
  assert.match(navbar, /lg:hidden/);
  assert.match(navbar, /lg:flex/);
  assert.match(navbar, /aria-current=/);
  assert.match(routeNav, /aria-current=/);
  const footer = readFileSync(new URL("../app/_components/footer.tsx", import.meta.url), "utf8");
  assert.match(footer, /\/#por-donde-empiezo/);
  assert.match(footer, /\/#sobre-mi/);
});

test("application form focus enters heading and returns to a connected trigger", () => {
  const calls = [];
  formFocus.focusApplicationForm({
    focus: (options) => calls.push(["heading", options]),
    scrollIntoView: (options) => calls.push(["scroll", options]),
  });
  assert.deepEqual(calls, [["heading", { preventScroll: true }], ["scroll", { block: "nearest" }]]);
  assert.equal(formFocus.restoreApplicationFocus({ isConnected: true, focus: () => calls.push(["trigger"]) }), true);
  assert.deepEqual(calls.at(-1), ["trigger"]);
  assert.equal(formFocus.restoreApplicationFocus({ isConnected: false, focus: () => { throw new Error("Disconnected element focused"); } }), false);
});
