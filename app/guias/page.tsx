import Link from "next/link";
import { Footer } from "../_components/footer";
import { Navbar } from "../_components/navbar";
import { SectionHeading } from "../_components/section-heading";
import { guides } from "../_data/guides";
import { GuidesBrowser } from "./_components/guides-browser";

const starterGuides = [
  {
    title: "Cómo buscar maestrías en Alemania",
    href: "/guias/como-buscar-maestrias-en-alemania",
    description: "Para empezar a entender programas, filtros y opciones reales.",
  },
  {
    title: "Documentos que necesitas desde México",
    href: "/guias/documentos-que-necesitas-desde-mexico",
    description: "Para ordenar desde temprano certificados, traducciones y apostillas.",
  },
  {
    title: "Becas para mexicanos: por dónde empezar",
    href: "/guias/becas-para-mexicanos-por-donde-empezar",
    description: "Para ubicar apoyos posibles y no perder de vista fechas clave.",
  },
];

export default function GuidesPage() {
  const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Becas", href: "/becas" },
    { label: "Guías", href: "/guias", active: true },
    { label: "Checklist", href: "/checklist" },
    { label: "Buscadores", href: "/buscadores" },
  ];

  return (
    <div className="bg-background text-foreground">
      <Navbar links={navLinks} homeHref="/" />

      <main className="px-4 pb-18 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-rosa-mexicano/18 bg-white/78 px-4 py-2 text-sm font-semibold text-dark-text shadow-[0_12px_35px_rgba(43,30,36,0.06)] hover:-translate-y-0.5 hover:border-rosa-mexicano"
          >
            Volver al inicio
          </Link>

          <section className="mt-6 rounded-[2.25rem] border border-rosa-mexicano/12 bg-peach-fuzz/55 p-8 shadow-[0_28px_80px_rgba(43,30,36,0.08)] sm:p-10">
            <SectionHeading
              eyebrow="Biblioteca de guías"
              title="Guías para estudiar en Alemania"
              description="Información clara y paso a paso para planear tu aplicación, preparar documentos y organizar tu llegada a Alemania desde México."
            />
          </section>

          <section className="mt-8 rounded-[2rem] border border-dark-text/8 bg-butter/45 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.08)] sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rosa-mexicano">
                  Empieza aquí
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-dark-text">
                  Tres guías útiles para comenzar con una base clara
                </h2>
                <p className="mt-3 text-base leading-7 text-dark-text/76">
                  Si apenas estás armando tu plan, estas lecturas te ayudan a
                  ordenar prioridades y entender mejor los primeros pasos.
                </p>
              </div>
              <p className="rounded-full bg-white/75 px-4 py-2 text-sm font-medium text-dark-text">
                Selección recomendada para estudiantes que van empezando
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {starterGuides.map((guide) => (
                <Link
                  key={guide.title}
                  href={guide.href}
                  className="rounded-3xl bg-white/78 p-5 shadow-[0_10px_30px_rgba(43,30,36,0.05)] hover:-translate-y-0.5"
                >
                  <p className="font-display text-xl font-semibold text-dark-text">
                    {guide.title}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-dark-text/72">
                    {guide.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <GuidesBrowser guides={guides} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
