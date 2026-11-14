import type { Scholarship } from "../_data/scholarships";
import styles from "../becas/scholarships.module.css";

type ScholarshipCardProps = {
  scholarship: Scholarship;
  variant?: "preview" | "full";
};

function confirmedAnswer(value: boolean | null) {
  if (value === null) return "Por confirmar";
  return value ? "Sí" : "No";
}

export function ScholarshipCard({
  scholarship,
  variant = "full",
}: ScholarshipCardProps) {
  const hasOfficialLink =
    Boolean(scholarship.officialUrl) && /^https?:\/\//.test(scholarship.officialUrl);

  const formattedLastChecked = scholarship.lastChecked
    ? new Intl.DateTimeFormat("es-MX", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(`${scholarship.lastChecked}T00:00:00`))
    : "Sin revisión documentada";

  const detailRows = [
    { label: "Área", value: scholarship.fields },
    { label: "Idioma", value: scholarship.language },
    {
      label: scholarship.verificationStatus === "verified" ? "Plazo indicado" : "Plazo indicado · por verificar",
      value: scholarship.deadline,
    },
    { label: "Elegibilidad para México", value: confirmedAnswer(scholarship.eligibleForMexicans) },
    { label: "¿Suele pedir alemán?", value: confirmedAnswer(scholarship.germanUsuallyRequired) },
    { label: "¿Pide admisión previa?", value: confirmedAnswer(scholarship.admissionRequired) },
  ];

  return (
    <article className={styles.card}>
      <div className={styles.cardTopline}>
        <span className={styles.organization}>{scholarship.organization}</span>
        <span className={styles.verification}>
          {scholarship.verificationStatus === "verified"
            ? "Datos revisados"
            : "Datos por verificar"}
        </span>
      </div>
      <h3>{scholarship.title}</h3>
      <div className={styles.cardChips}>
        <span>{scholarship.degreeLevel}</span>
        <span>{scholarship.fundingType}</span>
      </div>
      <p className={styles.cardNotes}>{scholarship.notes}</p>
      {variant === "full" ? (
        <dl className={styles.cardDetails}>
          {detailRows.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <p className={styles.lastChecked}>Última revisión: {formattedLastChecked}</p>
      {hasOfficialLink ? (
        <a
          href={scholarship.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.officialLink}
        >
          Consultar fuente oficial <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <span
          aria-disabled="true"
          className={styles.pendingLink}
        >
          Enlace oficial pendiente
        </span>
      )}
    </article>
  );
}
