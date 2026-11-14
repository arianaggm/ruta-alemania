import type { Metadata } from "next";
import Link from "next/link";

import { guides } from "../_content/guides/catalog";
import { GuidesBrowser } from "./_components/guides-browser";
import styles from "./guides.module.css";

export const metadata: Metadata = {
  title: "Guías para estudiar en Alemania | bej",
  description:
    "Guías basadas en experiencias reales, recursos oficiales y todo lo que me hubiera gustado saber antes de estudiar en Alemania.",
};

const starterSlugs = new Set([
  "documentos-que-necesitas-desde-mexico",
  "becas-para-mexicanos-por-donde-empezar",
]);

export default function GuidesPage() {
  const starterGuides = guides.filter((guide) => starterSlugs.has(guide.slug));

  return (
    <main className={styles.libraryMain}>
      <div className={styles.contentWidth}>
        <Link href="/" className={styles.backLink}>← Volver al inicio</Link>
        <header className={styles.libraryIntro}>
          <div className={styles.introRule} aria-hidden="true" />
          <p className={styles.eyebrow}>EXPLORA A TU RITMO</p>
          <h1>Un camino se recorre <em>paso a paso.</em></h1>
          <p className={styles.introDescription}>
            Guías basadas en experiencias reales, recursos oficiales y todo lo que me hubiera
            gustado saber antes de estudiar en Alemania.
          </p>
          <p className={styles.introSideNote}>ALEMANIA / PRIMER DESTINO</p>
        </header>

        <GuidesBrowser guides={guides} />

        <section className={styles.starterSection} aria-labelledby="starter-heading">
          <div>
            <p className={styles.eyebrow}>PARA EMPEZAR</p>
            <h2 id="starter-heading">Dos lecturas más para orientarte.</h2>
          </div>
          <div className={styles.starterLinks}>
            {starterGuides.map((guide) => (
              <Link key={guide.slug} href={`/guias/${guide.slug}`}>
                <span>{guide.category}</span>
                <strong>{guide.title}</strong>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
