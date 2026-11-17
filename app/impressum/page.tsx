import type { Metadata } from "next";
import Link from "next/link";

import { BejEditorialShell } from "../_components/bej-editorial-shell";
import { BrandName } from "../_components/brand-name";
import { noIndexMetadata } from "../_lib/seo";
import styles from "../editorial.module.css";

export const metadata: Metadata = noIndexMetadata(
  "Información legal (borrador)",
  "Estructura preliminar de información del responsable de bej. No es un Impressum definitivo.",
);

export default function ImpressumPage() {
  return <BejEditorialShell>
    <main className={styles.main}>
      <div className={styles.contentWidth}>
        <Link href="/" className={styles.backLink}>← Volver al inicio</Link>
        <header className={styles.hero}>
          <div className={styles.introRule} aria-hidden="true" />
          <p className={styles.eyebrow}>BORRADOR NO FINAL</p>
          <h1>Información <em>legal.</em></h1>
          <p className={styles.lead}>Este es un esquema de la información del responsable de <BrandName />, no un Impressum definitivo. Todavía faltan datos verificados y una revisión de las obligaciones aplicables antes del lanzamiento.</p>
        </header>

        <section className={styles.splitSection} aria-labelledby="operator-heading">
          <div><p className={styles.sectionIndex}>01 / RESPONSABLE</p><h2 id="operator-heading">Quién está <em>detrás.</em></h2></div>
          <div className={styles.prose}>
            <p>El nombre de marca <BrandName /> no sustituye la identificación de la persona o entidad que opera el sitio. Falta confirmar el nombre legal, la dirección de contacto y una vía de comunicación electrónica. No publicamos datos personales sin la aprobación de la persona responsable.</p>
          </div>
        </section>

        <section className={styles.splitSection} aria-labelledby="review-heading">
          <div><p className={styles.sectionIndex}>02 / REVISIÓN PENDIENTE</p><h2 id="review-heading">Antes del <em>lanzamiento.</em></h2></div>
          <div className={styles.prose}>
            <p>Hay que comprobar qué datos de identificación, registro o actividad profesional corresponden al caso concreto y quién asume la responsabilidad editorial, si aplica. Esta página no reemplaza esa evaluación ni constituye todavía información legal completa.</p>
            <p>La explicación provisional sobre los datos guardados en el navegador está en <Link href="/privacidad" className="font-semibold underline underline-offset-4">Privacidad (borrador)</Link>.</p>
          </div>
        </section>
      </div>
    </main>
  </BejEditorialShell>;
}
