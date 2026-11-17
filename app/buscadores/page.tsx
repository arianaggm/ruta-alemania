import type { Metadata } from "next";
import Link from "next/link";

import { BejEditorialShell } from "../_components/bej-editorial-shell";
import { resources, type Resource } from "../_data/resources";
import { publicPageMetadata } from "../_lib/seo";
import styles from "../practical.module.css";

export const metadata: Metadata = publicPageMetadata(
  "Recursos para estudiar en Alemania",
  "Recursos oficiales para buscar programas, becas, solicitudes e información consular sobre estudiar en Alemania.",
  "/buscadores",
);

const categories: Resource["category"][] = [
  "Programas",
  "Aplicaciones",
  "Becas",
  "Información oficial",
];

export default function SearchToolsPage() {
  return (
    <BejEditorialShell>
      <main className={styles.main}>
        <div className={styles.contentWidth}>
          <Link href="/" className={styles.backLink}>← Volver al inicio</Link>

          <header className={styles.intro}>
            <div className={styles.introRule} aria-hidden="true" />
            <p className={styles.eyebrow}>RECURSOS PARA EXPLORAR</p>
            <h1>Buscadores para estudiar <em>en Alemania.</em></h1>
            <p className={styles.introDescription}>
              Encuentra recursos oficiales para buscar programas, becas, solicitudes
              de admisión y orientación consular si quieres estudiar en Alemania desde México.
            </p>
          </header>

          <div className={styles.resourceNote}>
            <p>
              Esta selección reúne portales para comparar programas, iniciar
              aplicaciones, buscar becas y confirmar información oficial antes
              de tomar decisiones importantes.
            </p>
            <p>Los enlaces abren en una nueva pestaña.</p>
          </div>

          {categories.map((category, index) => (
            <section key={category} className={styles.resourceSection} aria-labelledby={`resource-category-${index}`}>
              <div className={styles.resourceSectionHeading}>
                <span className={styles.sectionNumber} aria-hidden="true">0{index + 1}</span>
                <h2 id={`resource-category-${index}`}>{category}</h2>
              </div>

              <div className={styles.resourceGrid}>
                {resources.filter((resource) => resource.category === category).map((resource) => (
                  <article key={resource.url} className={styles.resourceCard}>
                    <h3>{resource.title}</h3>
                    <p className={styles.resourceDescription}>{resource.description}</p>
                    <div className={styles.resourceWhen}>
                      <h4>Cuándo usarlo</h4>
                      <p>{resource.whenToUseIt}</p>
                    </div>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.resourceLink}
                      aria-label={`Ir a ${resource.title} (sitio oficial, abre en una nueva pestaña)`}
                    >
                      Ir al sitio oficial <span aria-hidden="true">↗</span>
                    </a>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </BejEditorialShell>
  );
}
