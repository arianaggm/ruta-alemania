import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "../../_components/footer";
import { Navbar } from "../../_components/navbar";
import { getGuideBySlug, guides } from "../../_data/guides";

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
      title: "Guia no encontrada | Ruta Alemania",
    };
  }

  return {
    title: `${guide.title} | Ruta Alemania`,
    description: guide.excerpt,
  };
}

export default async function GuideDetailPage(
  props: PageProps<"/guias/[slug]">
) {
  const { slug } = await props.params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const navLinks = [
    { label: "Inicio", href: "/" },
    { label: "Becas", href: "/becas" },
    { label: "Guias", href: "/guias", active: true },
    { label: "Checklist", href: "/checklist" },
  ];

  return (
    <div className="bg-background text-foreground">
      <Navbar links={navLinks} homeHref="/" />

      <main className="px-4 pb-18 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/guias"
            className="inline-flex items-center rounded-full border border-rosa-mexicano/18 bg-white/78 px-4 py-2 text-sm font-semibold text-dark-text shadow-[0_12px_35px_rgba(43,30,36,0.06)] hover:-translate-y-0.5 hover:border-rosa-mexicano"
          >
            Volver a guias
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
                <div className="mt-6 grid gap-4">
                  {guide.checklistItems.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-3xl bg-white/78 p-4 shadow-[0_10px_30px_rgba(43,30,36,0.05)]"
                    >
                      <span className="mt-1 h-3 w-3 rounded-full bg-rosa-mexicano" />
                      <p className="leading-7 text-dark-text/82">{item}</p>
                    </div>
                  ))}
                </div>
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
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  {section.bullets?.length ? (
                    <div className="mt-6 grid gap-3">
                      {section.bullets.map((bullet) => (
                        <div
                          key={bullet}
                          className="flex items-start gap-3 rounded-3xl bg-peach-fuzz/55 p-4"
                        >
                          <span className="mt-1 h-3 w-3 rounded-full bg-rosa-mexicano" />
                          <p className="leading-7 text-dark-text/82">{bullet}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </section>
              ))}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
