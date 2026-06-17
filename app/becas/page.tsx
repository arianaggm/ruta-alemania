import Link from "next/link";
import { Footer } from "../_components/footer";
import { Navbar } from "../_components/navbar";
import { SectionHeading } from "../_components/section-heading";
import { scholarships } from "../_data/scholarships";
import { ScholarshipsBrowser } from "./_components/scholarships-browser";

export default function ScholarshipsPage() {
  const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Becas", href: "/becas", active: true },
    { label: "Guías", href: "/guias" },
    { label: "Checklist", href: "/checklist" },
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
              eyebrow="Base de becas"
              title="Becas para estudiar en Alemania"
              description="Explora oportunidades de financiamiento para estudiantes mexicanos. Filtra por nivel, área, idioma y tipo de apoyo."
            />
          </section>

          <ScholarshipsBrowser scholarships={scholarships} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
