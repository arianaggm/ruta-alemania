import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { guides } from "./_content/guides/catalog";
import { getSiteUrl, isApprovedHost } from "./_lib/site-url";

const publicPaths = ["/", "/guias", "/becas", "/checklist", "/buscadores", "/que-es-bej", "/novedades"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  if (!siteUrl || !isApprovedHost((await headers()).get("host"), siteUrl)) return [];

  return [
    ...publicPaths.map((path) => ({ url: new URL(path, siteUrl).toString() })),
    ...guides.map((guide) => {
      const lastModified = guide.updatedAt ?? guide.publishedAt;
      return {
        url: new URL(`/guias/${guide.slug}`, siteUrl).toString(),
        ...(lastModified ? { lastModified } : {}),
      };
    }),
  ];
}
