"use client";

import { useMemo, useState } from "react";
import type { Scholarship } from "../../_data/scholarships";
import { ScholarshipCard } from "../../_components/scholarship-card";

type ScholarshipsBrowserProps = {
  scholarships: Scholarship[];
};

type FilterState = {
  degreeLevel: string;
  field: string;
  language: string;
  funding: string;
};

const initialFilters: FilterState = {
  degreeLevel: "Todos",
  field: "Todas",
  language: "Todos",
  funding: "Todos",
};

const filterGroups = [
  {
    id: "degreeLevel",
    label: "Nivel",
    options: ["Todos", "Licenciatura", "Maestria", "Doctorado"],
  },
  {
    id: "field",
    label: "Área",
    options: ["Todas", "STEM", "Todas las áreas", "Áreas relacionadas con desarrollo"],
  },
  {
    id: "language",
    label: "Idioma",
    options: ["Todos", "Inglés", "Alemán", "Inglés / Alemán"],
  },
  {
    id: "funding",
    label: "Financiamiento",
    options: [
      "Todos",
      "Financiamiento completo",
      "Apoyo mensual",
      "Apoyo parcial",
      "Apoyo de movilidad",
    ],
  },
] as const;

function includesFilterValue(source: string, filter: string) {
  if (filter === "Todos" || filter === "Todas") return true;

  const normalizedSource = source.toLowerCase();
  const normalizedFilter = filter.toLowerCase();

  return normalizedSource.includes(normalizedFilter);
}

export function ScholarshipsBrowser({
  scholarships,
}: ScholarshipsBrowserProps) {
  const [filters, setFilters] = useState(initialFilters);

  const filteredScholarships = useMemo(() => {
    return scholarships.filter((scholarship) => {
      return (
        includesFilterValue(scholarship.degreeLevel, filters.degreeLevel) &&
        includesFilterValue(scholarship.field, filters.field) &&
        includesFilterValue(scholarship.language, filters.language) &&
        includesFilterValue(scholarship.funding, filters.funding)
      );
    });
  }, [filters, scholarships]);

  return (
    <div className="mt-10 space-y-8">
      <section className="rounded-[2rem] border border-rosa-mexicano/12 bg-white/82 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.08)] sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rosa-mexicano">
              Filtros
            </p>
            <p className="mt-2 text-base leading-7 text-dark-text/74">
              Ajusta la vista para explorar oportunidades según tu perfil.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setFilters(initialFilters)}
            className="inline-flex items-center justify-center rounded-full border border-rosa-mexicano/16 bg-peach-fuzz/55 px-4 py-2 text-sm font-semibold text-dark-text hover:border-rosa-mexicano hover:bg-peach-fuzz"
          >
            Limpiar filtros
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {filterGroups.map((group) => (
            <label key={group.id} className="space-y-2">
              <span className="text-sm font-semibold text-dark-text">
                {group.label}
              </span>
              <select
                value={filters[group.id]}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    [group.id]: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-dark-text/10 bg-antique-white px-4 py-3 text-sm text-dark-text outline-none ring-0 transition focus:border-rosa-mexicano"
              >
                {group.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-dark-text/72">
          {filteredScholarships.length} beca
          {filteredScholarships.length === 1 ? "" : "s"} mostrada
          {filteredScholarships.length === 1 ? "" : "s"}.
        </p>
        <p className="rounded-full bg-butter/70 px-4 py-2 text-sm font-medium text-dark-text">
          Siempre verifica requisitos, fechas y elegibilidad en la página
          oficial de cada beca.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {filteredScholarships.map((scholarship) => (
          <ScholarshipCard
            key={scholarship.title}
            scholarship={scholarship}
            variant="full"
          />
        ))}
      </div>

      {filteredScholarships.length === 0 ? (
        <div className="rounded-[2rem] border border-dark-text/8 bg-white/82 p-8 text-center shadow-[0_18px_50px_rgba(43,30,36,0.08)]">
          <h3 className="font-display text-2xl font-semibold text-dark-text">
            No hay resultados con esos filtros
          </h3>
          <p className="mt-3 text-dark-text/72">
            Prueba con una combinación más amplia o limpia los filtros para ver
            todas las becas disponibles.
          </p>
        </div>
      ) : null}
    </div>
  );
}
