import type { Metadata } from "next";
import Link from "next/link";

import { BejFooter } from "./_components/bej-footer";
import { dmSans, fraunces } from "./_components/bej-fonts";
import { BejHomeNav } from "./_components/bej-home-nav";
import { BrandName } from "./_components/brand-name";
import { guides } from "./_content/guides/catalog";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "bej | Tu camino para estudiar en el extranjero",
  description:
    "Guías gratuitas y herramientas para organizar tu camino hacia los estudios en el extranjero. Empezamos con Alemania.",
};

const steps = [
  {
    number: "01",
    title: "Explora",
    description: "Conoce tus opciones con guías claras, becas y fuentes confiables.",
  },
  {
    number: "02",
    title: "Organiza",
    description: "Crea tu camino personal y reúne tus tareas y solicitudes en un lugar.",
  },
  {
    number: "03",
    title: "Avanza",
    description: "Da seguimiento a tus próximos pasos a tu ritmo, sin perder de vista tus metas.",
  },
] as const;

export default function Home() {
  return (
    <div className={`${dmSans.variable} ${fraunces.variable} ${styles.page}`}>
      <BejHomeNav />

      <main id="inicio">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span aria-hidden="true" /> Un camino propio empieza aquí</p>
            <h1 id="hero-title">Cada camino comienza <em>con un paso.</em></h1>
            <p className={styles.heroIntro}>
              Te ayudamos a estudiar en el extranjero con guías claras, gratuitas y cercanas,
              para que des el siguiente paso con confianza. Empezamos con Alemania.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/mi-ruta/empezar">Crear mi bej <span aria-hidden="true">↗</span></Link>
              <Link className={styles.secondaryButton} href="/guias">Explorar guías <span aria-hidden="true">→</span></Link>
            </div>
            <p className={styles.heroNote}>Explora gratis. Organiza a tu ritmo.</p>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroVisualTop}><span>bej</span><span>01 / Alemania</span></div>
            <div className={styles.illustrationSpace} aria-hidden="true" />
            <p className={styles.illustrationCaption}>Espacio reservado para la ilustración oficial de <BrandName />.</p>
          </div>
        </section>

        <section id="por-donde-empiezo" className={styles.stepsSection} aria-labelledby="steps-title">
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Un paso a la vez</p>
            <h2 id="steps-title">Tu camino en <em>3 pasos</em></h2>
            <p>Empieza por donde estás. <BrandName /> te ayuda a convertir tus planes en pasos concretos.</p>
          </div>
          <ol className={styles.stepsGrid}>
            {steps.map((step) => (
              <li className={styles.step} key={step.number}>
                <span className={styles.stepNumber}>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="que-es-bej" className={styles.aboutSection} aria-labelledby="about-title">
          <div className={styles.aboutInner}>
            <div>
              <span id="sobre-mi" className={styles.anchorTarget} aria-hidden="true" />
              <p className={styles.kicker}>Un nombre con raíz y rumbo</p>
              <h2 id="about-title">¿Qué es <em><BrandName context="heading" tone="light" />?</em></h2>
            </div>
            <div className={styles.aboutCopy}>
              <p>En maya yucateco, <BrandName tone="light" /> significa camino o sendero. Un nombre para recordar que no existe una sola forma de llegar a donde quieres estar.</p>
              <p>Creé este espacio después de vivir mi propio proceso para estudiar en Alemania. Quiero compartir lo que aprendí y acercarte recursos para que puedas construir tu camino, paso a paso.</p>
              <Link href="/que-es-bej" className={styles.lightTextLink}>Conoce más <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </section>

        <section className={styles.resourcesSection} aria-labelledby="resources-title">
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Explora a tu manera</p>
            <h2 id="resources-title">Todo lo que necesitas <em>en un solo lugar</em></h2>
            <p>Información para investigar y herramientas para llevar tus planes a la práctica.</p>
          </div>
          <div className={styles.resourceGrid}>
            <article id="guias" className={`${styles.resourceCard} ${styles.guideResource}`}>
              <span className={styles.cardIndex}>01 / LEER</span>
              <h3>Guías</h3>
              <p>Respuestas cercanas a las preguntas que aparecen cuando empiezas a buscar dónde y cómo estudiar.</p>
              <div className={styles.guideLinks}>
                {guides.slice(0, 2).map((guide) => (
                  <Link key={guide.slug} href={`/guias/${guide.slug}`}>{guide.title}<span aria-hidden="true">↗</span></Link>
                ))}
              </div>
              <Link href="/guias" className={styles.cardLink}>Explorar todas las guías <span aria-hidden="true">→</span></Link>
            </article>
            <article id="becas" className={`${styles.resourceCard} ${styles.scholarshipResource}`}>
              <span className={styles.cardIndex}>02 / DESCUBRIR</span>
              <h3>Becas</h3>
              <p>Encuentra oportunidades y consulta siempre los requisitos, la elegibilidad y las fechas en la fuente oficial.</p>
              <div className={styles.cardSpacer} />
              <Link href="/becas" className={styles.cardLink}>Explorar becas <span aria-hidden="true">→</span></Link>
            </article>
            <article id="checklist" className={`${styles.resourceCard} ${styles.toolsResource}`}>
              <span className={styles.cardIndex}>03 / HACER</span>
              <h3>Herramientas</h3>
              <p>Planea tu ruta, sigue tus solicitudes y guarda una copia de tus avances en tu dispositivo.</p>
              <div className={styles.toolLinks}>
                <Link href="/mi-ruta">Mi bej <span aria-hidden="true">↗</span></Link>
                <Link href="/mi-ruta/aplicaciones">Mis aplicaciones <span aria-hidden="true">↗</span></Link>
                <Link href="/mi-ruta/mis-datos">Mis datos <span aria-hidden="true">↗</span></Link>
                <Link href="/checklist">Checklist general <span aria-hidden="true">↗</span></Link>
                <Link href="/buscadores">Buscadores oficiales <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.maySection} aria-labelledby="may-title">
          <div className={styles.mayMark} aria-hidden="true">May</div>
          <div className={styles.mayCopy}>
            <p className={styles.kicker}>Una compañera para lo que viene</p>
            <h2 id="may-title">Conoce a <em>May</em></h2>
            <p>May es una venadita yucateca de caricatura. Más adelante será tu guía dentro de <BrandName />; por ahora, estamos preparando su llegada.</p>
            <span className={styles.comingSoon}>Próximamente</span>
          </div>
        </section>

        <section className={styles.closingSection} aria-labelledby="closing-title">
          <p className={styles.kicker}>Tu siguiente paso</p>
          <h2 id="closing-title">No tienes que tener <em>todo resuelto</em> para comenzar.</h2>
          <Link className={styles.primaryButton} href="/mi-ruta/empezar">Empezar mi bej <span aria-hidden="true">↗</span></Link>
        </section>
      </main>

      <BejFooter />
    </div>
  );
}
