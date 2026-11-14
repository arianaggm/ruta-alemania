import Link from "next/link";

import type { GuideSummary } from "../_content/guides/types";
import styles from "../guias/guides.module.css";

type GuideCardProps = {
  guide: GuideSummary;
  href: string;
  variant?: "preview" | "full";
};

export function GuideCard({ guide, href, variant = "full" }: GuideCardProps) {
  return (
    <article id={variant === "full" ? guide.slug : undefined} className={styles.guideCard}>
      <Link href={href} className={styles.guideCardLink}>
        <span className={styles.guideCardMeta}>
          <span>{guide.category}</span>
          <span>{guide.readingTime} de lectura</span>
        </span>
        <h3>{guide.title}</h3>
        <p>{guide.summary}</p>
        <span className={styles.guideCardTags} aria-label="Temas">
          {guide.tags.slice(0, variant === "preview" ? 2 : 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </span>
        <span className={styles.guideCardAction}>Leer guía <span aria-hidden="true">↗</span></span>
      </Link>
    </article>
  );
}
