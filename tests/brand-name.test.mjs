import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";

function source(path) {
  return readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
}

function contrast(foreground, background) {
  const luminance = (hex) => {
    const channels = hex.match(/[\da-f]{2}/gi).map((value) => parseInt(value, 16) / 255);
    const [red, green, blue] = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  };
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
}

test("brand uses a semantic inline span, bold Fraunces, and restrained sizing", () => {
  const component = source("app/_components/brand-name.tsx");
  const css = source("app/_components/brand-name.module.css");
  assert.match(component, /return <span className=.*>bej<\/span>/);
  assert.doesNotMatch(component, /use client|dangerouslySetInnerHTML/);
  assert.match(css, /font-family: var\(--font-bej-display\), Georgia, serif/);
  assert.match(css, /font-weight: 700/);
  assert.match(css, /font-size: 1\.12em/);
  assert.match(css, /font-size: 1em/);
  assert.match(css, /line-height: 1/);
  assert.match(css, /vertical-align: -0\.015em/);
  assert.ok(contrast("005f9e", "fff5e8") >= 4.5);
  assert.ok(contrast("fff5e8", "005f9e") >= 4.5);
});

test("multiple mentions keep explicit spacing; headings and blue sections use appropriate variants", () => {
  const about = source("app/que-es-bej/page.tsx");
  const home = source("app/page.tsx");
  const updates = source("app/novedades/page.tsx");
  assert.match(about, /Hoy <BrandName \/> empieza con Alemania\.[\s\S]*en Mi <BrandName \/> puedes organizar/);
  assert.match(about, /La historia detrás de <em><BrandName context="heading" tone="light" \/>\.<\/em>/);
  assert.match(home, /<BrandName tone="light" \/> significa camino o sendero/);
  assert.match(updates, /Lo nuevo en <em><BrandName context="heading" \/>\.<\/em>/);
  assert.match(about, /<strong>BEJ<\/strong>/);
  assert.doesNotMatch(about, /<BrandName[^>]*>BEJ/);
  assert.match(source("app/mi-ruta/mis-datos/_components/data-backup.tsx"), /Respaldo restaurado\. Abre Mi <BrandName \/>/);
});

test("article's explicit brand token preserves the exact existing sentence", async () => {
  const javascript = ts.transpileModule(source("app/_content/guides/articles/como-aplicar-mediante-uni-assist-desde-mexico.ts"), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const { default: article } = await import(`data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`);
  const paragraph = article.sections.flatMap((section) => section.paragraphs).find((value) => typeof value !== "string" && value.parts?.some((part) => part?.brand));
  assert.ok(paragraph);
  const copy = paragraph.parts.map((part) => typeof part === "string" ? part : part.brand ? "bej" : "").join("");
  assert.equal(copy, "Guarda el enlace del programa y sus indicaciones, registra tus documentos por solicitud y revisa el estado en cada portal. Mi bej ayuda a ordenar pasos generales; Mis aplicaciones permite llevar una lista editable para cada programa, sin convertirla en una lista oficial de requisitos.");
  assert.match(source("app/guias/[slug]/page.tsx"), /if \("brand" in part\) return <BrandName key=\{index\} \/>/);
});
