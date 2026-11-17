import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";

function moduleUrl(file, imports = {}) {
  let javascript = ts.transpileModule(readFileSync(new URL(file, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  for (const [specifier, url] of Object.entries(imports)) javascript = javascript.replace(`from "${specifier}"`, `from "${url}"`);
  return `data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`;
}

const siteUrlModule = moduleUrl("../app/_lib/site-url.ts");
const siteUrl = await import(siteUrlModule);
const seo = await import(moduleUrl("../app/_lib/seo.ts", { "./site-url": siteUrlModule }));
const catalogModule = moduleUrl("../app/_content/guides/catalog.ts");
const { guides } = await import(catalogModule);
const headersModule = `data:text/javascript;base64,${Buffer.from('export async function headers() { return { get: () => globalThis.__seoTestHost ?? null }; }').toString("base64")}`;
const { default: robots } = await import(moduleUrl("../app/robots.ts", {
  "next/headers": headersModule,
  "./_lib/site-url": siteUrlModule,
}));
const { default: sitemap } = await import(moduleUrl("../app/sitemap.ts", {
  "next/headers": headersModule,
  "./_content/guides/catalog": catalogModule,
  "./_lib/site-url": siteUrlModule,
}));
const nextServerModule = `data:text/javascript;base64,${Buffer.from('export const NextResponse = { next: () => ({ headers: new Map() }) };').toString("base64")}`;
const { proxy } = await import(moduleUrl("../proxy.ts", {
  "next/server": nextServerModule,
  "./app/_lib/site-url": siteUrlModule,
}));

const previousSiteUrl = process.env.SITE_URL;

test.after(() => {
  if (previousSiteUrl === undefined) delete process.env.SITE_URL;
  else process.env.SITE_URL = previousSiteUrl;
  delete globalThis.__seoTestHost;
});

test("SITE_URL accepts only a clean HTTPS production origin", () => {
  assert.equal(siteUrl.parseSiteUrl("https://bej.example.org/")?.origin, "https://bej.example.org");
  for (const value of ["http://bej.example.org", "https://localhost", "https://127.0.0.1", "https://192.168.0.100", "https://bej.example.org:3000", "https://bej.example.org/path", "https://bej.example.org/?a=1", "https://user:pass@bej.example.org", "https://bej.test", "not a URL"]) {
    assert.equal(siteUrl.parseSiteUrl(value), null, value);
  }
  process.env.SITE_URL = "http://localhost:3000";
  assert.throws(() => siteUrl.getSiteUrl(), /SITE_URL/);
});

test("without SITE_URL there are no canonicals or absolute social image claims", async () => {
  delete process.env.SITE_URL;
  globalThis.__seoTestHost = "localhost:3000";
  const metadata = seo.publicPageMetadata("Guías", "Contenido real.", "/guias");
  assert.deepEqual(metadata.robots, { index: false, follow: false });
  assert.equal(metadata.alternates, undefined);
  assert.equal(metadata.openGraph.images, undefined);
  assert.equal(metadata.twitter.images, undefined);
  assert.deepEqual(await robots(), { rules: { userAgent: "*", disallow: "/" } });
  assert.deepEqual(await sitemap(), []);
});

test("approved host gets public canonicals, social image and only published sitemap routes", async () => {
  process.env.SITE_URL = "https://bej.example.org";
  globalThis.__seoTestHost = "bej.example.org";
  const metadata = seo.publicPageMetadata("Guías", "Contenido real.", "/guias");
  assert.equal(metadata.alternates.canonical, "https://bej.example.org/guias");
  assert.equal(metadata.openGraph.images[0].url, "https://bej.example.org/og-image");
  assert.equal(metadata.twitter.images[0].url, "https://bej.example.org/og-image");
  assert.deepEqual(metadata.robots, { index: true, follow: true });

  const entries = await sitemap();
  assert.equal(entries.length, 7 + guides.length);
  for (const guide of guides) assert.ok(entries.some((entry) => entry.url === `https://bej.example.org/guias/${guide.slug}`));
  assert.ok(entries.every((entry) => !/mi-ruta|privacidad|impressum/.test(entry.url)));
  assert.ok(entries.every((entry) => !Object.hasOwn(entry, "lastModified")));
  assert.deepEqual(await robots(), {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://bej.example.org/sitemap.xml",
  });
});

test("a preview or local host is denied even if SITE_URL exists", async () => {
  process.env.SITE_URL = "https://bej.example.org";
  for (const host of ["localhost:3000", "preview.example.org", "bej.example.org:3000", null]) {
    globalThis.__seoTestHost = host;
    assert.deepEqual(await robots(), { rules: { userAgent: "*", disallow: "/" } });
    assert.deepEqual(await sitemap(), []);
  }
});

test("non-approved hosts also receive a noindex response header", () => {
  process.env.SITE_URL = "https://bej.example.org";
  const request = (host) => ({ headers: { get: () => host } });
  assert.equal(proxy(request("bej.example.org")).headers.get("X-Robots-Tag"), undefined);
  assert.equal(proxy(request("preview.example.org")).headers.get("X-Robots-Tag"), "noindex, nofollow");
  assert.equal(proxy(request("localhost:3000")).headers.get("X-Robots-Tag"), "noindex, nofollow");
  delete process.env.SITE_URL;
  assert.equal(proxy(request("bej.example.org")).headers.get("X-Robots-Tag"), "noindex, nofollow");
});

test("personal and unfinished pages use noindex metadata and retain unique titles", () => {
  const metadata = seo.noIndexMetadata("Mis datos", "Datos en este navegador.");
  assert.deepEqual(metadata.robots, { index: false, follow: false });
  assert.equal(metadata.title, "Mis datos");
  assert.equal(metadata.openGraph.title, "Mis datos | bej");
  assert.deepEqual(metadata.alternates, {});
  for (const file of [
    "../app/mi-ruta/page.tsx",
    "../app/mi-ruta/empezar/page.tsx",
    "../app/mi-ruta/aplicaciones/page.tsx",
    "../app/mi-ruta/mis-datos/page.tsx",
    "../app/privacidad/page.tsx",
    "../app/impressum/page.tsx",
  ]) assert.match(readFileSync(new URL(file, import.meta.url), "utf8"), /noIndexMetadata\(/);
  assert.match(readFileSync(new URL("../app/mi-ruta/layout.tsx", import.meta.url), "utf8"), /robots: \{ index: false, follow: false \}/);
});

test("root defaults to noindex without a homepage canonical for unknown routes", () => {
  const root = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  assert.match(root, /robots: \{ index: false, follow: false \}/);
  assert.doesNotMatch(root, /alternates:|publicPageMetadata\(/);
});
