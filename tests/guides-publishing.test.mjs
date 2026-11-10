import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import ts from "typescript";

const baseline = JSON.parse(readFileSync(new URL("./fixtures/guides-baseline.json", import.meta.url), "utf8"));
const uniAssistSlug = "como-aplicar-mediante-uni-assist-desde-mexico";
const metadataRevisedSlugs = new Set(["documentos-que-necesitas-desde-mexico", "como-prepararte-para-la-visa-de-estudiante"]);
const contentRevisedSlugs = new Set([...metadataRevisedSlugs, "como-buscar-maestrias-en-alemania", "cuanto-cuesta-estudiar-en-alemania"]);

function moduleUrl(file, imports = {}) {
  let javascript = ts.transpileModule(readFileSync(new URL(file, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  for (const [specifier, url] of Object.entries(imports)) {
    javascript = javascript.replaceAll(`"${specifier}"`, `"${url}"`);
  }
  return `data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`;
}

const catalogUrl = moduleUrl("../app/_content/guides/catalog.ts");
const catalog = await import(catalogUrl);

test("all original slugs retain order and the new guide is registered once", () => {
  const slugs = catalog.guides.map((guide) => guide.slug);
  assert.deepEqual(slugs.filter((slug) => slug !== uniAssistSlug), baseline.map((guide) => guide.slug));
  assert.equal(new Set(slugs).size, baseline.length + 1);
  assert.equal(slugs.indexOf(uniAssistSlug), slugs.indexOf("documentos-que-necesitas-desde-mexico") + 1);
  for (const original of baseline) {
    const guide = catalog.getGuideBySlug(original.slug);
    assert.ok(guide);
    if (!metadataRevisedSlugs.has(original.slug)) {
      assert.deepEqual(
        { slug: guide.slug, title: guide.title, category: guide.category, readingTime: guide.readingTime, excerpt: guide.summary, tags: guide.tags },
        { slug: original.slug, title: original.title, category: original.category, readingTime: original.readingTime, excerpt: original.excerpt, tags: original.tags },
      );
      assert.deepEqual(guide.sources, []);
    }
    assert.equal(guide.status, "published");
    assert.equal(guide.author, null);
    assert.equal(guide.publishedAt, null);
    assert.equal(guide.updatedAt, null);
    assert.equal(guide.reviewedAt, null);
  }
  const added = catalog.getGuideBySlug(uniAssistSlug);
  assert.equal(added.status, "published");
  assert.equal(added.author, null);
  assert.equal(added.publishedAt, null);
  assert.equal(added.updatedAt, null);
  assert.equal(added.reviewedAt, null);
  assert.ok(added.sources.length > 0);
  assert.ok(catalog.guideCatalog.every((guide) => guide.status === "published"));
});

test("three unchanged article bodies still match the captured baseline", async () => {
  const articleFiles = readdirSync(new URL("../app/_content/guides/articles/", import.meta.url)).filter((file) => file.endsWith(".ts"));
  assert.deepEqual(articleFiles.sort(), [...baseline.map((guide) => `${guide.slug}.ts`), `${uniAssistSlug}.ts`].sort());
  for (const original of baseline.filter((guide) => !contentRevisedSlugs.has(guide.slug))) {
    const { default: article } = await import(moduleUrl(`../app/_content/guides/articles/${original.slug}.ts`));
    const body = {
      intro: article.intro,
      keyTakeaways: article.keyTakeaways,
      checklistItems: article.checklistItems,
      sections: article.sections,
    };
    const hash = createHash("sha256").update(JSON.stringify(body)).digest("hex");
    assert.equal(hash, original.bodySha256, `Article changed: ${original.slug}`);
  }
});

test("DAAD search experience preserves the reported filters, counts and practical links", async () => {
  const slug = "como-buscar-maestrias-en-alemania";
  const summary = catalog.getGuideBySlug(slug);
  assert.equal(summary.status, "published");
  assert.deepEqual(summary.sources, []);
  const { default: article } = await import(moduleUrl(`../app/_content/guides/articles/${slug}.ts`));
  const section = article.sections.find((entry) => entry.title === "Cómo busqué mi maestría en Alemania utilizando DAAD");
  assert.ok(section);
  assert.deepEqual(section.table.columns, ["Paso", "Filtros que utilicé", "Programas"]);
  assert.deepEqual(section.table.rows, [
    ["Inicio", "Sin filtros", "2,506"],
    ["1", "Master's degree; English only; Subject groups: Engineering and Mathematics; Natural Sciences", "1,007"],
    ["2", "Mode of study: Fully onsite", "940"],
    ["3", "Subject areas: Bioengineering; Chemical Engineering, Process Technology; Technical Health Systems; Optical Technologies; Computer Science; Nanosciences; Neurosciences", "386"],
    ["4", { before: "Tuition fees: ", strong: "“No fees”", after: "" }, "245"],
    ["5A", "Winter semester", "238"],
    ["5B", "Summer semester", "133"],
  ]);
  assert.match(section.paragraphs.join(" "), /Yo empecé/);
  assert.match(section.paragraphs.join(" "), /no los resultados actuales/);
  assert.equal(section.bullets, undefined);
  assert.deepEqual(article.sections.map((entry) => entry.title), [
    "Empieza con filtros claros", "Dónde buscar programas", "Cómo busqué mi maestría en Alemania utilizando DAAD",
    "Semestres de inicio", "Colegiaturas", "Programas que descarté", "Comparación de ciudades",
    "Mi decisión final", "Qué comparar antes de aplicar",
  ]);
  const byTitle = (title) => article.sections.find((entry) => entry.title === title);
  assert.match(byTitle("Semestres de inicio").paragraphs[0], /238 y 133 resultados, respectivamente/);
  assert.match(byTitle("Semestres de inicio").paragraphs[0], /no deben sumarse/);
  assert.deepEqual(byTitle("Colegiaturas").paragraphs[0], {
    before: "Seleccioné el filtro ",
    strong: "“No fees”",
    after: " para buscar programas sin colegiatura. Sin embargo, esto no significa que estén exentos de la contribución semestral (Semesterbeitrag). Por eso, es importante consultar los costos directamente con cada universidad.",
  });
  assert.deepEqual(byTitle("Programas que descarté").bullets, [
    "Agrobioinformatics", "Air Transport and Logistics", "Applied Geosciences",
  ]);
  assert.match(byTitle("Comparación de ciudades").paragraphs[0], /renta, la calidad de vida, el transporte y el estilo de vida/);
  assert.match(byTitle("Comparación de ciudades").paragraphs[0], /Excel.*uni-assist/);
  assert.match(byTitle("Mi decisión final").paragraphs[0], /elegí Computational Modeling and Simulation \(CMS\) en TU Dresden/);
  assert.deepEqual(article.relatedLinks.map((link) => link.href), [
    "https://www2.daad.de/deutschland/studienangebote/international-programmes/en/",
    "/mi-ruta/aplicaciones",
  ]);
});

test("guide renderer uses semantic lists and fixed-size markers for enumerations", () => {
  const page = readFileSync(new URL("../app/guias/[slug]/page.tsx", import.meta.url), "utf8");
  assert.match(page, /section\.paragraphs\.map[\s\S]*<p key=\{index\}>\{renderGuideText\(paragraph\)\}<\/p>/);
  assert.match(page, /<strong className="font-semibold text-dark-text">\{text\.strong\}<\/strong>/);
  assert.match(page, /<em key=\{index\}>\{part\.em\}<\/em>/);
  assert.match(page, /<ul className="mt-6 space-y-3">[\s\S]*section\.bullets\.map[\s\S]*<li/);
  assert.match(page, /shrink-0 rounded-full bg-rosa-mexicano/);
  assert.doesNotMatch(page, /className="flex items-start gap-3 rounded-3xl bg-peach-fuzz\/55 p-4"/);
});

test("Dresden budget remains a personal example with reported amounts and no double counting", async () => {
  const slug = "cuanto-cuesta-estudiar-en-alemania";
  const summary = catalog.getGuideBySlug(slug);
  assert.equal(summary.status, "published");
  assert.deepEqual(summary.sources, []);
  const { default: article } = await import(moduleUrl(`../app/_content/guides/articles/${slug}.ts`));
  assert.deepEqual(article.sections.map((section) => section.title), [
    "Costos universitarios y administrativos", "Costo de vida y cuenta bloqueada",
    "Mi presupuesto como estudiante en Dresden", "Arma un presupuesto de llegada",
  ]);
  const example = article.sections[2];
  const plainText = (paragraph) => typeof paragraph === "string" ? paragraph : paragraph.parts.map((part) => typeof part === "string" ? part : part.strong ?? part.em).join("");
  assert.deepEqual(example.paragraphs.map(plainText), [
    "Una de las cosas que más me preocupaban antes de mudarme a Alemania era cuánto me iba a costar vivir aquí, porque aunque muchas universidades públicas no cobran colegiatura, eso no significa que estudiar en Alemania sea gratis.",
    "En mi caso, vivo en Dresden, una ciudad donde el costo de vida puede ser bastante más accesible que en otras ciudades alemanas. Actualmente pago 450 € por una habitación en una WG, con calefacción, agua y electricidad incluidas (Warmmiete), así que no tengo que preocuparme por pagar esos servicios por separado.",
    "En cuanto al supermercado, gasto alrededor de 200 € al mes y suelo comprar en REWE porque literalmente es el que tengo más cerca. Eso sí, si hiciera mis compras en Netto, probablemente podría ahorrar un poco más, pero por comodidad termino yendo a REWE. En Alemania también encontrarás supermercados como Aldi, Lidl, Penny, Edeka y Kaufland, así que vale la pena comparar precios, ofertas y marcas propias antes de decidir dónde hacer tus compras.",
    "Mi seguro médico cuesta 148,50 € mensuales y por mi plan de celular de Lidl Connect pago 15 €. En cuanto al transporte, mi Deutschlandsemesterticket está incluido en la cuota semestral de la universidad, que en mi caso fue de 361 €, por lo que no tengo que comprar un abono mensual adicional.",
    "Para salidas, restaurantes o actividades suelo gastar menos de 150 € al mes, aunque esa ha sido la cantidad máxima que he llegado a gastar en mis meses más caros.",
    "Si sumo todos estos gastos y divido mi cuota semestral entre seis meses, mi presupuesto puede llegar a aproximadamente 1.024 € mensuales en un mes con bastante ocio.",
    "Claro que esto depende muchísimo de la ciudad en la que vivas, el tipo de alojamiento que consigas y tus hábitos de consumo. Por eso, antes de elegir una universidad, también te recomendaría investigar cuánto cuesta vivir en esa ciudad, no solamente cuánto cuesta estudiar ahí.",
  ]);
  const styledParts = example.paragraphs.flatMap((paragraph) => typeof paragraph === "string" ? [] : paragraph.parts.filter((part) => typeof part !== "string"));
  assert.deepEqual(styledParts.filter((part) => "strong" in part).map((part) => part.strong), [
    "450 € por una habitación en una WG", "200 € al mes", "148,50 € mensuales", "15 €", "361 €", "150 € al mes", "1.024 € mensuales",
  ]);
  assert.deepEqual(styledParts.filter((part) => "em" in part).map((part) => part.em), ["Warmmiete", "Deutschlandsemesterticket"]);
  assert.deepEqual(example.table.rows, [
    ["Renta en WG", "450 € al mes", "Warmmiete: calefacción, agua y electricidad incluidas"],
    ["Supermercado", "Aproximadamente 200 € al mes", "Principalmente en REWE"],
    ["Seguro médico", "148,50 € al mes", ""],
    ["Teléfono", "15 € al mes", "Lidl Connect"],
    ["Transporte", "Sin gasto regular adicional reportado", "Deutschlandsemesterticket incluido en la contribución semestral"],
    ["Contribución semestral", "361 € por semestre", "Equivalente a aproximadamente 60,17 € al mes"],
    ["Ocio", "Hasta 150 € al mes", "Solo en mis meses de mayor gasto; no es mi promedio"],
    ["Total sin ocio", "Aproximadamente 873,67 € al mes", "Incluye la parte mensual de la contribución semestral"],
    ["Total con el máximo de ocio reportado", "Aproximadamente 1.023,67 € al mes", "No representa mi gasto mensual promedio"],
  ]);
  const baseCents = Math.round(45000 + 20000 + 14850 + 1500 + 36100 / 6);
  assert.equal(baseCents, 87367);
  assert.equal(baseCents + 15000, 102367);
  assert.deepEqual(article.relatedLinks.map((link) => link.href), [
    "https://housinganywhere.com/blog/living/guide-to-german-supermarkets",
    "https://www.auswaertiges-amt.de/en/visa-service/visabestimmungen-node/sperrkonto-seite",
  ]);
  const page = readFileSync(new URL("../app/guias/[slug]/page.tsx", import.meta.url), "utf8");
  assert.match(page, /slug === "cuanto-cuesta-estudiar-en-alemania"[\s\S]*import\("\.\/_components\/budget-calculator"\)/);
  assert.match(page, /\{BudgetCalculator \? <BudgetCalculator \/> : null\}/);
});

test("draft summaries are excluded and the server loader refuses unpublished slugs", async () => {
  const draft = { ...catalog.guides[0], slug: "guia-en-borrador", status: "draft" };
  assert.deepEqual(catalog.publishedGuides([...catalog.guides, draft]).map((guide) => guide.slug), catalog.guides.map((guide) => guide.slug));
  assert.equal(catalog.getGuideBySlug(draft.slug), undefined);

  const loaders = {};
  for (const guide of catalog.guides) {
    loaders[`./articles/${guide.slug}`] = moduleUrl(`../app/_content/guides/articles/${guide.slug}.ts`);
  }
  const loader = await import(moduleUrl("../app/_content/guides/load-guide.server.ts", {
    "./catalog": catalogUrl,
    ...loaders,
  }));
  assert.equal(await loader.loadPublishedGuide(draft.slug), null);
  for (const guide of catalog.guides) {
    const loaded = await loader.loadPublishedGuide(guide.slug);
    assert.equal(loaded.slug, guide.slug);
    assert.equal(loaded.title, guide.title);
    assert.ok(loaded.sections.length > 0);
  }
});

test("public guide links and Mi Ruta recommendations still target published slugs", async () => {
  const publicSlugs = new Set(catalog.guides.map((guide) => guide.slug));
  for (const file of ["../app/page.tsx", "../app/guias/page.tsx", "../app/mi-ruta/_lib/roadmap.ts"]) {
    const source = readFileSync(new URL(file, import.meta.url), "utf8");
    for (const [, slug] of source.matchAll(/\/guias\/([a-z0-9-]+)(?=["`])/g)) {
      assert.ok(publicSlugs.has(slug), `${file} links to an unpublished guide: ${slug}`);
    }
  }
  const roadmap = await import(moduleUrl("../app/mi-ruta/_lib/roadmap.ts", {
    "../../_data/checklist": moduleUrl("../app/_data/checklist.ts"),
    "../../_content/guides/catalog": catalogUrl,
    "../../_data/scholarships": moduleUrl("../app/_data/scholarships.ts"),
  }));
  for (const stage of ["exploring", "applying", "accepted", "inGermany"]) {
    for (const studyLevel of ["bachelor", "master", "phd"]) {
      const recommendations = roadmap.getRecommendedGuides({ stage, studyLevel });
      assert.ok(recommendations.every((guide) => publicSlugs.has(guide.slug)));
    }
  }
});

test("the detail route generates only public paths and uses summary metadata and a gated body loader", () => {
  const page = readFileSync(new URL("../app/guias/[slug]/page.tsx", import.meta.url), "utf8");
  assert.match(page, /export const dynamicParams = false/);
  assert.match(page, /return guides\.map\(\(guide\) => \(\{\s*slug: guide\.slug/);
  assert.match(page, /const guide = getGuideBySlug\(slug\)/);
  assert.match(page, /description: guide\.summary/);
  assert.match(page, /const guide = await loadPublishedGuide\(slug\)/);
  assert.match(page, /if \(!guide\) \{\s*notFound\(\)/);
  assert.ok(existsSync(new URL("../app/guias/[slug]/page.tsx", import.meta.url)));
});

test("client-side guide consumers use metadata only", () => {
  const source = readFileSync(new URL("../app/_content/guides/catalog.ts", import.meta.url), "utf8");
  const drafts = readFileSync(new URL("../app/_content/guides/drafts.server.ts", import.meta.url), "utf8");
  assert.doesNotMatch(source, /articles\/|\bintro\b|\bsections\b|\bkeyTakeaways\b/);
  assert.match(drafts, /draftGuides/);
  assert.doesNotMatch(source, /from "\.\/drafts\.server"/);
  for (const guide of catalog.guideCatalog) {
    assert.equal("intro" in guide, false);
    assert.equal("sections" in guide, false);
  }
  for (const file of ["../app/page.tsx", "../app/guias/page.tsx", "../app/mi-ruta/_lib/roadmap.ts"]) {
    const consumer = readFileSync(new URL(file, import.meta.url), "utf8");
    assert.match(consumer, /_content\/guides\/catalog/);
    assert.doesNotMatch(consumer, /_content\/guides\/load-guide|_content\/guides\/articles/);
  }
});

test("updated Mexican guides have official sources and safe cross-links", async () => {
  const publishedSlugs = new Set(catalog.guides.map((guide) => guide.slug));
  for (const slug of ["documentos-que-necesitas-desde-mexico", uniAssistSlug, "como-prepararte-para-la-visa-de-estudiante"]) {
    const summary = catalog.getGuideBySlug(slug);
    assert.ok(summary.sources.length > 0);
    for (const source of summary.sources) {
      assert.equal(new URL(source.url).protocol, "https:");
      assert.equal(source.checkedAt, "2026-11-10");
    }
    const { default: article } = await import(moduleUrl(`../app/_content/guides/articles/${slug}.ts`));
    for (const link of article.relatedLinks) {
      if (link.href.startsWith("/guias/")) assert.ok(publishedSlugs.has(link.href.slice(7)));
      else assert.ok(["/mi-ruta", "/mi-ruta/aplicaciones"].includes(link.href));
    }
  }
  const { default: documents } = await import(moduleUrl("../app/_content/guides/articles/documentos-que-necesitas-desde-mexico.ts"));
  const { default: uniAssist } = await import(moduleUrl(`../app/_content/guides/articles/${uniAssistSlug}.ts`));
  for (const article of [documents, uniAssist]) {
    const body = article.sections.map((section) => `${section.title} ${section.paragraphs.join(" ")}`).join(" ");
    assert.match(body, /Plan de estudios/);
    assert.match(body, /traducci[oó]n/);
    assert.match(body, /apostilla/);
    assert.ok(article.checklistItems.length > 0);
  }
  assert.match(uniAssist.sections.map((section) => section.title).join(" "), /VPD/);
  assert.match(uniAssist.sections.map((section) => section.title).join(" "), /CENEVAL/);
  const page = readFileSync(new URL("../app/guias/[slug]/page.tsx", import.meta.url), "utf8");
  assert.match(page, /guide\.sources\.map/);
  assert.match(page, /guide\.relatedLinks\.map/);
});

test("the author's submitted documents and separate apostille experience stay explicit", async () => {
  for (const slug of ["documentos-que-necesitas-desde-mexico", uniAssistSlug]) {
    const { default: article } = await import(moduleUrl(`../app/_content/guides/articles/${slug}.ts`));
    const paragraphs = article.sections.flatMap((section) => section.paragraphs);
    const submission = paragraphs.find((paragraph) => /envié a uni-assist/.test(paragraph));
    assert.ok(submission, `${slug} must describe the actual submission in first person`);
    for (const document of [
      "Bachillerato", "certificado universitario", "materias y calificaciones", "Plan de estudios",
      "calificaciones de mi universidad", "TOEFL", "Universidad Anáhuac Mayab", "EF SET",
      "mi CV", "mi carta de motivación", "dos cartas de recomendación", "mi pasaporte",
    ]) {
      assert.ok(submission.includes(document), `${slug} omits ${document}`);
    }
    const fullText = JSON.stringify(article);
    assert.match(fullText, /apostillé/);
    assert.match(fullText, /cédula profesional/);
    assert.match(fullText, /SEP/);
    assert.doesNotMatch(fullText, /la creadora preparó|Tampoco implica que todos se hayan enviado|Si tu vía usa uni-assist/);
  }
});

test("the uni-assist report appears after submission without implying admission or a guaranteed result", async () => {
  const { default: article } = await import(moduleUrl(`../app/_content/guides/articles/${uniAssistSlug}.ts`));
  const submissionIndex = article.sections.findIndex((section) => section.title === "My assist y preparación de archivos");
  const report = article.sections[submissionIndex + 1];
  assert.ok(submissionIndex >= 0);
  assert.equal(report.title, "¿Qué pasa después de enviar tus documentos a uni-assist?");
  assert.equal(report.paragraphs.length, 3);
  assert.match(report.paragraphs[0], /el proceso ya comenzó/);
  assert.match(report.paragraphs[0], /si encuentras algún error/);
  assert.match(report.paragraphs[1], /Yo recibí un Prüfbericht fechado el 17 de junio de 2024/);
  assert.match(report.paragraphs[1], /aproximadamente seis semanas/);
  assert.match(report.paragraphs[1], /Ingeniería Biomédica/);
  assert.match(report.paragraphs[1], /1\.8 en la escala alemana/);
  assert.match(report.paragraphs[1], /solo a mi experiencia/);
  assert.match(report.paragraphs[2], /no es una carta de admisión/);
  assert.match(report.paragraphs[2], /Tampoco es lo mismo que una VPD/);
  assert.doesNotMatch(report.paragraphs.join(" "), /número de solicitud|fecha de nacimiento|domicilio/);
});
