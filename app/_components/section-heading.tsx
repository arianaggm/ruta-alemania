type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rosa-mexicano">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-dark-text sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-lg leading-8 text-dark-text/76">{description}</p>
    </div>
  );
}
