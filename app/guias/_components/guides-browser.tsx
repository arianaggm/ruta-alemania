"use client";

import { useMemo, useState } from "react";
import { GuideCard } from "../../_components/guide-card";
import type { Guide } from "../../_data/guides";

type GuidesBrowserProps = {
  guides: Guide[];
};

const categories = [
  "Todas",
  "Aplicación",
  "Documentos",
  "Finanzas",
  "Visa",
  "Becas",
  "Llegada",
  "Sistema educativo",
] as const;

export function GuidesBrowser({ guides }: GuidesBrowserProps) {
  const [category, setCategory] = useState<(typeof categories)[number]>("Todas");

  const filteredGuides = useMemo(() => {
    if (category === "Todas") {
      return guides;
    }

    return guides.filter((guide) => guide.category === category);
  }, [category, guides]);

  return (
    <div className="mt-10 space-y-8">
      <section className="rounded-[2rem] border border-rosa-mexicano/12 bg-white/82 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.08)] sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rosa-mexicano">
              Filtros
            </p>
            <p className="mt-2 text-base leading-7 text-dark-text/74">
              Explora las guías por tema y enfócate en la parte del proceso que
              más necesitas resolver ahora.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCategory("Todas")}
            className="inline-flex items-center justify-center rounded-full border border-rosa-mexicano/16 bg-peach-fuzz/55 px-4 py-2 text-sm font-semibold text-dark-text hover:border-rosa-mexicano hover:bg-peach-fuzz"
          >
            Limpiar filtro
          </button>
        </div>

        <div className="mt-6">
          <label className="space-y-2">
            <span className="text-sm font-semibold text-dark-text">Categoría</span>
            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as (typeof categories)[number])
              }
              className="w-full rounded-2xl border border-dark-text/10 bg-antique-white px-4 py-3 text-sm text-dark-text outline-none ring-0 transition focus:border-rosa-mexicano md:max-w-sm"
            >
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-dark-text/72">
          {filteredGuides.length} guía
          {filteredGuides.length === 1 ? "" : "s"} mostrada
          {filteredGuides.length === 1 ? "" : "s"}.
        </p>
        <p className="rounded-full bg-butter/70 px-4 py-2 text-sm font-medium text-dark-text">
          Usa estas guías como punto de partida y confirma detalles clave con
          fuentes oficiales.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {filteredGuides.map((guide) => (
          <GuideCard
            key={guide.slug}
            guide={guide}
            href={`/guias/${guide.slug}`}
            variant="full"
          />
        ))}
      </div>

      {filteredGuides.length === 0 ? (
        <div className="rounded-[2rem] border border-dark-text/8 bg-white/82 p-8 text-center shadow-[0_18px_50px_rgba(43,30,36,0.08)]">
          <h3 className="font-display text-2xl font-semibold text-dark-text">
            No hay guías en esta categoría
          </h3>
          <p className="mt-3 text-dark-text/72">
            Cambia el filtro o vuelve a &quot;Todas&quot; para explorar el resto del
            contenido disponible.
          </p>
        </div>
      ) : null}
    </div>
  );
}
