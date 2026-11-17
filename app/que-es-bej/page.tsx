import type { Metadata } from "next";
import Link from "next/link";

import { BejEditorialShell } from "../_components/bej-editorial-shell";
import { BrandName } from "../_components/brand-name";
import { publicPageMetadata } from "../_lib/seo";
import styles from "../editorial.module.css";

export const metadata: Metadata = publicPageMetadata(
  "¿Qué es bej?",
  "Conoce el nombre, la historia y el futuro de bej: un espacio para explorar y organizar tu camino hacia los estudios en el extranjero.",
  "/que-es-bej",
);

export default function AboutPage() {
  return <BejEditorialShell>
    <main className={styles.main}>
      <div className={styles.contentWidth}>
        <Link href="/" className={styles.backLink}>← Volver al inicio</Link>
        <header className={styles.hero}>
          <div className={styles.introRule} aria-hidden="true" />
          <p className={styles.eyebrow}>CONOCE EL PROYECTO</p>
          <h1>Un camino propio, <em>paso a paso.</em></h1>
          <p className={styles.lead}><BrandName /> nace de una experiencia personal: buscar información, tomar decisiones y encontrar una manera de avanzar sin tener todo resuelto desde el principio.</p>
        </header>

        <section className={styles.splitSection} aria-labelledby="name-heading">
          <div>
            <p className={styles.sectionIndex}>01 / EL NOMBRE</p>
            <h2 id="name-heading">Un nombre, <em>dos mundos.</em></h2>
          </div>
          <div className={styles.prose}>
            <p>En maya yucateco, <BrandName /> significa camino o sendero. Elegí esta palabra por mis raíces yucatecas y por la idea de que cada persona puede encontrar su propia forma de avanzar.</p>
            <p>En Alemania, las letras <strong>BEJ</strong> también se usan para <em>Berufseinstiegsjahr</em>, un programa de preparación para la formación profesional en Baden-Württemberg. Es un significado distinto: no es el nombre de esta plataforma ni una vía de admisión universitaria.</p>
            <p>Para el proyecto, <BrandName /> habla de movimiento, aprendizaje y caminos posibles. Alemania es nuestro primer destino, no el único que imaginamos.</p>
            <div className={styles.sources} aria-label="Fuentes sobre el nombre">
              <p>Sobre los dos significados</p>
              <a href="https://site.inali.gob.mx/pdf/norma_maya.pdf" target="_blank" rel="noopener noreferrer">INALI · Norma de escritura de la lengua maya <span aria-hidden="true">↗</span></a>
              <a href="https://www.service-bw.de/zufi/leistungen/243" target="_blank" rel="noopener noreferrer">Service BW · Berufseinstiegsjahr (BEJ) <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className={styles.storySection} aria-labelledby="story-heading">
          <div className={styles.storyInner}>
            <p className={styles.sectionIndex}>02 / LA HISTORIA</p>
            <h2 id="story-heading">La historia detrás de <em><BrandName context="heading" tone="light" />.</em></h2>
            <div className={styles.storyCopy}>
              <p>Nací en México y ahora estudio en Alemania. Antes de llegar aquí, tuve que entender requisitos que no siempre estaban explicados de la misma manera: buscar programas y becas, preparar solicitudes universitarias, organizar apostillas y traducciones, y planear la visa y la mudanza.</p>
              <p>En ese proceso eché de menos un lugar donde pudiera reunir información clara y herramientas prácticas sin perder de vista que cada universidad y cada persona tiene requisitos diferentes. Por eso empecé a construir el recurso que me hubiera gustado tener: uno que te ayude a investigar, organizarte y seguir avanzando a tu ritmo.</p>
              <p>Comparto mi experiencia en primera persona, pero también enlazo recursos oficiales para que puedas comprobar lo que aplica a tu caso.</p>
              <Link href="/guias" className={styles.lightLink}>Leer las guías <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </section>

        <section className={styles.splitSection} aria-labelledby="may-heading">
          <div>
            <p className={styles.sectionIndex}>03 / UNA COMPAÑERA FUTURA</p>
            <h2 id="may-heading">Conoce a <em>May.</em></h2>
          </div>
          <div className={styles.prose}>
            <p>May es la futura guía de <BrandName />: una venadita yucateca de caricatura, con flores, aretes, accesorios y cuernitos. Su estilo será maximalista; su personalidad, cálida, curiosa, optimista y expresiva.</p>
            <p>Me gustaría que algún día acompañe el recorrido: animarte cuando una tarea se sienta pesada, ayudarte a orientarte y celebrar los pequeños avances. <strong>Es una idea para el futuro, no una función disponible hoy.</strong></p>
            <p>Por ahora puedes usar las guías, el buscador de becas y Mi <BrandName /> sin necesitar a May para completar ningún paso.</p>
          </div>
        </section>

        <section className={styles.futureSection} aria-labelledby="future-heading">
          <div>
            <p className={styles.sectionIndex}>04 / LO QUE SIGUE</p>
            <h2 id="future-heading">El futuro de <em><BrandName context="heading" />.</em></h2>
          </div>
          <div className={styles.prose}>
            <p>Hoy <BrandName /> empieza con Alemania. Ya puedes consultar guías, becas, recursos oficiales y una checklist general; en Mi <BrandName /> puedes organizar un plan personal, seguir tus aplicaciones y descargar un respaldo de tus datos.</p>
            <p>Quiero seguir mejorando la orientación personalizada, crear herramientas útiles, integrar a May y, con el tiempo, explorar otros destinos. Son direcciones de trabajo, no lanzamientos prometidos ni fechas anunciadas.</p>
            <div className={styles.actions}>
              <Link href="/mi-ruta" className={styles.primaryLink}>Explorar Mi bej <span aria-hidden="true">↗</span></Link>
              <Link href="/novedades" className={styles.secondaryLink}>Ver novedades <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  </BejEditorialShell>;
}
