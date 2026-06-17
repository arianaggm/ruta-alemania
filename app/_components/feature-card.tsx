type FeatureCardProps = {
  title: string;
  description: string;
};

export function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <article className="rounded-[2rem] border border-dark-text/8 bg-white/80 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.08)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-butter text-lg font-semibold text-dark-text">
        {title.charAt(0)}
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold text-dark-text">
        {title}
      </h3>
      <p className="mt-4 leading-7 text-dark-text/75">{description}</p>
    </article>
  );
}
