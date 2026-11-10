import Link from "next/link";

import { FeatureCard } from "./_components/feature-card";
import { Footer } from "./_components/footer";
import { GuideCard } from "./_components/guide-card";
import { Hero } from "./_components/hero";
import { Navbar } from "./_components/navbar";
import { ScholarshipCard } from "./_components/scholarship-card";
import { SectionHeading } from "./_components/section-heading";
import { guides } from "./_content/guides/catalog";
import { scholarships } from "./_data/scholarships";

const features = [
  {
    title: "Becas para mexicanos",
    description:
      "Explora opciones de financiamiento y confirma requisitos, cobertura y fechas en sus fuentes oficiales.",
    href: "/becas",
  },
  {
    title: "Guías paso a paso",
    description:
      "Sigue rutas prácticas para entender admisiones, documentos, costos y procesos desde México.",
    href: "/guias",
  },
  {
    title: "Checklist para planear",
    description:
      "Revisa las etapas generales del proceso y marca tus avances en una lista práctica.",
    href: "/checklist",
  },
  {
    title: "Recursos oficiales",
    description:
      "Consulta portales confiables para buscar programas, becas, aplicaciones y orientación oficial.",
    href: "/buscadores",
  },
];

const miRutaSteps = [
  {
    title: "Define tus metas",
    description: "Cuéntanos tu nivel de estudios, idioma, etapa y prioridad.",
  },
  {
    title: "Recibe una ruta personal",
    description: "Consulta tareas y guías recomendadas según tus respuestas.",
  },
  {
    title: "Organiza tu avance",
    description: "Marca tareas y lleva el seguimiento de tus solicitudes a universidades.",
  },
] as const;

const checklistItems = [
  "Elegir programa",
  "Revisar requisitos",
  "Preparar documentos",
  "Buscar becas",
  "Aplicar a universidad",
  "Preparar visa y mudanza",
];

const gettingStartedSteps = [
  {
    title: "Entiende tus opciones",
    description:
      "Aprende la diferencia entre Ausbildung, Duales Studium, Hochschule, Universität y TU antes de elegir una ruta.",
    href: "/guias/ausbildung-duales-studium-hochschule-universitat-tu-diferencias",
    cta: "Leer guía",
  },
  {
    title: "Busca programas",
    description:
      "Usa buscadores confiables como DAAD, Hochschulkompass y portales oficiales para encontrar programas que se ajusten a tus metas.",
    href: "/buscadores",
    cta: "Ver buscadores",
  },
  {
    title: "Revisa requisitos",
    description:
      "Compara idioma, documentos, fechas límite, costos, ciudad y tipo de aplicación.",
    href: "/checklist",
    cta: "Ver checklist",
  },
  {
    title: "Explora becas",
    description:
      "Busca opciones de financiamiento y revisa si aplican para estudiantes mexicanos.",
    href: "/becas",
    cta: "Ver becas",
  },
  {
    title: "Prepara documentos",
    description:
      "Organiza tu pasaporte, certificados, traducciones, CV, cartas y requisitos específicos del programa.",
    href: "/guias",
    cta: "Ver guías",
  },
  {
    title: "Planea visa y llegada",
    description:
      "Revisa información oficial, financiamiento, seguro médico, alojamiento y primeros trámites en Alemania.",
    href: "/checklist",
    cta: "Ver checklist",
  },
] as const;

const creatorLinks = [
  {
    label: "GitHub",
    href: "https://github.com/arianaggm",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/arianagutierrezmay/",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/arianaggm_/",
  },
] as const;

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <main id="inicio" className="overflow-hidden">
        <Hero />

        <section id="como-funciona" className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Cómo funciona Mi Ruta"
              title="De tus metas a un plan que puedes seguir"
              description="Empieza con unas preguntas sencillas y usa tu espacio personal para organizar lo que sigue. Las guías y recursos públicos siguen disponibles para explorar libremente."
            />
            <ol className="mt-8 grid gap-5 md:grid-cols-3">
              {miRutaSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-[2rem] border border-dark-text/8 bg-white/85 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.08)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rosa-mexicano font-semibold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-dark-text">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-7 text-dark-text/75">{step.description}</p>
                </li>
              ))}
            </ol>
            <Link
              href="/mi-ruta/empezar"
              className="mt-7 inline-flex items-center font-semibold text-rosa-mexicano hover:text-[#8d2048]"
            >
              Crear Mi Ruta <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 rounded-[2rem] border border-rosa-mexicano/12 bg-peach-fuzz/70 p-8 shadow-[0_22px_70px_rgba(43,30,36,0.08)] sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rosa-mexicano">
                  Por qué existe Ruta Alemania
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-dark-text sm:text-4xl">
                  Encontrar información confiable no debería sentirse como un laberinto.
                </h2>
              </div>
              <div className="space-y-4 text-lg leading-8 text-dark-text/78">
                <p>
                  Estudiar en Alemania desde México suele implicar revisar muchas fuentes,
                  comparar requisitos y entender procesos que no siempre están explicados
                  con claridad.
                </p>
                <p>
                  Aquí puedes explorar guías y becas, crear una ruta de estudio
                  personalizada, seguir tus solicitudes a universidades y guardar tu
                  avance. Si quieres conservar una copia de tus datos, puedes
                  descargar un respaldo desde Mi Ruta.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-18 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Recursos principales"
              title="Una base clara para empezar tu plan"
              description="Cada sección está pensada para ayudarte a entender el proceso, priorizar tareas y encontrar oportunidades reales."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        <section id="por-donde-empiezo" className="px-4 py-18 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="¿Por dónde empiezo?"
              title="Un camino simple para pasar de la idea a la acción"
              description="Si apenas estás comenzando, esta ruta te ayuda a ubicar qué revisar primero y qué recursos usar en cada etapa."
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
              {gettingStartedSteps.map((step, index) => (
                <article
                  key={step.title}
                  className="relative rounded-[2rem] border border-dark-text/8 bg-white/82 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.08)]"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rosa-mexicano text-base font-semibold text-white shadow-[0_16px_30px_rgba(212,68,122,0.22)]">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rosa-mexicano">
                        Paso {index + 1}
                      </p>
                      <h3 className="mt-3 font-display text-2xl font-semibold text-dark-text">
                        {step.title}
                      </h3>
                      <p className="mt-3 leading-7 text-dark-text/74">
                        {step.description}
                      </p>
                      <Link
                        href={step.href}
                        className="mt-5 inline-flex items-center rounded-full bg-peach-fuzz px-4 py-2 text-sm font-semibold text-dark-text transition hover:-translate-y-0.5 hover:bg-[#ffcfae]"
                      >
                        {step.cta}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="becas" className="px-4 py-18 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Becas"
              title="Primer vistazo a oportunidades de financiamiento"
              description="Compara estas oportunidades como punto de partida y confirma requisitos, cobertura y fechas en sus fuentes oficiales."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {scholarships.slice(0, 3).map((scholarship) => (
                <ScholarshipCard
                  key={scholarship.title}
                  scholarship={scholarship}
                  variant="preview"
                />
              ))}
            </div>
          </div>
        </section>

        <section id="guias" className="px-4 py-18 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Guías"
              title="Contenido que te acompaña paso a paso"
              description="Las guías están pensadas para responder dudas frecuentes con lenguaje claro, contexto local y una estructura accionable."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {guides.slice(0, 3).map((guide) => (
                <GuideCard
                  key={guide.slug}
                  guide={guide}
                  href={`/guias/${guide.slug}`}
                  variant="preview"
                />
              ))}
            </div>
          </div>
        </section>

        <section id="checklist" className="px-4 py-18 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] border border-rosa-mexicano/12 bg-white/80 p-8 shadow-[0_22px_70px_rgba(43,30,36,0.08)] sm:p-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <SectionHeading
                eyebrow="Empieza aquí"
                title="Una checklist corta para orientar tus primeros pasos"
                description="Ideal para convertir una idea general en un proceso concreto y ordenado."
              />
              <Link
                href="/checklist"
                className="mt-6 inline-flex items-center font-semibold text-rosa-mexicano hover:text-[#8d2048]"
              >
                Abrir checklist <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2" id="guia-inicial">
              {checklistItems.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-3xl bg-peach-fuzz/70 p-4 text-sm font-medium text-dark-text shadow-[0_10px_30px_rgba(43,30,36,0.05)] sm:text-base"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rosa-mexicano text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="sobre-mi" className="px-4 py-18 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] border border-dark-text/8 bg-butter/45 p-8 shadow-[0_22px_70px_rgba(43,30,36,0.08)] sm:p-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <SectionHeading
                eyebrow="Quién está detrás de Ruta Alemania"
                title="Un proyecto personal, educativo y hecho con intención"
                description="Ruta Alemania combina experiencia directa con herramientas digitales para acompañar a más estudiantes mexicanos en un proceso que a veces se siente demasiado disperso."
              />
            </div>

            <div className="space-y-6">
              <div className="rounded-[1.75rem] border border-white/60 bg-white/78 p-6 shadow-[0_14px_40px_rgba(43,30,36,0.08)]">
                <p className="text-base leading-8 text-dark-text/78">
                  Hola, soy Ariana Gutierrez May. Soy ingeniera biomédica
                  mexicana y actualmente estudio la maestría en Computational
                  Modeling and Simulation en TU Dresden, Alemania.
                </p>
                <p className="mt-4 text-base leading-8 text-dark-text/78">
                  Creé Ruta Alemania porque sé lo confuso que puede ser empezar
                  este proceso desde México: buscar programas, entender
                  requisitos, preparar documentos, encontrar becas y organizar
                  la llegada. Mi objetivo es reunir recursos claros, guías
                  prácticas y enlaces confiables para que más estudiantes
                  mexicanos puedan orientarse paso a paso.
                </p>
                <p className="mt-4 text-base leading-8 text-dark-text/78">
                  Este proyecto también forma parte de mi portafolio como
                  desarrolladora, combinando mi experiencia en tecnología,
                  educación, visualización de información y herramientas
                  digitales.
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-rosa-mexicano/12 bg-peach-fuzz/60 p-6 shadow-[0_14px_40px_rgba(43,30,36,0.08)]">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rosa-mexicano">
                  Encuéntrame también aquí
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {creatorLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-full border border-rosa-mexicano/18 bg-white/82 px-4 py-2 text-sm font-semibold text-dark-text transition hover:-translate-y-0.5 hover:border-rosa-mexicano hover:text-rosa-mexicano"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
