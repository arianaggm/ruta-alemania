"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandName } from "../../_components/brand-name";
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
import styles from "../mi-bej.module.css";

export function RouteDashboard() {
  const [loaded, setLoaded] = useState<LoadResult | null>(null);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    let active = true;
    void readInitialState<LoadResult>(loadSavedRoute, { status: "unavailable" }).then((result) => {
      if (active) setLoaded(result);
    });
    return () => { active = false; };
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

  if (!loaded) return <main className={styles.main}><p role="status">Cargando Mi bej…</p></main>;

  if (loaded.status !== "ready") {
    return <main className={styles.main}>
      <div className={styles.emptyPanel}>
        <p className={styles.eyebrow}>TU ESPACIO PERSONAL</p>
        <h1>Tu camino empieza aquí.</h1>
        <p>{loaded.status === "empty"
          ? "Cuéntanos en qué punto estás y organizaremos pasos y recursos para ti."
          : loaded.status === "invalid"
            ? <>No pudimos leer los datos guardados de Mi <BrandName />. No hemos borrado nada; puedes crear un plan nuevo cuando quieras.</>
            : "El almacenamiento de este navegador no está disponible. Puedes revisar el formulario, pero necesitarás habilitarlo para guardar tu avance."}</p>
        <div className={styles.emptyActions}>
          <Link href="/mi-ruta/empezar" className={styles.primaryLink}>{loaded.status === "empty" ? "Crear mi bej" : "Ir al formulario"}</Link>
          <Link href="/mi-ruta/aplicaciones" className={styles.secondaryLink}>Mis aplicaciones</Link>
        </div>
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

  return <main className={styles.main}>
    <Link href="/" className={styles.backLink}>← Volver al inicio</Link>

    <header className={styles.hero}>
      <div className={styles.introRule} aria-hidden="true" />
      <p className={styles.eyebrow}>TU ESPACIO PERSONAL</p>
      <h1>Cada paso <em>cuenta.</em></h1>
      <p className={styles.lead}>Organiza tus metas, descubre qué sigue y avanza a tu propio ritmo.</p>
    </header>

    <div className={styles.overview}>
      <section className={styles.goalPanel} aria-labelledby="study-goal-heading">
        <p className={styles.eyebrow}>MI RECORRIDO</p>
        <h2 id="study-goal-heading">Tu plan de {levelLabels[preferences.studyLevel].toLocaleLowerCase("es")} en Alemania</h2>
        <p className={styles.goalSummary}>Una vista de tus metas actuales. Los requisitos de cada programa siempre deben confirmarse en su fuente oficial.</p>
        <dl className={styles.goalGrid}>
          {[
            ["Nivel", levelLabels[preferences.studyLevel]],
            ["Idioma", languageLabels[preferences.studyLanguage]],
            ["Etapa actual", stageLabels[preferences.stage]],
            ["Inicio previsto", start],
          ].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
        <div className={styles.goalFooter}>
          <p>Prioridad: <strong>{priorityLabels[preferences.priority]}</strong></p>
          <Link href="/mi-ruta/empezar" className={styles.textLink}>Editar perfil ↗</Link>
        </div>
      </section>
      <section className={styles.progressPanel} aria-labelledby="progress-heading">
        <h2 id="progress-heading">Tu avance</h2>
        <p className={styles.progressNumber}>{percent}%</p>
        <p className={styles.progressCopy}>{completed} de {tasks.length} pasos completados</p>
        <div className={styles.progressTrack} role="progressbar" aria-label="Progreso de tareas" aria-valuenow={completed} aria-valuemin={0} aria-valuemax={tasks.length} aria-valuetext={`${percent}% completado`}>
          <div className={styles.progressFill} style={{ width: `${percent}%` }} />
        </div>
        <p className={styles.progressNote}>El porcentaje considera solo los pasos que aplican a tu perfil actual.</p>
      </section>
    </div>

    {saveError && <p role="alert" className={styles.error}>{saveError}</p>}

    <section className={styles.nextSection} aria-labelledby="next-steps-heading">
      <p className={styles.eyebrow}>LO QUE SIGUE</p>
      <h2 id="next-steps-heading">Tus próximos pasos</h2>
      <p className={styles.nextIntro}>Tres tareas pendientes elegidas según tu etapa y prioridad actuales.</p>
      {nextSteps.length ? <ol className={styles.nextList}>
        {nextSteps.map((task, index) => <li key={task.id} className={styles.nextItem}>
          <p className={styles.nextMeta}>PASO {index + 1} / {stages.find((stage) => stage.id === task.stageId)?.title}</p>
          <h3>{task.title}</h3>
          <div className={styles.nextItemFooter}>
            <label className={styles.taskLabel}>
              <input type="checkbox" checked={false} onChange={() => toggleTask(task.id, data)} />
              <span>Marcar como completado<span className="sr-only">: {task.title}</span></span>
            </label>
            <Link href={task.href} className={styles.taskResource}>Explorar recurso →</Link>
          </div>
        </li>)}
      </ol> : <p className={styles.completeMessage}>Completaste todos los pasos de tu plan actual. Puedes <Link href="/mi-ruta/empezar" className={styles.textLink}>editar tu perfil</Link> o seguir organizando tus aplicaciones.</p>}
    </section>

    <ApplicationsSummary />

    <section className={styles.section} aria-labelledby="roadmap-heading">
      <div className={styles.sectionHead}>
        <div><p className={styles.eyebrow}>MIS TAREAS</p><h2 id="roadmap-heading">Tu camino por etapas.</h2></div>
        <p>Marca solo lo que hayas completado. Algunas tareas pueden no aplicar a tu caso.</p>
      </div>
      <div className={styles.stageGrid}>
        {stages.map((stage, index) => <section key={stage.id} className={styles.stageCard}>
          <p className={styles.stageNumber}>Etapa {index + 1}</p>
          <h3>{stage.title}</h3>
          <div className={styles.stageTasks}>{stage.tasks.map((task) => <label key={task.id} className={styles.taskLabel}>
            <input type="checkbox" checked={completedTaskIds.includes(task.id)} onChange={() => toggleTask(task.id, data)} />
            <span className={completedTaskIds.includes(task.id) ? styles.taskDone : undefined}>{task.title}</span>
          </label>)}</div>
        </section>)}
      </div>
    </section>

    <div className={styles.resourceGrid}>
      <section className={styles.resourcePanel}>
        <p className={styles.eyebrow}>PARA LEER</p>
        <h2>Guías para tu momento</h2>
        <div className={styles.resourceLinks}>{guides.length ? guides.map((guide) => <Link key={guide.slug} href={`/guias/${guide.slug}`}>
          <strong>{guide.title}</strong><span>{guide.category} · {guide.readingTime}</span>
        </Link>) : <p>Explora todas las guías disponibles mientras ampliamos el contenido para tu perfil.</p>}</div>
        <Link href="/guias" className={styles.textLink}>Ver todas las guías →</Link>
      </section>
      <section className={styles.resourcePanel}>
        <p className={styles.eyebrow}>PARA INVESTIGAR</p>
        <h2>Recursos útiles</h2>
        <div className={styles.resourceLinks}>{resources.map((resource) => <Link key={resource.href} href={resource.href}>
          <strong>{resource.title}</strong><span>{resource.description}</span>
        </Link>)}</div>
      </section>
    </div>

    <section aria-labelledby="backup-heading" className={styles.backupPanel}>
      <div>
        <p className={styles.eyebrow}>MIS DATOS</p>
        <h2 id="backup-heading">Conserva una copia de tu avance.</h2>
        <p>Tu plan y tus aplicaciones se guardan en este navegador y dispositivo. Si borras sus datos, puedes perder tu progreso; descarga un respaldo en Mis datos.</p>
      </div>
      <Link href="/mi-ruta/mis-datos" className={styles.primaryLink}>Ir a Mis datos →</Link>
    </section>
  </main>;
}
