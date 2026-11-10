"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readInitialState } from "../_lib/initial-load";
import {
  APPLICATIONS_STORAGE_KEY,
  loadApplications,
  type ApplicationsLoadResult,
} from "../aplicaciones/_lib/storage";

export function ApplicationsSummary() {
  const [loaded, setLoaded] = useState<ApplicationsLoadResult | null>(null);

  useEffect(() => {
    let active = true;
    void readInitialState<ApplicationsLoadResult>(loadApplications, { status: "unavailable" }).then((result) => {
      if (active) setLoaded(result);
    });
    const onStorage = (event: StorageEvent) => {
      if (event.key === APPLICATIONS_STORAGE_KEY) setLoaded(loadApplications());
    };
    window.addEventListener("storage", onStorage);
    return () => {
      active = false;
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const applications = loaded?.status === "ready" ? loaded.data.applications : null;

  return (
    <section aria-labelledby="applications-summary-heading" className="mt-8 rounded-[2rem] border border-dark-text/8 bg-white/85 p-7 shadow-[0_18px_50px_rgba(43,30,36,0.06)] sm:p-9">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rosa-mexicano">Tus solicitudes</p>
          <h2 id="applications-summary-heading" className="mt-3 font-display text-2xl font-semibold text-dark-text">Mis Aplicaciones</h2>
          <p className="mt-3 max-w-2xl leading-7 text-dark-text/75">Guarda programas y sigue el estado de tus solicitudes en un espacio aparte.</p>
        </div>
        <Link href="/mi-ruta/aplicaciones" className="inline-flex shrink-0 items-center justify-center rounded-full border border-rosa-mexicano/25 bg-peach-fuzz/60 px-5 py-3 text-sm font-semibold text-dark-text hover:border-rosa-mexicano hover:bg-peach-fuzz">
          Ir a Mis Aplicaciones <span aria-hidden="true" className="ml-2">→</span>
        </Link>
      </div>
      {!loaded ? (
        <p role="status" className="mt-5 text-sm text-dark-text/70">Cargando resumen de aplicaciones…</p>
      ) : applications ? (
        applications.length ? (
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <p className="rounded-2xl bg-antique-white px-4 py-3"><span className="font-display text-xl font-semibold text-rosa-mexicano">{applications.length}</span> programas guardados</p>
            <p className="rounded-2xl bg-antique-white px-4 py-3"><span className="font-display text-xl font-semibold text-rosa-mexicano">{applications.filter((application) => application.status === "accepted").length}</span> aceptadas</p>
          </div>
        ) : (
          <p className="mt-5 text-sm leading-6 text-dark-text/70">Aún no has guardado programas. Puedes empezar cuando encuentres uno que te interese.</p>
        )
      ) : (
        <p role="status" className="mt-5 rounded-2xl bg-butter/60 p-4 text-sm leading-6 text-dark-text">
          {loaded.status === "unavailable"
            ? "No podemos leer tus aplicaciones en este navegador por ahora. No se ha modificado ningún dato."
            : "No podemos mostrar el resumen porque los datos de aplicaciones no se reconocen. No se han modificado; revisa Mis Aplicaciones para más información."}
        </p>
      )}
    </section>
  );
}
