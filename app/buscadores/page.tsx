import Link from "next/link";
import { Footer } from "../_components/footer";
import { Navbar } from "../_components/navbar";
import { SectionHeading } from "../_components/section-heading";
import { resources } from "../_data/resources";

const categoryStyles = {
  Programas: "bg-butter/75 text-dark-text",
  Aplicaciones: "bg-peach-fuzz/80 text-dark-text",
  Becas: "bg-rosa-mexicano text-white",
  "Informacion oficial": "bg-antique-white text-dark-text",
} as const;

export default function SearchToolsPage() {
  const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Becas", href: "/becas" },
    { label: "Guías", href: "/guias" },
    { label: "Checklist", href: "/checklist" },
    { label: "Buscadores", href: "/buscadores", active: true },
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
              eyebrow="Recursos oficiales"
              title="Buscadores para estudiar en Alemania"
              description="Encuentra recursos oficiales para buscar programas, becas, aplicaciones y orientacion consular si quieres estudiar en Alemania desde México."
            />
          </section>

          <section className="mt-8 rounded-[2rem] border border-dark-text/8 bg-white/82 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.08)] sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rosa-mexicano">
                  Cómo usar esta página
                </p>
                <p className="mt-3 text-base leading-7 text-dark-text/76">
                  Esta selección reúne portales confiables para comparar programas,
                  iniciar aplicaciones, buscar becas y confirmar información oficial
                  antes de tomar decisiones importantes.
                </p>
              </div>
              <p className="rounded-full bg-butter/70 px-4 py-2 text-sm font-medium text-dark-text">
                Todos los enlaces abren en una nueva pestaña.
              </p>
            </div>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-2">
            {resources.map((resource) => (
              <article
                key={resource.title}
                className="flex h-full flex-col rounded-[2rem] border border-dark-text/8 bg-white/85 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.08)]"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${categoryStyles[resource.category]}`}
                  >
                    {resource.category}
                  </span>
                </div>

                <h2 className="mt-5 font-display text-2xl font-semibold text-dark-text">
                  {resource.title}
                </h2>

                <p className="mt-4 leading-7 text-dark-text/76">
                  {resource.description}
                </p>

                <div className="mt-5 rounded-3xl bg-antique-white p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-dark-text/58">
                    Cuándo usarlo
                  </p>
                  <p className="mt-2 text-sm leading-7 text-dark-text/78">
                    {resource.whenToUseIt}
                  </p>
                </div>

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-rosa-mexicano/18 bg-peach-fuzz/65 px-5 py-3 text-sm font-semibold text-dark-text hover:-translate-y-0.5 hover:border-rosa-mexicano hover:bg-peach-fuzz"
                >
                  Ir al sitio oficial
                </a>
              </article>
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
