import Link from "next/link";

type FeatureCardProps = {
  title: string;
  description: string;
  href: string;
};

export function FeatureCard({ title, description, href }: FeatureCardProps) {
  return (
    <article className="h-full">
      <Link
        href={href}
        className="group flex h-full flex-col rounded-[2rem] border border-dark-text/8 bg-white/80 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.08)] hover:-translate-y-1 hover:border-rosa-mexicano/30 hover:shadow-[0_22px_55px_rgba(43,30,36,0.12)]"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-butter text-lg font-semibold text-dark-text">
          {title.charAt(0)}
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold text-dark-text">
          {title}
        </h3>
        <p className="mt-4 leading-7 text-dark-text/75">{description}</p>
        <span className="mt-auto pt-6 text-sm font-semibold text-rosa-mexicano group-hover:text-[#8d2048]">
          Explorar <span aria-hidden="true">→</span>
        </span>
      </Link>
    </article>
  );
}
