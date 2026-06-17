import Link from "next/link";
import type { Guide } from "../_data/guides";

type GuideCardProps = {
  guide: Guide;
  href: string;
  variant?: "preview" | "full";
};

export function GuideCard({
  guide,
  href,
  variant = "full",
}: GuideCardProps) {
  const previewTags = variant === "preview" ? guide.tags.slice(0, 2) : guide.tags;

  return (
    <article
      id={variant === "full" ? guide.slug : undefined}
      className="rounded-[2rem] border border-dark-text/8 bg-peach-fuzz/65 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.08)]"
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex rounded-full bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-rosa-mexicano">
          {guide.category}
        </span>
        <span className="text-sm font-medium text-dark-text/62">
          {guide.readingTime} de lectura
        </span>
      </div>

      <h3 className="mt-5 font-display text-2xl font-semibold text-dark-text">
        {guide.title}
      </h3>

      <p className="mt-4 leading-7 text-dark-text/74">{guide.excerpt}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {previewTags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-antique-white px-3 py-1 text-xs font-medium text-dark-text/76"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        href={href}
        className="mt-6 inline-flex items-center font-semibold text-rosa-mexicano hover:text-[#b83867]"
      >
        Leer guía
      </Link>
    </article>
  );
}
