import type { Scholarship } from "../../_data/scholarships";

export type ScholarshipFilters = {
  degreeLevel: string;
  fields: string;
  language: string;
  fundingType: string;
};

export const initialFilters: ScholarshipFilters = {
  degreeLevel: "Todos",
  fields: "Todas",
  language: "Todos",
  fundingType: "Todos",
};

function normalize(value: string) {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

function includesFilterValue(source: string, filter: string) {
  return filter === "Todos" || filter === "Todas" || normalize(source).includes(normalize(filter));
}

export function filterScholarships(scholarships: Scholarship[], filters: ScholarshipFilters, query: string) {
  const search = normalize(query.trim());

  return scholarships.filter((scholarship) =>
    includesFilterValue(scholarship.degreeLevel, filters.degreeLevel) &&
    includesFilterValue(scholarship.fields, filters.fields) &&
    includesFilterValue(scholarship.language, filters.language) &&
    includesFilterValue(scholarship.fundingType, filters.fundingType) &&
    (!search || normalize([
      scholarship.title,
      scholarship.organization,
      scholarship.degreeLevel,
      scholarship.fields,
      scholarship.language,
      scholarship.fundingType,
      scholarship.notes,
    ].join(" ")).includes(search))
  );
}
