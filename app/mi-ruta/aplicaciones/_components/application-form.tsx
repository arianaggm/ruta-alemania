"use client";

import { useState } from "react";
import {
  emptyDraft,
  levelLabels,
  validateDraft,
  type ApplicationDraft,
  type UniversityApplication,
} from "../_lib/model";

type Props = {
  application: UniversityApplication | null;
  onSave: (draft: ApplicationDraft) => boolean;
  onCancel: () => void;
};

const fieldClass = "w-full rounded-2xl border border-dark-text/15 bg-white px-4 py-3 text-dark-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosa-mexicano";

function draftFromApplication(application: UniversityApplication | null): ApplicationDraft {
  if (!application) return { ...emptyDraft };
  const { universityName, programName, studyLevel, city, officialProgramUrl, applicationPortalUrl, intakeSemester, intakeYear, deadline, notes } = application;
  return { universityName, programName, studyLevel, city, officialProgramUrl, applicationPortalUrl, intakeSemester, intakeYear, deadline, notes };
}

export function ApplicationForm({ application, onSave, onCancel }: Props) {
  const [draft, setDraft] = useState<ApplicationDraft>(() => draftFromApplication(application));
  const [error, setError] = useState("");

  function update<K extends keyof ApplicationDraft>(key: K, value: ApplicationDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validationError = validateDraft(draft);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (!onSave(draft)) setError("No se pudieron guardar los cambios. Revisa el mensaje de la página e inténtalo de nuevo.");
  }

  return <section id="application-form" className="mt-8 scroll-mt-28 rounded-[2rem] border border-rosa-mexicano/15 bg-peach-fuzz/50 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.07)] sm:p-8" aria-labelledby="application-form-title">
    <h2 id="application-form-title" tabIndex={-1} className="scroll-mt-28 font-display text-2xl font-semibold focus:outline-2 focus:outline-offset-2 focus:outline-rosa-mexicano">{application ? "Editar aplicación" : "Agregar programa"}</h2>
    <p className="mt-2 text-sm leading-6 text-dark-text/70">Guarda tus propios datos. Confirma requisitos y fechas en la página oficial del programa.</p>
    <form onSubmit={submit} className="mt-6 grid gap-5 sm:grid-cols-2">
      <label className="grid gap-2 text-sm font-semibold">Universidad <span className="text-rosa-mexicano">*</span>
        <input className={fieldClass} required maxLength={160} autoComplete="organization" value={draft.universityName} onChange={(event) => update("universityName", event.target.value)} />
      </label>
      <label className="grid gap-2 text-sm font-semibold">Programa <span className="text-rosa-mexicano">*</span>
        <input className={fieldClass} required maxLength={180} value={draft.programName} onChange={(event) => update("programName", event.target.value)} />
      </label>
      <label className="grid gap-2 text-sm font-semibold">Nivel de estudios
        <select className={fieldClass} value={draft.studyLevel} onChange={(event) => update("studyLevel", event.target.value as ApplicationDraft["studyLevel"])}>
          {Object.entries(levelLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold">Ciudad (opcional)
        <input className={fieldClass} maxLength={120} value={draft.city} onChange={(event) => update("city", event.target.value)} />
      </label>
      <label className="grid gap-2 text-sm font-semibold">Enlace oficial del programa (opcional)
        <input className={fieldClass} type="url" inputMode="url" placeholder="https://..." value={draft.officialProgramUrl} onChange={(event) => update("officialProgramUrl", event.target.value)} />
      </label>
      <label className="grid gap-2 text-sm font-semibold">Portal de solicitud (opcional)
        <input className={fieldClass} type="url" inputMode="url" placeholder="https://..." value={draft.applicationPortalUrl} onChange={(event) => update("applicationPortalUrl", event.target.value)} />
      </label>
      <label className="grid gap-2 text-sm font-semibold">Semestre de inicio (opcional)
        <select className={fieldClass} value={draft.intakeSemester} onChange={(event) => {
          const semester = event.target.value as ApplicationDraft["intakeSemester"];
          setDraft((current) => ({ ...current, intakeSemester: semester, intakeYear: semester ? current.intakeYear : null }));
          setError("");
        }}>
          <option value="">Sin definir</option><option value="winter">Invierno</option><option value="summer">Verano</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold">Año de inicio {draft.intakeSemester ? "" : "(elige un semestre primero)"}
        <input className={fieldClass} type="number" min={2020} max={2100} inputMode="numeric" disabled={!draft.intakeSemester} required={Boolean(draft.intakeSemester)} value={draft.intakeYear ?? ""} onChange={(event) => update("intakeYear", event.target.value ? Number(event.target.value) : null)} />
      </label>
      <label className="grid gap-2 text-sm font-semibold">Fecha límite que anotaste (opcional)
        <input className={fieldClass} type="date" value={draft.deadline} onChange={(event) => update("deadline", event.target.value)} />
      </label>
      <label className="grid gap-2 text-sm font-semibold sm:col-span-2">Notas personales (opcional)
        <textarea className={fieldClass} rows={4} maxLength={5000} value={draft.notes} onChange={(event) => update("notes", event.target.value)} />
      </label>
      {error && <p role="alert" className="rounded-2xl bg-butter/80 p-4 text-sm sm:col-span-2">{error}</p>}
      <div className="flex flex-wrap gap-3 sm:col-span-2">
        <button type="submit" className="rounded-full bg-rosa-mexicano px-6 py-3 font-semibold text-white hover:bg-rosa-mexicano/90">{application ? "Guardar cambios" : "Guardar programa"}</button>
        <button type="button" onClick={onCancel} className="rounded-full border border-rosa-mexicano/25 bg-white px-6 py-3 font-semibold text-dark-text hover:bg-peach-fuzz">Cancelar</button>
      </div>
    </form>
  </section>;
}
