"use client";

import { useState } from "react";
import { ScholarshipCard } from "../../_components/scholarship-card";
import type { Scholarship } from "../../_data/scholarships";
import { filterScholarships, initialFilters } from "../_lib/filter-scholarships";
import styles from "../scholarships.module.css";

type ScholarshipsBrowserProps = {
  scholarships: Scholarship[];
};

export function ScholarshipsBrowser({
  scholarships,
}: ScholarshipsBrowserProps) {
  const [filters, setFilters] = useState(initialFilters);
  const [query, setQuery] = useState("");

  const filterGroups = [
    {
      id: "degreeLevel",
      label: "Nivel",
      options: ["Todos", "Licenciatura", "Maestría", "Doctorado"],
    },
    {
      id: "fields",
      label: "Área",
      options: ["Todas", ...new Set(scholarships.map((item) => item.fields))],
    },
    {
      id: "language",
      label: "Idioma",
      options: ["Todos", "Inglés", "Alemán", "Inglés / Alemán", "Depende del programa"],
    },
    {
      id: "fundingType",
      label: "Financiamiento",
      options: ["Todos", ...new Set(scholarships.map((item) => item.fundingType))],
    },
  ] as const;

  const filteredScholarships = filterScholarships(scholarships, filters, query);

  return (
    <section className={styles.browser} aria-labelledby="browse-heading">
      <div className={styles.browserHeading}>
        <div>
          <p className={styles.eyebrow}>EXPLORA LAS OPCIONES</p>
          <h2 id="browse-heading">Encuentra apoyos para tu plan.</h2>
        </div>
        <p>Busca por nombre o tema y ajusta los filtros para reducir la lista.</p>
      </div>

      <div className={styles.filters} role="group" aria-label="Buscar y filtrar becas">
        <label className={styles.filterField} htmlFor="scholarship-search">
          <span>Buscar becas</span>
          <input
            id="scholarship-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Por ejemplo: DAAD, ingeniería, maestría..."
          />
        </label>
        {filterGroups.map((group) => (
          <label key={group.id} className={styles.filterField} htmlFor={`scholarship-${group.id}`}>
            <span>{group.label}</span>
            <select
              id={`scholarship-${group.id}`}
              value={filters[group.id]}
              onChange={(event) => setFilters((current) => ({ ...current, [group.id]: event.target.value }))}
            >
              {group.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>
        ))}
        <button
          type="button"
          className={styles.clearButton}
          onClick={() => { setFilters(initialFilters); setQuery(""); }}
          disabled={query === "" && Object.entries(initialFilters).every(([key, value]) => filters[key as keyof typeof filters] === value)}
        >
          Limpiar filtros
        </button>
      </div>

      <p className={styles.resultCount} role="status" aria-live="polite">
        {filteredScholarships.length} {filteredScholarships.length === 1 ? "beca encontrada" : "becas encontradas"}
      </p>
      <p className={styles.editorialNote}>
        Una beca incluida aquí no necesariamente tiene una convocatoria abierta. Los requisitos, fechas y condiciones pueden variar según el programa o la universidad; compruébalos en la fuente oficial.
      </p>

      {filteredScholarships.length ? (
        <div className={styles.cardGrid}>
          {filteredScholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship.title} scholarship={scholarship} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h3>No encontramos becas con esos filtros.</h3>
          <p>Prueba otra búsqueda o limpia los filtros para explorar todas las opciones.</p>
        </div>
      )}
    </section>
  );
}
