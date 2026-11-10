"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ApplicationsSummary } from "./applications-summary";
import { readInitialState } from "../_lib/initial-load";
import {
  buildRoadmap,
  getNextSteps,
  getRecommendedGuides,
  getRecommendedResources,
  languageLabels,
  levelLabels,
  priorityLabels,
  stageLabels,
} from "../_lib/roadmap";
import { loadSavedRoute, saveRoute, type LoadResult, type SavedRoute } from "../_lib/storage";

export function RouteDashboard() {
  const [loaded, setLoaded] = useState<LoadResult | null>(null);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    let active = true;
    void readInitialState<LoadResult>(loadSavedRoute, { status: "unavailable" }).then((result) => {
      if (active) setLoaded(result);
    });
    return () => {
      active = false;
    };
  }, []);

  function toggleTask(taskId: string, data: SavedRoute) {
    const completedTaskIds = data.completedTaskIds.includes(taskId)
      ? data.completedTaskIds.filter((id) => id !== taskId)
      : [...data.completedTaskIds, taskId];
    const updated = { ...data, completedTaskIds };
    if (!saveRoute(updated)) {
      setSaveError("No se pudo guardar el cambio. Revisa el almacenamiento de este navegador.");
      return;
    }
    setSaveError("");
    setLoaded({ status: "ready", data: updated });
  }

  if (!loaded) return <main className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8"><p role="status">Cargando Mi Ruta…</p></main>;

  if (loaded.status !== "ready") {
    return <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-rosa-mexicano/12 bg-white/85 p-8 shadow-[0_22px_70px_rgba(43,30,36,0.08)] sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rosa-mexicano">Tu espacio personal</p>
        <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Mi Ruta empieza contigo</h1>
        <p className="mt-5 leading-7 text-dark-text/75">{loaded.status === "empty"
          ? "Cuéntanos en qué punto estás y organizaremos una ruta de pasos y recursos para ti."
          : loaded.status === "invalid"
            ? "No pudimos leer los datos guardados de Mi Ruta. No hemos borrado nada; puedes crear una ruta nueva cuando quieras."
            : "El almacenamiento de este navegador no está disponible. Puedes revisar el formulario, pero necesitarás habilitarlo para guardar tu avance."}</p>
        <Link href="/mi-ruta/empezar" className="mt-7 inline-flex rounded-full bg-rosa-mexicano px-6 py-3 font-semibold text-white hover:bg-rosa-mexicano/90">{loaded.status === "empty" ? "Crear Mi Ruta" : "Ir al formulario"}</Link>
        <Link href="/mi-ruta/aplicaciones" className="ml-3 mt-7 inline-flex rounded-full border border-rosa-mexicano/25 bg-white/80 px-6 py-3 font-semibold text-dark-text hover:bg-peach-fuzz">Mis Aplicaciones</Link>
      </div>
    </main>;
  }

  const { data } = loaded;
  const { preferences, completedTaskIds } = data;
  const stages = buildRoadmap(preferences);
  const tasks = stages.flatMap((stage) => stage.tasks);
  const completed = tasks.filter((task) => completedTaskIds.includes(task.id)).length;
  const percent = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  const nextSteps = getNextSteps(stages, completedTaskIds, preferences.priority);
  const guides = getRecommendedGuides(preferences);
  const resources = getRecommendedResources(preferences);
  const start = preferences.startSemester === "undecided"
    ? "Por decidir"
    : `${preferences.startSemester === "winter" ? "Invierno" : "Verano"} de ${preferences.startYear}`;

  return <main className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
    <Link href="/" className="text-sm font-semibold text-rosa-mexicano hover:underline">← Volver al inicio</Link>
    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
      <section aria-labelledby="study-goal-heading" className="min-w-0 rounded-[2rem] border border-rosa-mexicano/12 bg-peach-fuzz/65 p-7 shadow-[0_22px_70px_rgba(43,30,36,0.08)] sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rosa-mexicano">Tu plan personal</p>
        <h1 id="study-goal-heading" className="mt-4 font-display text-3xl font-semibold text-dark-text sm:text-4xl">
          Tu plan de {levelLabels[preferences.studyLevel].toLocaleLowerCase("es")} en Alemania
        </h1>
        <p className="mt-4 leading-7 text-dark-text/75">Avanza a tu ritmo con tareas y recursos orientativos. Confirma siempre los requisitos de cada programa según tu caso.</p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          {[
            ["Nivel", levelLabels[preferences.studyLevel]],
            ["Idioma", languageLabels[preferences.studyLanguage]],
            ["Etapa actual", stageLabels[preferences.stage]],
            ["Inicio previsto", start],
          ].map(([label, value]) => <div key={label} className="rounded-2xl bg-white/80 px-4 py-3">
            <dt className="text-xs font-semibold uppercase tracking-wide text-dark-text/70">{label}</dt>
            <dd className="mt-1 font-semibold text-dark-text">{value}</dd>
          </div>)}
        </dl>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <p className="text-sm text-dark-text/75">Prioridad: <span className="font-semibold text-dark-text">{priorityLabels[preferences.priority]}</span></p>
          <Link href="/mi-ruta/empezar" className="inline-flex rounded-full border border-rosa-mexicano/30 bg-white/80 px-5 py-2.5 text-sm font-semibold text-dark-text hover:bg-white">Editar perfil</Link>
        </div>
      </section>
      <section className="min-w-0 rounded-[2rem] border border-dark-text/8 bg-white/85 p-7 shadow-[0_18px_50px_rgba(43,30,36,0.07)] sm:p-10" aria-labelledby="progress-heading">
        <h2 id="progress-heading" className="font-display text-2xl font-semibold text-dark-text">Tu avance</h2>
        <p className="mt-5 font-display text-4xl font-semibold">{percent}%</p>
        <p className="mt-2 text-dark-text/70">{completed} de {tasks.length} pasos de tu ruta completados</p>
        <div className="mt-6 h-3 overflow-hidden rounded-full bg-peach-fuzz" role="progressbar" aria-label="Progreso de tareas" aria-valuenow={completed} aria-valuemin={0} aria-valuemax={tasks.length} aria-valuetext={`${percent}% completado`}>
          <div className="h-full rounded-full bg-rosa-mexicano transition-all" style={{ width: `${percent}%` }} />
        </div>
        <p className="mt-6 text-sm leading-6 text-dark-text/70">El porcentaje se calcula con los pasos que aplican a tu perfil actual.</p>
      </section>
    </div>

    {saveError && <p role="alert" className="mt-6 rounded-2xl bg-butter/80 p-4 text-sm">{saveError}</p>}

    <section className="mt-8 rounded-[2rem] border border-dark-text/8 bg-butter/55 p-7 shadow-[0_18px_50px_rgba(43,30,36,0.06)] sm:p-9" aria-labelledby="next-steps-heading">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rosa-mexicano">Para seguir avanzando</p>
      <h2 id="next-steps-heading" className="mt-2 font-display text-2xl font-semibold text-dark-text sm:text-3xl">Tus próximos pasos</h2>
      <p className="mt-3 text-sm leading-6 text-dark-text/75">Estos son los siguientes pasos pendientes según tu ruta y prioridad actuales.</p>
      {nextSteps.length ? (
        <ol className="mt-6 grid gap-4 lg:grid-cols-3">
          {nextSteps.map((task, index) => (
            <li key={task.id} className="flex min-w-0 flex-col rounded-2xl border border-dark-text/8 bg-white/85 p-5 shadow-[0_10px_30px_rgba(43,30,36,0.05)]">
              <p className="text-sm font-semibold text-rosa-mexicano">Paso {index + 1} · {stages.find((stage) => stage.id === task.stageId)?.title}</p>
              <h3 className="mt-3 font-display text-lg font-semibold text-dark-text">{task.title}</h3>
              <div className="mt-auto pt-5">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-antique-white px-3 py-2.5 text-sm font-medium text-dark-text">
                  <input type="checkbox" checked={false} onChange={() => toggleTask(task.id, data)} className="h-5 w-5 shrink-0 accent-rosa-mexicano" />
                  <span>Marcar como completado<span className="sr-only">: {task.title}</span></span>
                </label>
                <Link href={task.href} className="mt-4 inline-flex text-sm font-semibold text-rosa-mexicano hover:underline">Explorar recurso →</Link>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-6 rounded-2xl bg-white/85 p-5 leading-7 text-dark-text/75">Completaste todos los pasos de tu ruta actual. Puedes revisar tus metas en <Link href="/mi-ruta/empezar" className="font-semibold text-rosa-mexicano underline underline-offset-2">Editar perfil</Link> o seguir organizando tus aplicaciones.</p>
      )}
    </section>

    <ApplicationsSummary />

    <section className="mt-12" aria-labelledby="roadmap-heading">
      <h2 id="roadmap-heading" className="font-display text-3xl font-semibold">Tu ruta por etapas</h2>
      <p className="mt-3 text-dark-text/70">Marca solo lo que realmente hayas completado. Las tareas condicionales pueden no aplicar a tu caso.</p>
      <div className="mt-7 grid gap-6 lg:grid-cols-2">
        {stages.map((stage, index) => <section key={stage.id} className="rounded-[2rem] border border-dark-text/8 bg-white/85 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.06)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rosa-mexicano">Etapa {index + 1}</p>
          <h3 className="mt-2 font-display text-xl font-semibold">{stage.title}</h3>
          <div className="mt-5 space-y-3">{stage.tasks.map((task) => <label key={task.id} className="flex cursor-pointer items-start gap-3 rounded-2xl bg-antique-white/65 p-3 text-sm leading-6">
            <input type="checkbox" checked={completedTaskIds.includes(task.id)} onChange={() => toggleTask(task.id, data)} className="mt-1 h-4 w-4 shrink-0 accent-rosa-mexicano" />
            <span className={completedTaskIds.includes(task.id) ? "text-dark-text/70 line-through" : "text-dark-text"}>{task.title}</span>
          </label>)}</div>
        </section>)}
      </div>
    </section>

    <div className="mt-12 grid gap-6 lg:grid-cols-2">
      <section className="rounded-[2rem] bg-peach-fuzz/55 p-7 sm:p-9">
        <h2 className="font-display text-2xl font-semibold">Guías para tu momento</h2>
        <div className="mt-5 space-y-3">{guides.length ? guides.map((guide) => <Link key={guide.slug} href={`/guias/${guide.slug}`} className="block rounded-2xl bg-white/80 p-4 hover:bg-white"><span className="font-semibold">{guide.title}</span><span className="mt-1 block text-sm text-dark-text/65">{guide.category} · {guide.readingTime}</span></Link>) : <p className="text-dark-text/70">Explora todas las guías disponibles mientras ampliamos el contenido para tu perfil.</p>}</div>
        <Link href="/guias" className="mt-5 inline-block text-sm font-semibold text-rosa-mexicano hover:underline">Ver todas las guías →</Link>
      </section>
      <section className="rounded-[2rem] bg-white/85 p-7 shadow-[0_18px_50px_rgba(43,30,36,0.06)] sm:p-9">
        <h2 className="font-display text-2xl font-semibold">Recursos útiles</h2>
        <div className="mt-5 space-y-3">{resources.map((resource) => <Link key={resource.href} href={resource.href} className="block rounded-2xl bg-antique-white/70 p-4 hover:bg-peach-fuzz/55"><span className="font-semibold">{resource.title}</span><span className="mt-1 block text-sm leading-6 text-dark-text/65">{resource.description}</span></Link>)}</div>
      </section>
    </div>

    <section aria-labelledby="backup-heading" className="mt-12 flex flex-col gap-5 rounded-[2rem] border border-rosa-mexicano/12 bg-peach-fuzz/55 p-7 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-2xl">
        <h2 id="backup-heading" className="font-display text-2xl font-semibold text-dark-text">Conserva una copia de tu avance</h2>
        <p className="mt-3 text-sm leading-6 text-dark-text/75">Tu ruta y tus aplicaciones se guardan en este navegador y dispositivo. Si borras sus datos, puedes perder tu progreso; descarga un respaldo en Mis Datos.</p>
      </div>
      <Link href="/mi-ruta/mis-datos" className="inline-flex shrink-0 items-center justify-center rounded-full bg-rosa-mexicano px-6 py-3 font-semibold text-white hover:bg-[#8d2048]">Ir a Mis Datos <span aria-hidden="true" className="ml-2">→</span></Link>
    </section>
  </main>;
}
