import { createHash } from "node:crypto";

const labels = {
  deadline: /^(?:application deadlines?|deadline|bewerbungsfrist)$/i,
  eligibility: /^(?:who can apply|target group|eligibility|wer kann sich bewerben)$/i,
  amounts: /^(?:value|scholarship value|amount|funding amount|leistungen)$/i,
  requirements: /^(?:application requirements?|academic requirements?|requirements|voraussetzungen)$/i,
  applicationLink: /^(?:how to apply|application procedure|submitting an application|application process|bewerbung)$/i,
};

export function cleanText(value) {
  return value
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[^]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractSnapshot(html, sourceUrl, expectedText, checkedAt) {
  if (!/<(?:html|main|article|h1|h2)\b/i.test(html)) throw new Error("La respuesta no parece HTML útil.");
  const text = cleanText(html);
  if (text.length < 100 || !text.toLowerCase().includes(expectedText.toLowerCase())) {
    throw new Error("La página no contiene el título esperado o está incompleta.");
  }
  const content = text.slice(0, 250_000);
  const fields = {};
  const headingPattern = /<h([2-4])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  const headings = [...html.matchAll(headingPattern)];
  for (let index = 0; index < headings.length; index += 1) {
    const heading = cleanText(headings[index][2]);
    const key = Object.keys(labels).find((field) => labels[field].test(heading));
    if (!key || fields[key]) continue;
    const start = headings[index].index + headings[index][0].length;
    const end = headings[index + 1]?.index ?? html.length;
    const section = cleanText(html.slice(start, end));
    if (section.length >= 8 && section.length <= 1_500) fields[key] = section;
    if (key === "applicationLink") {
      const links = [...html.slice(start, end).matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)]
        .map((match) => {
          try {
            const link = new URL(match[1], sourceUrl);
            return ["https:", "http:"].includes(link.protocol) ? link.href : null;
          } catch { return null; }
        })
        .filter(Boolean);
      if (links.length) fields.applicationLinks = [...new Set(links)].join("\n");
    }
  }
  return {
    sourceUrl,
    checkedAt,
    hash: createHash("sha256").update(content).digest("hex"),
    fields,
  };
}

export function compareSnapshots(previous, current) {
  if (!previous) return { status: "baseline", changes: [], reviewNeeded: true };
  const changes = [];
  for (const field of new Set([...Object.keys(previous.fields), ...Object.keys(current.fields)])) {
    if (previous.fields[field] !== current.fields[field]) {
      changes.push({ field, old: previous.fields[field] ?? null, new: current.fields[field] ?? null });
    }
  }
  const changed = previous.hash !== current.hash;
  return {
    status: changed ? "content-changed" : "unchanged",
    changes,
    reviewNeeded: changed || changes.length > 0,
  };
}

export function parseRobots(content, userAgent = "RutaAlemaniaScholarshipMonitor") {
  const groups = [];
  let agents = [];
  let rules = [];
  let delay = 0;
  const flush = () => {
    if (agents.length) groups.push({ agents, rules, delay });
    agents = [];
    rules = [];
    delay = 0;
  };
  for (const raw of content.split(/\r?\n/)) {
    const line = raw.split("#")[0].trim();
    const match = line.match(/^(user-agent|allow|disallow|crawl-delay)\s*:\s*(.*)$/i);
    if (!match) continue;
    const [, directive, value] = match;
    const name = directive.toLowerCase();
    if (name === "user-agent") {
      if (rules.length || delay) flush();
      agents.push(value.toLowerCase());
    } else if (agents.length && (name === "allow" || name === "disallow") && value.startsWith("/")) {
      rules.push({ allow: name === "allow", pattern: value });
    } else if (agents.length && name === "crawl-delay") {
      const parsed = Number(value);
      if (Number.isFinite(parsed) && parsed >= 0) delay = Math.max(delay, parsed);
    }
  }
  flush();
  const agent = userAgent.toLowerCase();
  const specific = groups.filter((group) => group.agents.some((name) => name !== "*" && agent.includes(name)));
  const selected = specific.length ? specific : groups.filter((group) => group.agents.includes("*"));
  return {
    delayMs: Math.max(2_000, ...selected.map((group) => group.delay * 1_000)),
    allows(url) {
      const target = new URL(url);
      const path = target.pathname + target.search;
      const matches = selected.flatMap((group) => group.rules).filter((rule) => {
        const pattern = rule.pattern.replace(/\$$/, "");
        const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
        return new RegExp(`^${escaped}${rule.pattern.endsWith("$") ? "$" : ""}`).test(path);
      });
      matches.sort((a, b) => b.pattern.length - a.pattern.length || Number(b.allow) - Number(a.allow));
      return matches[0]?.allow ?? true;
    },
  };
}

export function validateSnapshotStore(value, registry) {
  if (!value || typeof value !== "object" || value.version !== 1 || !value.entries || typeof value.entries !== "object" || Array.isArray(value.entries)) {
    throw new Error("El archivo de snapshots no tiene un formato compatible.");
  }
  const sources = new Map(registry.map((item) => [item.id, item.sourceUrl]));
  for (const [id, entry] of Object.entries(value.entries)) {
    if (!sources.has(id) || !entry || typeof entry !== "object" || entry.sourceUrl !== sources.get(id) || typeof entry.checkedAt !== "string" || Number.isNaN(Date.parse(entry.checkedAt)) || !/^[a-f0-9]{64}$/.test(entry.hash) || !entry.fields || typeof entry.fields !== "object" || Array.isArray(entry.fields) || Object.values(entry.fields).some((field) => typeof field !== "string")) {
      throw new Error(`Snapshot inválido: ${id}. No se sobrescribirá.`);
    }
  }
  return value;
}

export function renderReport(rows, generatedAt) {
  const lines = ["# Monitoreo editorial de becas", "", `Generado: ${generatedAt}`, "", "Una detección automática no verifica elegibilidad, fechas ni importes. Confirma cada cambio en la convocatoria oficial antes de actualizar el catálogo público.", ""];
  for (const row of rows) {
    lines.push(`## ${row.title}`, "", `Fuente oficial: ${row.sourceUrl}`, `Estado: ${row.status}`, `Verificación del catálogo público: ${row.catalogVerificationStatus}`, `Última revisión editorial registrada: ${row.catalogLastChecked ?? "ninguna"}`, `Última consulta exitosa: ${row.checkedAt ?? "ninguna"}`, `Revisión manual: ${row.reviewNeeded ? "sí" : "no"}`, `Alcance: ${row.scope}`, "");
    if (row.fields && Object.keys(row.fields).length) lines.push(`Campos localizados en el texto oficial (sin verificar aplicabilidad individual): ${Object.keys(row.fields).join(", ")}`, "");
    if (row.error) lines.push(`Motivo: ${row.error}`, "");
    if (row.changes?.length) {
      for (const change of row.changes) lines.push(`- ${change.field}: anterior: ${JSON.stringify(change.old)}; nuevo: ${JSON.stringify(change.new)}`);
      lines.push("");
    }
  }
  return lines.join("\n");
}
