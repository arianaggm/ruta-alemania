import type { Scholarship } from "../_data/scholarships";

type ScholarshipCardProps = {
  scholarship: Scholarship;
  variant?: "preview" | "full";
};

export function ScholarshipCard({
  scholarship,
  variant = "full",
}: ScholarshipCardProps) {
  const hasOfficialLink =
    Boolean(scholarship.officialUrl) && scholarship.officialUrl !== "#";

  const formattedLastChecked = new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${scholarship.lastChecked}T00:00:00`));

  const detailRows =
    variant === "preview"
      ? [
          { label: "Organización", value: scholarship.organization },
          { label: "Nivel", value: scholarship.degreeLevel },
          { label: "Cierre", value: scholarship.deadline },
          { label: "Financiamiento", value: scholarship.fundingType },
        ]
      : [
          { label: "Organización", value: scholarship.organization },
          { label: "Nivel", value: scholarship.degreeLevel },
          { label: "Área", value: scholarship.fields },
          { label: "Idioma", value: scholarship.language },
          { label: "Financiamiento", value: scholarship.fundingType },
          { label: "Cierre", value: scholarship.deadline },
          {
            label: "¿Elegible para mexicanas y mexicanos?",
            value: scholarship.eligibleForMexicans ? "Sí" : "No siempre",
          },
          {
            label: "¿Suele pedir alemán?",
            value: scholarship.germanUsuallyRequired ? "Sí" : "No necesariamente",
          },
          {
            label: "¿Suele pedir admisión previa?",
            value: scholarship.admissionRequired ? "Sí" : "Depende",
          },
          { label: "Notas", value: scholarship.notes },
          { label: "Última revisión", value: formattedLastChecked },
        ];

  return (
    <article className="flex h-full flex-col rounded-[2rem] border border-rosa-mexicano/12 bg-white/85 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.08)]">
      <div className="inline-flex w-fit rounded-full bg-butter px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-dark-text">
        {variant === "preview" ? "Vista previa" : "Base de becas"}
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold text-dark-text">
        {scholarship.title}
      </h3>
      <div className="mt-6 space-y-3 text-sm text-dark-text/78">
        {detailRows.map((row) => (
          <div
            key={row.label}
            className={`rounded-2xl bg-antique-white px-4 py-3 ${
              variant === "full"
                ? "space-y-1"
                : "flex items-center justify-between gap-4"
            }`}
          >
            <span className="font-medium text-dark-text/65">{row.label}</span>
            <p className="font-semibold text-dark-text">{row.value}</p>
          </div>
        ))}
      </div>
      {hasOfficialLink ? (
        <a
          href={scholarship.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full border border-rosa-mexicano/18 bg-peach-fuzz/65 px-5 py-3 text-sm font-semibold text-dark-text hover:-translate-y-0.5 hover:border-rosa-mexicano hover:bg-peach-fuzz"
        >
          Ver detalles
        </a>
      ) : (
        <span
          aria-disabled="true"
          className="mt-6 inline-flex items-center justify-center rounded-full border border-dark-text/10 bg-antique-white px-5 py-3 text-sm font-semibold text-dark-text/52"
        >
          Link oficial pendiente
        </span>
      )}
    </article>
  );
}
