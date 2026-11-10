import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "../../_components/footer";
import { Navbar } from "../../_components/navbar";
import { getGuideBySlug, guides } from "../../_content/guides/catalog";
import { loadPublishedGuide } from "../../_content/guides/load-guide.server";
import type { GuideText } from "../../_content/guides/types";

function renderGuideText(text: GuideText) {
  if (typeof text === "string") return text;
  if ("parts" in text) {
    return text.parts.map((part, index) => {
      if (typeof part === "string") return part;
      if ("strong" in part) return <strong key={index} className="font-semibold text-dark-text">{part.strong}</strong>;
      return <em key={index}>{part.em}</em>;
    });
  }

  return <>{text.before}<strong className="font-semibold text-dark-text">{text.strong}</strong>{text.after}</>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata(
  props: PageProps<"/guias/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return {
      title: "Guía no encontrada | Ruta Alemania",
    };
  }

  return {
    title: `${guide.title} | Ruta Alemania`,
    description: guide.summary,
  };
}

export default async function GuideDetailPage(
  props: PageProps<"/guias/[slug]">
) {
  const { slug } = await props.params;
  const guide = await loadPublishedGuide(slug);

  if (!guide) {
    notFound();
  }

  const BudgetCalculator = slug === "cuanto-cuesta-estudiar-en-alemania"
    ? (await import("./_components/budget-calculator")).BudgetCalculator
    : null;

  return (
    <div className="bg-background text-foreground">
      <Navbar />

      <main className="px-4 pb-18 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/guias"
            className="inline-flex items-center rounded-full border border-rosa-mexicano/18 bg-white/78 px-4 py-2 text-sm font-semibold text-dark-text shadow-[0_12px_35px_rgba(43,30,36,0.06)] hover:-translate-y-0.5 hover:border-rosa-mexicano"
          >
            Volver a guías
          </Link>

          <article className="mt-6 space-y-8">
            <section className="rounded-[2.25rem] border border-rosa-mexicano/12 bg-peach-fuzz/55 p-8 shadow-[0_28px_80px_rgba(43,30,36,0.08)] sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rosa-mexicano">
                  {guide.category}
                </span>
                <span className="rounded-full bg-butter/75 px-3 py-1 text-sm font-medium text-dark-text">
                  {guide.readingTime} de lectura
                </span>
              </div>

              <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-dark-text sm:text-5xl">
                {guide.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-dark-text/76">
                {guide.intro}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {guide.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-antique-white px-3 py-1 text-sm font-medium text-dark-text/76"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-dark-text/8 bg-white/82 p-8 shadow-[0_18px_50px_rgba(43,30,36,0.08)]">
              <h2 className="font-display text-3xl font-semibold text-dark-text">
                Ideas clave
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {guide.keyTakeaways.map((takeaway, index) => (
                  <div
                    key={takeaway}
                    className="rounded-3xl bg-antique-white p-5 shadow-[0_10px_30px_rgba(43,30,36,0.05)]"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-rosa-mexicano text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <p className="mt-4 leading-7 text-dark-text/82">{takeaway}</p>
                  </div>
                ))}
              </div>
            </section>

            {guide.checklistItems?.length ? (
              <section className="rounded-[2rem] border border-dark-text/8 bg-butter/45 p-8 shadow-[0_18px_50px_rgba(43,30,36,0.08)]">
                <h2 className="font-display text-3xl font-semibold text-dark-text">
                  Mini lista
                </h2>
                <ul className="mt-6 grid gap-4">
                  {guide.checklistItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-3xl bg-white/78 p-4 shadow-[0_10px_30px_rgba(43,30,36,0.05)]"
                    >
                      <span aria-hidden="true" className="mt-2 h-3 w-3 shrink-0 rounded-full bg-rosa-mexicano" />
                      <p className="leading-7 text-dark-text/82">{item}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <div className="space-y-6">
              {guide.sections.map((section) => (
                <section
                  key={section.title}
                  className="rounded-[2rem] border border-dark-text/8 bg-white/82 p-8 shadow-[0_18px_50px_rgba(43,30,36,0.08)]"
                >
                  <h2 className="font-display text-3xl font-semibold text-dark-text">
                    {section.title}
                  </h2>

                  <div className="mt-5 space-y-4 text-base leading-8 text-dark-text/78">
                    {section.paragraphs.map((paragraph, index) => (
                      <p key={index}>{renderGuideText(paragraph)}</p>
                    ))}
                  </div>

                  {section.table ? (
                    <div className="mt-6 overflow-x-auto rounded-3xl border border-dark-text/8 bg-antique-white/70">
                      <table className="min-w-full border-collapse text-left text-sm text-dark-text/82">
                        <thead className="bg-peach-fuzz/75">
                          <tr>
                            {section.table.columns.map((column) => (
                              <th
                                key={column}
                                className="px-4 py-3 font-semibold text-dark-text"
                              >
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row, rowIndex) => (
                            <tr
                              key={rowIndex}
                              className="border-t border-dark-text/8 align-top"
                            >
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="px-4 py-3 leading-6">
                                  {renderGuideText(cell)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}

                  {section.bullets?.length ? (
                    <ul className="mt-6 space-y-3">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3"
                        >
                          <span aria-hidden="true" className="mt-2 h-3 w-3 shrink-0 rounded-full bg-rosa-mexicano" />
                          <span className="leading-7 text-dark-text/82">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>
            {BudgetCalculator ? <BudgetCalculator /> : null}
            {guide.relatedLinks?.length ? (
              <nav aria-label="Guías y herramientas relacionadas" className="rounded-[2rem] border border-dark-text/8 bg-peach-fuzz/55 p-8">
                <h2 className="font-display text-3xl font-semibold text-dark-text">Sigue explorando</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {guide.relatedLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="block rounded-2xl bg-white/80 p-4 font-semibold text-rosa-mexicano hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosa-mexicano">
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
            {guide.sources.length ? (
              <section className="rounded-[2rem] border border-dark-text/8 bg-white/82 p-8">
                <h2 className="font-display text-3xl font-semibold text-dark-text">Fuentes oficiales</h2>
                <p className="mt-3 leading-7 text-dark-text/78">Estas fuentes orientan la guía; confirma siempre la versión vigente y los requisitos de tu programa.</p>
                <ul className="mt-5 space-y-3">
                  {guide.sources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-rosa-mexicano underline underline-offset-2 hover:text-dark-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosa-mexicano">
                        {source.title} <span aria-hidden="true">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
