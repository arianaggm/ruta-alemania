import type { Metadata } from "next";
import { getSiteUrl } from "./site-url";

export const homeTitle = "bej | Tu camino para estudiar en el extranjero";
export const homeDescription = "Explora guías, becas y herramientas gratuitas para estudiar en el extranjero. Organiza tus aplicaciones y avanza a tu ritmo. Empezamos con Alemania.";

export function publicPageMetadata(title: string, description: string, path: string, article = false): Metadata {
  const siteUrl = getSiteUrl();
  const fullTitle = title === homeTitle ? title : `${title} | bej`;
  const canonical = siteUrl ? new URL(path, siteUrl).toString() : undefined;
  const image = siteUrl ? new URL("/og-image", siteUrl).toString() : undefined;

  return {
    title: title === homeTitle ? { absolute: title } : title,
    description,
    robots: { index: Boolean(siteUrl), follow: Boolean(siteUrl) },
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      type: article ? "article" : "website",
      locale: "es_MX",
      siteName: "bej",
      title: fullTitle,
      description,
      url: canonical,
      images: image ? [{ url: image, width: 1200, height: 630, alt: "bej: Cada camino comienza con un paso." }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: image ? [{ url: image, alt: "bej: Cada camino comienza con un paso." }] : undefined,
    },
  };
}

export function noIndexMetadata(title: string, description: string): Metadata {
  const fullTitle = `${title} | bej`;
  return {
    title,
    description,
    robots: { index: false, follow: false },
    alternates: {},
    openGraph: { title: fullTitle, description, siteName: "bej" },
    twitter: { card: "summary", title: fullTitle, description },
  };
}
