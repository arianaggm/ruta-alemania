import type { Metadata } from "next";
import Link from "next/link";

import { BejEditorialShell } from "../_components/bej-editorial-shell";
import { BrandName } from "../_components/brand-name";
import { getPublishedUpdates, updates, type UpdateCategory } from "../_data/updates";
import { publicPageMetadata } from "../_lib/seo";
import styles from "../editorial.module.css";

export const metadata: Metadata = publicPageMetadata(
  "Novedades",
  "Cambios y contenido nuevo de bej, publicados cuando hay información confirmada para compartir.",
  "/novedades",
);

const categoryLabels: Record<UpdateCategory, string> = {
  feature: "Nueva función",
  improvement: "Mejora",
  fix: "Corrección",
  content: "Contenido",
};

const publishedUpdates = getPublishedUpdates(updates);

export default function UpdatesPage() {
  return <BejEditorialShell>
    <main className={styles.main}>
      <div className={styles.contentWidth}>
        <Link href="/" className={styles.backLink}>← Volver al inicio</Link>
        <header className={styles.hero}>
          <div className={styles.introRule} aria-hidden="true" />
          <p className={styles.eyebrow}>EL PROYECTO SIGUE CRECIENDO</p>
          <h1>Lo nuevo en <em><BrandName context="heading" />.</em></h1>
          <p className={styles.lead}>Un registro de cambios y contenido publicado. Solo compartimos novedades cuando hay algo confirmado que contar.</p>
        </header>

        <section className={styles.updatesSection} aria-labelledby="updates-heading">
          <div className={styles.updatesHeading}>
            <p className={styles.sectionIndex}>NOVEDADES PUBLICADAS</p>
            <h2 id="updates-heading">Paso a paso, también aquí.</h2>
          </div>
          {publishedUpdates.length ? <ol className={styles.timeline}>
            {publishedUpdates.map((entry) => {
              const link = entry.relatedLink;
              return <li key={entry.id} className={styles.updateEntry}>
                <time dateTime={entry.publishedAt}>{new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${entry.publishedAt}T00:00:00Z`))}</time>
                <div>
                  <p className={styles.updateCategory}>{categoryLabels[entry.category]}</p>
                  <h3>{entry.title}</h3>
                  <p>{entry.summary}</p>
                  {link ? link.href.startsWith("/")
                    ? <Link href={link.href} className={styles.textLink}>{link.label} →</Link>
                    : <a href={link.href} target="_blank" rel="noopener noreferrer" className={styles.textLink}>{link.label} <span aria-hidden="true">↗</span></a>
                    : null}
                </div>
              </li>;
            })}
          </ol> : <div className={styles.emptyState}>
            <p className={styles.eyebrow}>POR AHORA</p>
            <h3>Aún no hay novedades publicadas.</h3>
            <p>Cuando tengamos cambios confirmados para compartir, los encontrarás aquí. Mientras tanto, puedes explorar las guías y herramientas que ya están disponibles.</p>
            <Link href="/guias" className={styles.textLink}>Explorar guías →</Link>
          </div>}
        </section>
      </div>
    </main>
  </BejEditorialShell>;
}
