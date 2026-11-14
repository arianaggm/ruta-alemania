"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readInitialState } from "../_lib/initial-load";
import {
  APPLICATIONS_STORAGE_KEY,
  loadApplications,
  type ApplicationsLoadResult,
} from "../aplicaciones/_lib/storage";
import styles from "../mi-bej.module.css";

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
    <section aria-labelledby="applications-summary-heading" className={styles.applicationsPanel}>
      <div>
        <p className={styles.eyebrow}>MIS APLICACIONES</p>
        <h2 id="applications-summary-heading">Tus programas, en un lugar.</h2>
        <p>Guarda programas y sigue el estado de tus solicitudes sin perder de vista los próximos pasos.</p>
        {!loaded ? (
          <p role="status">Cargando resumen de aplicaciones…</p>
        ) : applications ? (
          applications.length ? <div className={styles.applicationCounts}>
            <p><span>{applications.length}</span> programas guardados</p>
            <p><span>{applications.filter((application) => application.status === "accepted").length}</span> aceptadas</p>
          </div> : <p>Aún no has guardado programas. Puedes empezar cuando encuentres uno que te interese.</p>
        ) : <p role="status">{loaded.status === "unavailable"
          ? "No podemos leer tus aplicaciones en este navegador por ahora. No se ha modificado ningún dato."
          : "No podemos mostrar el resumen porque los datos de aplicaciones no se reconocen. No se han modificado; revisa Mis aplicaciones para más información."}</p>}
      </div>
      <Link href="/mi-ruta/aplicaciones" className={styles.primaryLink}>Ir a Mis aplicaciones →</Link>
    </section>
  );
}
