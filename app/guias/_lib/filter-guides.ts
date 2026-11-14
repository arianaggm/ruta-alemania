import type { GuideSummary } from "../../_content/guides/types";

function normalize(value: string) {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLocaleLowerCase("es-MX");
}

export function filterGuides(guides: GuideSummary[], category: string, query: string) {
  const search = normalize(query.trim());

  return guides.filter((guide) => {
    if (category !== "Todas" && guide.category !== category) return false;
    if (!search) return true;

    return normalize([guide.title, guide.summary, guide.category, ...guide.tags].join(" ")).includes(search);
  });
}
