import { readFile, mkdir, writeFile, rename } from "node:fs/promises";
import { join } from "node:path";
import { registry } from "./registry.mjs";
import { compareSnapshots, extractSnapshot, parseRobots, renderReport, validateSnapshotStore } from "./core.mjs";
import { describeComparison } from "./restore-core.mjs";

const userAgent = "RutaAlemaniaScholarshipMonitor/1.0 (+manual editorial review)";
const outputDir = process.env.SCHOLARSHIP_MONITOR_DIR || join(process.cwd(), "reports", "scholarship-monitor");
const snapshotPath = join(outputDir, "snapshots.json");
const reportPath = join(outputDir, "latest.md");
const maxBytes = 2_000_000;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function boundedText(response) {
  const size = Number(response.headers.get("content-length"));
  if (size > maxBytes) throw new Error("Respuesta demasiado grande.");
  const reader = response.body?.getReader();
  if (!reader) throw new Error("Respuesta vacía.");
  const chunks = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel();
      throw new Error("Respuesta demasiado grande.");
    }
    chunks.push(value);
  }
  return new TextDecoder().decode(Buffer.concat(chunks));
}

async function request(url, { allowMissingRobots = false } = {}) {
  const response = await fetch(url, {
    headers: { "User-Agent": userAgent, Accept: "text/html,text/plain;q=0.8" },
    redirect: "manual",
    signal: AbortSignal.timeout(15_000),
  });
  if (response.status >= 300 && response.status < 400) {
    throw new Error("Redirección no seguida; revisa la URL oficial manualmente.");
  }
  if (allowMissingRobots && [404, 410].includes(response.status)) return response;
  if (!response.ok) throw new Error(`HTTP ${response.status}; fuente no disponible.`);
  return response;
}

async function loadStore() {
  try {
    return { store: validateSnapshotStore(JSON.parse(await readFile(snapshotPath, "utf8")), registry), missing: false };
  } catch (error) {
    if (error?.code === "ENOENT") return { store: { version: 1, entries: {} }, missing: true };
    throw error;
  }
}

async function comparisonContext(missing) {
  if (process.env.GITHUB_ACTIONS !== "true") {
    return missing ? "No había snapshots locales; se establece una línea de base nueva." : "Comparación con el snapshot local anterior.";
  }
  const status = JSON.parse(await readFile(join(outputDir, "restore-status.json"), "utf8"));
  return describeComparison(status, missing);
}

async function main() {
  const { store, missing } = await loadStore();
  const baselineContext = await comparisonContext(missing);
  console.log(baselineContext);
  const rows = [];
  const robotsCache = new Map();
  const lastRequest = new Map();
  for (const item of registry) {
    const prior = store.entries[item.id];
    const origin = new URL(item.sourceUrl).origin;
    try {
      if (!robotsCache.has(origin)) {
        try {
          const robotsResponse = await request(`${origin}/robots.txt`, { allowMissingRobots: true });
          if ([404, 410].includes(robotsResponse.status)) {
            robotsCache.set(origin, parseRobots(""));
          } else {
            if (/text\/html/i.test(robotsResponse.headers.get("content-type") ?? "")) throw new Error("robots.txt devolvió HTML en lugar de reglas.");
            robotsCache.set(origin, parseRobots(await boundedText(robotsResponse)));
          }
          lastRequest.set(origin, Date.now());
        } catch (error) {
          robotsCache.set(origin, error instanceof Error ? error : new Error(String(error)));
        }
      }
      const robots = robotsCache.get(origin);
      if (robots instanceof Error) throw new Error(`No se pudo consultar robots.txt: ${robots.message}`);
      if (!robots.allows(item.sourceUrl)) throw new Error("robots.txt no permite consultar esta ruta.");
      const remaining = robots.delayMs - (Date.now() - (lastRequest.get(origin) ?? 0));
      if (remaining > 0) await sleep(remaining);
      lastRequest.set(origin, Date.now());
      const response = await request(item.sourceUrl);
      if (!/text\/html/i.test(response.headers.get("content-type") ?? "")) throw new Error("La fuente no respondió con HTML.");
      const now = new Date().toISOString();
      const snapshot = extractSnapshot(await boundedText(response), item.sourceUrl, item.expectedText, now);
      const comparison = compareSnapshots(prior, snapshot);
      store.entries[item.id] = snapshot;
      rows.push({ ...item, ...comparison, reviewNeeded: comparison.reviewNeeded || item.catalogVerificationStatus !== "verified", fields: snapshot.fields, checkedAt: now });
    } catch (error) {
      rows.push({ ...item, status: "source-unavailable", checkedAt: prior?.checkedAt ?? null, reviewNeeded: true, error: error instanceof Error ? error.message : String(error) });
    }
  }
  await mkdir(outputDir, { recursive: true });
  const generatedAt = new Date().toISOString();
  await writeFile(reportPath, renderReport(rows, generatedAt, baselineContext), "utf8");
  const temporary = `${snapshotPath}.${process.pid}.tmp`;
  await writeFile(temporary, `${JSON.stringify(store, null, 2)}\n`, "utf8");
  await rename(temporary, snapshotPath);
  console.log(`Reporte: ${reportPath}`);
  console.log(`Snapshots: ${snapshotPath}`);
  for (const row of rows) console.log(`${row.title}: ${row.status}${row.reviewNeeded ? " (revisión manual)" : ""}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
