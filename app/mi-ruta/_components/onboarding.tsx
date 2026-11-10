"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { readInitialState } from "../_lib/initial-load";
import type { StudentPreferences } from "../_lib/roadmap";
import { loadSavedRoute, saveEditedProfile, type LoadResult, type SavedRoute } from "../_lib/storage";

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

const inputClass = "rounded-2xl border border-dark-text/15 bg-white px-4 py-3 text-dark-text accent-rosa-mexicano focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosa-mexicano";

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
        setError("No pudimos leer tu ruta guardada. Tus datos anteriores no se borrarán hasta que guardes una nueva ruta.");
      } else if (result.status === "unavailable") {
        setError("El almacenamiento del navegador no está disponible. Podrás explorar el formulario, pero no guardar tu ruta.");
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
        : "No se pudo guardar tu ruta en este navegador. Comprueba que el almacenamiento local esté habilitado e inténtalo de nuevo.");
      return;
    }
    setSaved(result.data);
    router.push("/mi-ruta");
  }

  return (
    <main className="px-4 pb-20 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/mi-ruta" className="text-sm font-semibold text-rosa-mexicano hover:underline">← Volver a Mi Ruta</Link>
        <div className="mt-8 rounded-[2rem] border border-rosa-mexicano/12 bg-white/85 p-6 shadow-[0_22px_70px_rgba(43,30,36,0.08)] sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rosa-mexicano">Mi Ruta · Paso {step + 1} de {steps.length}</p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-dark-text sm:text-4xl">{saved ? "Actualiza tu ruta" : "Empecemos por tus metas"}</h1>
          <p className="mt-3 leading-7 text-dark-text/70">Responde cinco preguntas para ordenar tus próximos pasos. Puedes cambiar tus respuestas después.</p>
          <div className="mt-7 h-2 overflow-hidden rounded-full bg-peach-fuzz" role="progressbar" aria-label="Progreso del formulario" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={steps.length}>
            <div className="h-full rounded-full bg-rosa-mexicano transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>
          <form className="mt-9" onSubmit={(event) => { event.preventDefault(); next(); }}>
            <fieldset className="grid gap-3">
              <legend className="mb-5 font-display text-xl font-semibold text-dark-text">{steps[step]}</legend>
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
                <p className="text-sm text-dark-text/70">Selecciona un semestre aproximado. No usamos esta fecha para inventar convocatorias.</p>
                {([ ["winter", "Semestre de invierno"], ["summer", "Semestre de verano"], ["undecided", "Aún no lo sé"] ] as const).map(([value, label]) => <Choice key={value} name="semestre" value={value} label={label} checked={answers.startSemester === value} onChange={() => { update("startSemester", value); if (value === "undecided") update("startYear", null); }} />)}
                {answers.startSemester !== "undecided" && <label className="mt-3 grid gap-2 text-sm font-semibold">Año previsto<input className={inputClass} type="number" inputMode="numeric" min={2020} max={2100} required value={answers.startYear ?? ""} onChange={(event) => update("startYear", event.target.value === "" ? null : Number(event.target.value))} /></label>}
              </>}
              {step === 4 && ([
                ["program", "Encontrar un programa"], ["funding", "Financiamiento"], ["applications", "Solicitudes"], ["relocation", "Mudanza"], ["settling", "Instalarme en Alemania"],
              ] as const).map(([value, label]) => <Choice key={value} name="prioridad" value={value} label={label} checked={answers.priority === value} onChange={() => update("priority", value)} />)}
            </fieldset>
            {error && <p role="alert" className="mt-5 rounded-2xl bg-butter/70 p-4 text-sm text-dark-text">{error}</p>}
            <div className="mt-9 flex flex-wrap gap-3">
              {step > 0 && <button type="button" onClick={() => { setError(""); setStep(step - 1); }} className="rounded-full border border-rosa-mexicano/25 px-6 py-3 font-semibold text-dark-text hover:bg-peach-fuzz">Anterior</button>}
              <button type="submit" disabled={!loaded} className="rounded-full bg-rosa-mexicano px-7 py-3 font-semibold text-white shadow-sm hover:bg-rosa-mexicano/90 disabled:cursor-not-allowed disabled:opacity-50">{step === steps.length - 1 ? "Guardar Mi Ruta" : "Continuar"}</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

function Choice({ name, value, label, checked, onChange }: { name: string; value: string; label: string; checked: boolean; onChange: () => void }) {
  return <label className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-4 text-sm font-medium ${checked ? "border-rosa-mexicano bg-peach-fuzz/60" : "border-dark-text/10 bg-antique-white/40"}`}>
    <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="h-4 w-4 accent-rosa-mexicano" />{label}
  </label>;
}
