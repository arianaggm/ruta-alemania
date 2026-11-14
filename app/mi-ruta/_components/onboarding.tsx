"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandName } from "../../_components/brand-name";
import { readInitialState } from "../_lib/initial-load";
import type { StudentPreferences } from "../_lib/roadmap";
import { loadSavedRoute, saveEditedProfile, type LoadResult, type SavedRoute } from "../_lib/storage";
import styles from "../mi-bej.module.css";

const initialAnswers: StudentPreferences = {
  studyLevel: "master",
  studyLanguage: "undecided",
  stage: "exploring",
  startSemester: "undecided",
  startYear: null,
  priority: "program",
};

const steps = [
  "Nivel de estudios",
  "Idioma",
  "Etapa actual",
  "Inicio previsto",
  "Prioridad",
];

export function Onboarding() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [saved, setSaved] = useState<SavedRoute | null>(null);
  const [answers, setAnswers] = useState<StudentPreferences>(initialAnswers);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    void readInitialState<LoadResult>(loadSavedRoute, { status: "unavailable" }).then((result) => {
      if (!active) return;
      if (result.status === "ready") {
        setSaved(result.data);
        setAnswers(result.data.preferences);
      } else if (result.status === "invalid") {
        setError("No pudimos leer tu plan guardado. Tus datos anteriores no se borrarán hasta que guardes uno nuevo.");
      } else if (result.status === "unavailable") {
        setError("El almacenamiento del navegador no está disponible. Podrás explorar el formulario, pero no guardar tu plan.");
      }
      setLoaded(true);
    });
    return () => {
      active = false;
    };
  }, []);

  function update<K extends keyof StudentPreferences>(key: K, value: StudentPreferences[K]) {
    setAnswers((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function next() {
    if (step === 3 && answers.startSemester !== "undecided" && (!answers.startYear || answers.startYear < 2020 || answers.startYear > 2100)) {
      setError("Escribe un año de cuatro cifras entre 2020 y 2100, o elige «Aún no lo sé».");
      return;
    }
    setError("");
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }
    const result = saveEditedProfile(answers, saved);
    if (result.status !== "saved") {
      setError(result.status === "invalid"
        ? "Los datos guardados cambiaron y no pudimos leerlos. No sobrescribimos tu avance; recarga la página antes de intentarlo de nuevo."
        : "No se pudo guardar tu plan en este navegador. Comprueba que el almacenamiento local esté habilitado e inténtalo de nuevo.");
      return;
    }
    setSaved(result.data);
    router.push("/mi-ruta");
  }

  return (
    <main className={styles.onboardingMain}>
      <Link href="/mi-ruta" className={styles.backLink}>← Volver a Mi bej</Link>
      <header className={styles.onboardingIntro}>
        <div className={styles.introRule} aria-hidden="true" />
        <p className={styles.eyebrow}>{saved ? "AJUSTA TUS METAS" : "TU CAMINO EMPIEZA AQUÍ"}</p>
        <h1>{saved ? <>Actualiza tu <BrandName context="heading" />.</> : "Comencemos tu camino."}</h1>
        <p>Responde cinco preguntas para ordenar tus próximos pasos. Puedes cambiar tus respuestas después.</p>
      </header>
      <div className={styles.formPanel}>
        <div className={styles.stepHeader} aria-live="polite"><span>Paso {step + 1} de {steps.length}</span><span>{steps[step]}</span></div>
        <div className={styles.stepTrack} role="progressbar" aria-label="Progreso del formulario" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={steps.length}>
          <div className={styles.stepFill} style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
        <form onSubmit={(event) => { event.preventDefault(); next(); }}>
          <fieldset className={styles.question}>
            <legend>{steps[step]}</legend>
            <div className={styles.choices}>
              {step === 0 && ([
                ["bachelor", "Licenciatura"], ["master", "Maestría"], ["phd", "Doctorado"],
              ] as const).map(([value, label]) => <Choice key={value} name="nivel" value={value} label={label} checked={answers.studyLevel === value} onChange={() => update("studyLevel", value)} />)}
              {step === 1 && ([
                ["english", "Inglés"], ["german", "Alemán"], ["either", "Cualquiera de los dos"], ["undecided", "Aún no lo sé"],
              ] as const).map(([value, label]) => <Choice key={value} name="idioma" value={value} label={label} checked={answers.studyLanguage === value} onChange={() => update("studyLanguage", value)} />)}
              {step === 2 && ([
                ["exploring", "Estoy explorando opciones"], ["applying", "Estoy preparando solicitudes"], ["accepted", "Ya tengo admisión"], ["inGermany", "Ya estoy en Alemania"],
              ] as const).map(([value, label]) => <Choice key={value} name="etapa" value={value} label={label} checked={answers.stage === value} onChange={() => update("stage", value)} />)}
              {step === 3 && <>
                <p>Selecciona un semestre aproximado. No usamos esta fecha para inventar convocatorias.</p>
                {([ ["winter", "Semestre de invierno"], ["summer", "Semestre de verano"], ["undecided", "Aún no lo sé"] ] as const).map(([value, label]) => <Choice key={value} name="semestre" value={value} label={label} checked={answers.startSemester === value} onChange={() => { update("startSemester", value); if (value === "undecided") update("startYear", null); }} />)}
                {answers.startSemester !== "undecided" && <label className={styles.yearField}>Año previsto<input type="number" inputMode="numeric" min={2020} max={2100} required value={answers.startYear ?? ""} onChange={(event) => update("startYear", event.target.value === "" ? null : Number(event.target.value))} /></label>}
              </>}
              {step === 4 && ([
                ["program", "Encontrar un programa"], ["funding", "Financiamiento"], ["applications", "Solicitudes"], ["relocation", "Mudanza"], ["settling", "Instalarme en Alemania"],
              ] as const).map(([value, label]) => <Choice key={value} name="prioridad" value={value} label={label} checked={answers.priority === value} onChange={() => update("priority", value)} />)}
            </div>
          </fieldset>
          {error && <p role="alert" className={styles.error}>{error}</p>}
          {!loaded && <p role="status">Cargando tus respuestas…</p>}
          <div className={styles.formActions}>
            {step > 0 && <button type="button" onClick={() => { setError(""); setStep(step - 1); }} className={styles.secondaryButton}>Anterior</button>}
            <button type="submit" disabled={!loaded} className={styles.primaryButton}>{step === steps.length - 1 ? "Guardar mi bej" : "Continuar"}</button>
          </div>
        </form>
      </div>
    </main>
  );
}

function Choice({ name, value, label, checked, onChange }: { name: string; value: string; label: string; checked: boolean; onChange: () => void }) {
  return <label className={`${styles.choice} ${checked ? styles.choiceChecked : ""}`}>
    <input type="radio" name={name} value={value} checked={checked} onChange={onChange} />{label}
  </label>;
}
