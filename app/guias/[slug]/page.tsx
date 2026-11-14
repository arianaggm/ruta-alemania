import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrandName } from "../../_components/brand-name";

import { getGuideBySlug, guides } from "../../_content/guides/catalog";
import { loadPublishedGuide } from "../../_content/guides/load-guide.server";
import type { GuideText } from "../../_content/guides/types";
import styles from "../guides.module.css";

function renderGuideText(text: GuideText) {
  if (typeof text === "string") return text;
  if ("parts" in text) {
    return text.parts.map((part, index) => {
      if (typeof part === "string") return part;
      if ("strong" in part) return <strong key={index} className="font-semibold text-dark-text">{part.strong}</strong>;
      if ("brand" in part) return <BrandName key={index} />;
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
    return { title: "Guía no encontrada | bej" };
  }

  return {
    title: `${guide.title} | bej`,
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
    <main className={styles.articleMain}>
      <article className={styles.article}>
        <Link href="/guias" className={styles.backLink}>← Volver a las guías</Link>

        <header className={styles.articleHeader}>
          <div className={styles.articleMeta}>
            <span>{guide.category}</span>
            <span aria-hidden="true">/</span>
            <span>{guide.readingTime} de lectura</span>
          </div>
          <h1>{guide.title}</h1>
          <p className={styles.articleIntro}>{guide.intro}</p>
          <div className={styles.articleTags} aria-label="Temas de la guía">
            {guide.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </header>

        <div className={styles.readingColumn}>
          <section className={styles.keyIdeas} aria-labelledby="key-ideas-heading">
            <p className={styles.eyebrow}>PARA TENER PRESENTE</p>
            <h2 id="key-ideas-heading">Ideas clave</h2>
            <ol>
              {guide.keyTakeaways.map((takeaway) => <li key={takeaway}>{takeaway}</li>)}
            </ol>
          </section>

          {guide.checklistItems?.length ? (
            <section className={styles.miniChecklist} aria-labelledby="mini-list-heading">
              <p className={styles.eyebrow}>PARA PONER EN PRÁCTICA</p>
              <h2 id="mini-list-heading">Mini lista</h2>
              <ul>
                {guide.checklistItems.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          ) : null}

          <div className={styles.articleBody}>
            {guide.sections.map((section) => (
              <section key={section.title} className={styles.articleSection}>
                <h2>{section.title}</h2>
                <div className={styles.paragraphs}>
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index}>{renderGuideText(paragraph)}</p>
                  ))}
                </div>

                {section.table ? (
                  <div className={styles.tableScroll} role="region" aria-label={`Tabla: ${section.title}`} tabIndex={0}>
                    <table>
                      <thead>
                        <tr>
                          {section.table.columns.map((column) => <th key={column} scope="col">{column}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex}>{renderGuideText(cell)}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}

                {section.bullets?.length ? (
                  <ul className={styles.articleBullets}>
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          {BudgetCalculator ? <BudgetCalculator /> : null}

          {guide.relatedLinks?.length ? (
            <nav aria-label="Guías y herramientas relacionadas" className={styles.relatedLinks}>
              <p className={styles.eyebrow}>SIGUE EXPLORANDO</p>
              <h2>Lecturas y herramientas relacionadas</h2>
              <ul>
                {guide.relatedLinks.map((link) => (
                  <li key={link.href}><Link href={link.href}>{link.title} <span aria-hidden="true">↗</span></Link></li>
                ))}
              </ul>
            </nav>
          ) : null}

          {guide.sources.length ? (
            <section className={styles.sources} aria-labelledby="sources-heading">
              <p className={styles.eyebrow}>ANTES DE APLICAR</p>
              <h2 id="sources-heading">Fuentes oficiales</h2>
              <p>Estas fuentes orientan la guía; confirma siempre la versión vigente y los requisitos de tu programa.</p>
              <ul>
                {guide.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                      {source.title} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </article>
    </main>
  );
}
