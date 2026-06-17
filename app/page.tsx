import Link from "next/link";

import { FeatureCard } from "./_components/feature-card";
import { Footer } from "./_components/footer";
import { GuideCard } from "./_components/guide-card";
import { Hero } from "./_components/hero";
import { Navbar } from "./_components/navbar";
import { ScholarshipCard } from "./_components/scholarship-card";
import { SectionHeading } from "./_components/section-heading";
import { guides } from "./_data/guides";
import { scholarships } from "./_data/scholarships";

const features = [
  {
    title: "Becas para mexicanos",
    description:
      "Encuentra oportunidades relevantes con datos claros sobre requisitos, financiamiento y fechas clave.",
  },
  {
    title: "Guías paso a paso",
    description:
      "Sigue rutas prácticas para entender admisiones, documentos, costos y procesos desde México.",
  },
  {
    title: "Checklists y plantillas",
    description:
      "Organiza tu proceso con listas accionables y materiales listos para ayudarte a no olvidar pasos importantes.",
  },
  {
    title: "Buscadores oficiales",
    description:
      "Consulta portales confiables para buscar programas, becas, aplicaciones y orientación oficial.",
  },
];

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
  const navLinks = [
    { label: "Inicio", href: "#inicio", active: true },
    { label: "Becas", href: "/becas" },
    { label: "Guías", href: "/guias" },
    { label: "Checklist", href: "/checklist" },
    { label: "Buscadores", href: "/buscadores" },
    { label: "Por dónde empiezo", href: "#por-donde-empiezo" },
    { label: "Sobre mí", href: "#sobre-mi" },
  ];

  return (
    <div className="bg-background text-foreground">
      <Navbar links={navLinks} homeHref="/" />
      <main id="inicio" className="overflow-hidden">
        <Hero />

        <section className="px-4 py-18 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[2rem] border border-rosa-mexicano/12 bg-peach-fuzz/70 p-8 shadow-[0_22px_70px_rgba(43,30,36,0.08)] sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rosa-mexicano">
                  Por qué existe Ruta Alemania
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-dark-text sm:text-4xl">
                  Encontrar información confiable no debería sentirse como un laberinto.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-dark-text/78">
                  Estudiar en Alemania desde México suele implicar revisar muchas fuentes,
                  comparar requisitos y entender procesos que no siempre están explicados
                  de forma clara. Ruta Alemania busca reunir esa información en un solo
                  lugar, en español y con pasos útiles para avanzar con confianza.
                </p>
              </div>

              <div className="rounded-[2rem] border border-dark-text/8 bg-white/85 p-8 shadow-[0_22px_70px_rgba(43,30,36,0.08)] sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rosa-mexicano">
                  Lo que encontrarás aquí
                </p>
                <div className="mt-6 space-y-4">
                  <div className="rounded-3xl bg-butter/60 p-5">
                    Becas explicadas sin rodeos, con enfoque en estudiantes mexicanos.
                  </div>
                  <div className="rounded-3xl bg-antique-white p-5">
                    Guías prácticas para planear estudios, documentos y tiempos.
                  </div>
                  <div className="rounded-3xl bg-peach-fuzz/70 p-5">
                    Recursos accionables para pasar de la investigación a la aplicación.
                  </div>
                </div>
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
            <div className="mt-8 rounded-[2rem] border border-dark-text/8 bg-white/82 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.08)] sm:p-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rosa-mexicano">
                    Buscadores
                  </p>
                  <p className="mt-3 text-base leading-7 text-dark-text/76">
                    Revisa una selección de portales oficiales para buscar programas,
                    becas, aplicaciones y orientación consular.
                  </p>
                </div>
                <Link
                  href="/buscadores"
                  className="inline-flex items-center justify-center rounded-full bg-rosa-mexicano px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_35px_rgba(212,68,122,0.24)] hover:-translate-y-0.5 hover:bg-[#be386a]"
                >
                  Explorar buscadores
                </Link>
              </div>
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
              description="Aquí irán fichas resumidas para comparar becas, entender su cobertura y revisar si encajan con tu perfil académico."
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
                  prácticas y links confiables para que más estudiantes
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
