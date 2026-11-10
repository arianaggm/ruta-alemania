"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ApplicationCard } from "./application-card";
import { ApplicationForm } from "./application-form";
import { readInitialState } from "../../_lib/initial-load";
import { focusApplicationForm, restoreApplicationFocus } from "../_lib/form-focus";
import { createLocalId } from "../_lib/local-id";
import {
  addDocument,
  applicationStatuses,
  changeStatus,
  createApplication,
  deleteApplication,
  editApplication,
  editDocument,
  filterApplications,
  removeDocument,
  runConfirmedDeletion,
  sortByDeadline,
  statusLabels,
  toggleDocument,
  upcomingDeadlines,
  type ApplicationDraft,
  type ApplicationFilter,
  type UniversityApplication,
} from "../_lib/model";
import {
  APPLICATIONS_STORAGE_KEY,
  loadApplications,
  updateApplications,
  type ApplicationsLoadResult,
} from "../_lib/storage";

function localToday(): string {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function ApplicationsBoard() {
  const [loaded, setLoaded] = useState<ApplicationsLoadResult | null>(null);
  const [filter, setFilter] = useState<ApplicationFilter>("all");
  const [editor, setEditor] = useState<string | null>(null);
  const [error, setError] = useState("");
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const previousEditorRef = useRef<string | null>(null);

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

  useEffect(() => {
    if (editor) focusApplicationForm(document.getElementById("application-form-title"));
    else if (previousEditorRef.current) {
      if (!restoreApplicationFocus(returnFocusRef.current)) document.getElementById("applications-title")?.focus();
      returnFocusRef.current = null;
    }
    previousEditorRef.current = editor;
  }, [editor]);

  function openEditor(id: string, trigger: HTMLButtonElement) {
    returnFocusRef.current = trigger;
    setEditor(id);
  }

  function commit(change: (applications: UniversityApplication[]) => UniversityApplication[]): boolean {
    try {
      const result = updateApplications(change);
      if (result.status !== "ready") {
        if (result.status !== "unavailable") setLoaded(result);
        setError(result.status === "unavailable"
          ? "No se pudieron guardar los cambios en este navegador."
          : "Los datos guardados cambiaron y no pudimos leerlos. No se sobrescribió ninguna aplicación.");
        return false;
      }
      setLoaded(result);
      setError("");
      return true;
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No se pudo realizar el cambio.");
      return false;
    }
  }

  function updateOne(id: string, change: (application: UniversityApplication) => UniversityApplication): boolean {
    return commit((applications) => {
      if (!applications.some((application) => application.id === id)) throw new Error("Esta aplicación ya no está disponible. Recarga la página.");
      return applications.map((application) => application.id === id ? change(application) : application);
    });
  }

  function saveDraft(draft: ApplicationDraft): boolean {
    const creating = editor === "new";
    const success = editor === "new"
      ? commit((applications) => [...applications, createApplication(draft, createLocalId(), new Date().toISOString())])
      : editor
        ? updateOne(editor, (application) => editApplication(application, draft, new Date().toISOString()))
        : false;
    if (success) {
      setEditor(null);
      if (creating) setFilter("all");
    }
    return success;
  }

  function requestDelete(application: UniversityApplication, confirmed: boolean): boolean {
    return runConfirmedDeletion(confirmed, () => {
      const success = commit((applications) => {
        if (!applications.some((item) => item.id === application.id)) throw new Error("Esta aplicación ya no está disponible. Recarga la página.");
        return deleteApplication(applications, application.id);
      });
      if (success && editor === application.id) setEditor(null);
      return success;
    });
  }

  if (!loaded) return <main className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8"><p role="status">Cargando Mis Aplicaciones…</p></main>;

  if (loaded.status !== "ready") {
    return <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/mi-ruta" className="text-sm font-semibold text-rosa-mexicano hover:underline">← Volver a Mi Ruta</Link>
      <div className="mt-8 rounded-[2rem] border border-rosa-mexicano/12 bg-white/85 p-8 shadow-[0_18px_50px_rgba(43,30,36,0.07)]">
        <h1 className="font-display text-3xl font-semibold">No pudimos abrir tus aplicaciones</h1>
        <p className="mt-4 leading-7 text-dark-text/70">{loaded.status === "unavailable"
          ? "El almacenamiento local no está disponible. Habilítalo para guardar aplicaciones en este navegador."
          : loaded.status === "unsupported"
            ? "Esta lista fue creada con una versión que la página actual no reconoce. No hemos modificado esos datos."
            : "Los datos guardados parecen dañados. No hemos modificado ni borrado la lista."}</p>
        {loaded.status !== "unavailable" && <p className="mt-4 text-sm leading-6 text-dark-text/70">Para proteger tus registros, no se reemplazará la lista automáticamente. Conserva una copia de los datos de este navegador antes de intentar recuperarlos.</p>}
        {error && <p role="alert" className="mt-4 rounded-2xl bg-butter/70 p-4 text-sm">{error}</p>}
      </div>
    </main>;
  }

  const applications = loaded.data.applications;
  const today = localToday();
  const knownUpcoming = upcomingDeadlines(applications, today);
  const visible = sortByDeadline(filterApplications(applications, filter));
  const preparationCount = applications.filter((application) => ["saved", "preparing", "ready"].includes(application.status)).length;
  const sentCount = applications.filter((application) => ["submitted", "review", "accepted", "rejected", "waitlisted"].includes(application.status)).length;
  const acceptedCount = applications.filter((application) => application.status === "accepted").length;
  const editingApplication = editor && editor !== "new" ? applications.find((application) => application.id === editor) ?? null : null;

  return <main className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
    <Link href="/mi-ruta" className="text-sm font-semibold text-rosa-mexicano hover:underline">← Volver a Mi Ruta</Link>
    <header className="mt-8 rounded-[2rem] border border-rosa-mexicano/12 bg-peach-fuzz/65 p-7 shadow-[0_22px_70px_rgba(43,30,36,0.08)] sm:p-10">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rosa-mexicano">Tu espacio de organización</p>
      <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Mis Aplicaciones</h1>
      <p className="mt-4 max-w-2xl leading-7 text-dark-text/75">Guarda programas, sigue tus solicitudes y organiza documentos en un solo lugar. Los datos y fechas que anotas son personales; confirma siempre requisitos y plazos en los sitios oficiales.</p>
      <button type="button" onClick={(event) => openEditor("new", event.currentTarget)} className="mt-6 rounded-full bg-rosa-mexicano px-6 py-3 font-semibold text-white hover:bg-rosa-mexicano/90">Agregar programa</button>
    </header>

    {error && <p role="alert" className="mt-6 rounded-2xl bg-butter/80 p-4 text-sm font-medium">{error}</p>}
    {editor && <ApplicationForm key={editor} application={editingApplication} onSave={saveDraft} onCancel={() => setEditor(null)} />}

    <section className="mt-10" aria-labelledby="overview-title">
      <h2 id="overview-title" className="font-display text-2xl font-semibold">Resumen</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          ["Programas guardados", applications.length],
          ["En preparación", preparationCount],
          ["Enviadas", sentCount],
          ["Aceptadas", acceptedCount],
          ["Plazos próximos", knownUpcoming.length],
        ].map(([label, count]) => <div key={label} className="rounded-[1.5rem] border border-dark-text/8 bg-white/85 p-5 shadow-[0_12px_35px_rgba(43,30,36,0.05)]"><p className="text-sm text-dark-text/70">{label}</p><p className="mt-2 font-display text-3xl font-semibold text-rosa-mexicano">{count}</p></div>)}
      </div>
    </section>

    <section className="mt-10 rounded-[2rem] bg-butter/55 p-6 sm:p-8" aria-labelledby="deadlines-title">
      <h2 id="deadlines-title" className="font-display text-2xl font-semibold">Próximas fechas que anotaste</h2>
      <p className="mt-2 text-sm text-dark-text/70">Solo se muestran solicitudes aún no enviadas con una fecha futura o de hoy. Estas fechas no están verificadas oficialmente.</p>
      {knownUpcoming.length ? <ul className="mt-5 grid gap-3 md:grid-cols-2">{knownUpcoming.slice(0, 4).map((application) => <li key={application.id} className="rounded-2xl bg-white/85 p-4 text-sm"><span className="font-semibold">{new Intl.DateTimeFormat("es", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${application.deadline}T00:00:00Z`))}</span><span className="ml-2">{application.programName} · {application.universityName}</span></li>)}</ul>
        : <p className="mt-5 text-sm text-dark-text/70">Aún no hay fechas próximas anotadas.</p>}
    </section>

    <section className="mt-12" aria-labelledby="applications-title">
      <div className="flex flex-wrap items-end justify-between gap-4"><h2 id="applications-title" tabIndex={-1} className="font-display text-3xl font-semibold focus:outline-2 focus:outline-offset-2 focus:outline-rosa-mexicano">Tus programas</h2><p className="text-sm text-dark-text/65">{visible.length} de {applications.length} visibles</p></div>
      {applications.length > 0 && <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filtrar por estado">
        {(["all", ...applicationStatuses] as const).map((status) => <button key={status} type="button" aria-pressed={filter === status} onClick={() => setFilter(status)} className={`rounded-full border px-4 py-2 text-sm font-semibold ${filter === status ? "border-rosa-mexicano bg-rosa-mexicano text-white" : "border-dark-text/12 bg-white/80 text-dark-text hover:bg-peach-fuzz"}`}>{status === "all" ? "Todas" : statusLabels[status]} ({filterApplications(applications, status).length})</button>)}
      </div>}
      {applications.length === 0 ? <div className="mt-6 rounded-[2rem] border border-dark-text/8 bg-white/85 p-8 text-center sm:p-12"><h3 className="font-display text-2xl font-semibold">Tu primer programa empieza aquí</h3><p className="mx-auto mt-3 max-w-xl leading-7 text-dark-text/70">Agrega una universidad y un programa que te interesen. Después podrás registrar tu estado, documentos y fechas a tu ritmo.</p><button type="button" onClick={(event) => openEditor("new", event.currentTarget)} className="mt-6 rounded-full bg-rosa-mexicano px-6 py-3 font-semibold text-white">Agregar mi primer programa</button></div>
        : visible.length === 0 ? <p className="mt-6 rounded-2xl bg-white/80 p-6 text-dark-text/70">No hay aplicaciones con este estado. Prueba otro filtro.</p>
          : <div className="mt-6 grid gap-6 lg:grid-cols-2">{visible.map((application) => <ApplicationCard key={application.id} application={application}
            onEdit={(trigger) => openEditor(application.id, trigger)}
            onDelete={(confirmed) => requestDelete(application, confirmed)}
            onStatus={(status) => {
              if (updateOne(application.id, (current) => changeStatus(current, status, new Date().toISOString())) && filter !== "all" && filter !== status) setFilter("all");
            }}
            onAddDocument={(name) => updateOne(application.id, (current) => addDocument(current, name, createLocalId(), new Date().toISOString()))}
            onRenameDocument={(id, name) => updateOne(application.id, (current) => editDocument(current, id, name, new Date().toISOString()))}
            onToggleDocument={(id) => updateOne(application.id, (current) => toggleDocument(current, id, new Date().toISOString()))}
            onRemoveDocument={(id) => updateOne(application.id, (current) => removeDocument(current, id, new Date().toISOString()))}
          />)}</div>}
    </section>
    <p className="mt-10 text-sm leading-6 text-dark-text/70">Tus aplicaciones se guardan solo en este navegador y dispositivo, para este origen: <span className="font-semibold">{window.location.origin}</span>. localhost, 127.0.0.1 y las direcciones de red local tienen listas separadas. Si borras los datos del navegador, perderás esta lista.</p>
  </main>;
}
