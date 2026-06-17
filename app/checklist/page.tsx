import Link from "next/link";
import { Footer } from "../_components/footer";
import { Navbar } from "../_components/navbar";
import { SectionHeading } from "../_components/section-heading";
import { checklistSections } from "../_data/checklist";
import { ChecklistBoard } from "./_components/checklist-board";

export default function ChecklistPage() {
  const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Becas", href: "/becas" },
    { label: "Guias", href: "/guias" },
    { label: "Checklist", href: "/checklist", active: true },
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
              eyebrow="Ruta organizada"
              title="Checklist para estudiar en Alemania"
              description="Una guia paso a paso para organizar tu aplicacion, documentos, becas, visa y llegada desde Mexico."
            />
          </section>

          <ChecklistBoard sections={checklistSections} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
