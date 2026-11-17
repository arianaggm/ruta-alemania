import { isIP } from "node:net";

export function parseSiteUrl(raw: string | undefined): URL | null {
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }

  const hostname = url.hostname.toLowerCase();
  if (url.protocol !== "https:" || url.username || url.password || url.port
    || url.pathname !== "/" || url.search || url.hash
    || !hostname.includes(".") || isIP(hostname.replace(/^\[|\]$/g, ""))
    || ["localhost", ".localhost", ".local", ".internal", ".test", ".invalid", ".example"].some((suffix) => hostname === suffix || hostname.endsWith(suffix))) {
    return null;
  }
  return url;
}

export function getSiteUrl(): URL | null {
  const raw = process.env.SITE_URL;
  if (!raw) return null;
  const url = parseSiteUrl(raw);
  if (!url) throw new Error("SITE_URL debe ser el origen HTTPS del dominio de producción aprobado, sin ruta, puerto ni parámetros.");
  return url;
}

export function isApprovedHost(host: string | null, siteUrl: URL | null): boolean {
  return Boolean(siteUrl && host && host.toLowerCase() === siteUrl.host.toLowerCase());
}
