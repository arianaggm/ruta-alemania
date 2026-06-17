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
];

const checklistItems = [
  "Elegir programa",
  "Revisar requisitos",
  "Preparar documentos",
  "Buscar becas",
  "Aplicar a universidad",
  "Preparar visa y mudanza",
];

export default function Home() {
  const navLinks = [
    { label: "Inicio", href: "#inicio", active: true },
    { label: "Becas", href: "/becas" },
    { label: "Guías", href: "/guias" },
    { label: "Checklist", href: "/checklist" },
    { label: "Sobre el proyecto", href: "#sobre-el-proyecto" },
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
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
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

        <section id="sobre-el-proyecto" className="px-4 py-18 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-dark-text/8 bg-butter/45 p-8 shadow-[0_22px_70px_rgba(43,30,36,0.08)] sm:p-10">
            <SectionHeading
              eyebrow="Sobre el proyecto"
              title="Ruta Alemania nace para hacer el proceso más accesible"
              description="Ruta Alemania nace para reunir información clara, práctica y en español para estudiantes mexicanos que quieren estudiar en Alemania. El proyecto combina experiencia personal, investigación de recursos oficiales y herramientas digitales para hacer el proceso más accesible."
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
