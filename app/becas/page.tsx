import type { Metadata } from "next";
import Link from "next/link";

import { scholarships } from "../_data/scholarships";
import { ScholarshipsBrowser } from "./_components/scholarships-browser";
import styles from "./scholarships.module.css";

export const metadata: Metadata = {
  title: "Becas para estudiar en Alemania | bej",
  description:
    "Explora becas y apoyos para estudiar en Alemania. Compara opciones y consulta sus requisitos en las fuentes oficiales.",
};

export default function ScholarshipsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.contentWidth}>
        <Link href="/" className={styles.backLink}>← Volver al inicio</Link>
        <header className={styles.intro}>
          <div className={styles.introRule} aria-hidden="true" />
          <p className={styles.eyebrow}>OPORTUNIDADES PARA TU CAMINO</p>
          <h1>Tu próximo paso puede <em>comenzar aquí.</em></h1>
          <p className={styles.introDescription}>
            Explora becas y apoyos para estudiar en Alemania. Encuentra opciones según tus intereses y revisa sus requisitos en las fuentes oficiales.
          </p>
          <p className={styles.introSideNote}>ALEMANIA / PRIMER DESTINO</p>
        </header>
        <ScholarshipsBrowser scholarships={scholarships} />
      </div>
    </main>
  );
}
