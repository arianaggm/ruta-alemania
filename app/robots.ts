import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getSiteUrl, isApprovedHost } from "./_lib/site-url";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = getSiteUrl();
  const host = (await headers()).get("host");

  if (!siteUrl || !isApprovedHost(host, siteUrl)) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  // Personal and unfinished pages stay crawlable here so crawlers can read their noindex tags.
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", siteUrl).toString(),
  };
}
