"use client";

import { useState } from "react";
import {
  applicationStatuses,
  levelLabels,
  statusLabels,
  type ApplicationStatus,
  type UniversityApplication,
} from "../_lib/model";

const statusStyles: Record<ApplicationStatus, string> = {
  saved: "bg-antique-white border-dark-text/15",
  preparing: "bg-butter/70 border-dark-text/15",
  ready: "bg-peach-fuzz border-rosa-mexicano/25",
  submitted: "bg-rosa-mexicano/10 border-rosa-mexicano/30",
  review: "bg-butter border-rosa-mexicano/25",
  accepted: "bg-emerald-100 border-emerald-600/30",
  rejected: "bg-stone-200 border-stone-500/30",
  waitlisted: "bg-sky-100 border-sky-600/30",
};

type Props = {
  application: UniversityApplication;
  onEdit: (trigger: HTMLButtonElement) => void;
  onDelete: (confirmed: boolean) => boolean;
  onStatus: (status: ApplicationStatus) => void;
  onAddDocument: (name: string) => boolean;
  onRenameDocument: (id: string, name: string) => boolean;
  onToggleDocument: (id: string) => void;
  onRemoveDocument: (id: string) => void;
};

function displayDate(value: string) {
  return new Intl.DateTimeFormat("es", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}

export function ApplicationCard({ application, onEdit, onDelete, onStatus, onAddDocument, onRenameDocument, onToggleDocument, onRemoveDocument }: Props) {
  const [newDocument, setNewDocument] = useState("");
  const [documentError, setDocumentError] = useState("");
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const completed = application.documents.filter((document) => document.completed).length;

  function add(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newDocument.trim()) {
      setDocumentError("Escribe un nombre para el documento.");
      return;
    }
    if (onAddDocument(newDocument)) {
      setNewDocument("");
      setDocumentError("");
    } else {
      setDocumentError("No se pudo agregar el documento. Revisa si ya existe.");
    }
  }

  return <article className="rounded-[2rem] border border-dark-text/8 bg-white/85 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.07)] sm:p-8">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-rosa-mexicano">{application.universityName}</p>
        <h3 className="mt-2 font-display text-xl font-semibold text-dark-text">{application.programName}</h3>
      </div>
      <span className={`rounded-full border px-3 py-1.5 text-xs font-semibold text-dark-text ${statusStyles[application.status]}`}>{statusLabels[application.status]}</span>
    </div>
    <div className="mt-5 flex flex-wrap gap-2 text-sm text-dark-text/75">
      <span className="rounded-full bg-antique-white px-3 py-1">{levelLabels[application.studyLevel]}</span>
      {application.city && <span className="rounded-full bg-antique-white px-3 py-1">{application.city}</span>}
      {application.intakeSemester && <span className="rounded-full bg-antique-white px-3 py-1">Inicio: {application.intakeSemester === "winter" ? "invierno" : "verano"} {application.intakeYear}</span>}
    </div>
    <p className="mt-5 text-sm font-medium text-dark-text">{application.deadline ? `Fecha límite anotada: ${displayDate(application.deadline)}` : "Sin fecha límite anotada"}</p>
    {application.deadline && <p className="mt-1 text-xs text-dark-text/70">Fecha ingresada por ti; no está verificada por Ruta Alemania.</p>}
    <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold">
      {application.officialProgramUrl && <a href={application.officialProgramUrl} target="_blank" rel="noopener noreferrer" className="text-rosa-mexicano hover:underline">Página del programa ↗</a>}
      {application.applicationPortalUrl && <a href={application.applicationPortalUrl} target="_blank" rel="noopener noreferrer" className="text-rosa-mexicano hover:underline">Portal de solicitud ↗</a>}
    </div>
    {application.notes && <p className="mt-5 whitespace-pre-wrap rounded-2xl bg-antique-white/70 p-4 text-sm leading-6 text-dark-text/75">{application.notes}</p>}
    <div className="mt-6 flex flex-wrap items-end gap-3">
      <label className="grid min-w-48 flex-1 gap-2 text-sm font-semibold">Estado
        <select value={application.status} onChange={(event) => onStatus(event.target.value as ApplicationStatus)} className="rounded-2xl border border-dark-text/15 bg-white px-4 py-2.5 focus-visible:outline-2 focus-visible:outline-rosa-mexicano">
          {applicationStatuses.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}
        </select>
      </label>
      <button type="button" onClick={(event) => onEdit(event.currentTarget)} className="rounded-full border border-rosa-mexicano/25 px-5 py-2.5 text-sm font-semibold hover:bg-peach-fuzz">Editar</button>
      <button type="button" onClick={() => setConfirmingDelete(true)} aria-expanded={confirmingDelete} className="rounded-full border border-dark-text/20 px-5 py-2.5 text-sm font-semibold hover:bg-antique-white">Eliminar</button>
    </div>
    {confirmingDelete && <div role="group" aria-label={`Confirmar eliminación de ${application.programName}`} className="mt-4 rounded-2xl border border-rosa-mexicano/20 bg-antique-white p-4">
      <p className="text-sm font-semibold">¿Eliminar «{application.programName}»? Esta acción no se puede deshacer.</p>
      <div className="mt-3 flex flex-wrap gap-3">
        <button type="button" onClick={() => { onDelete(false); setConfirmingDelete(false); }} className="rounded-full border border-dark-text/20 bg-white px-4 py-2 text-sm font-semibold">Cancelar</button>
        <button type="button" onClick={() => { if (onDelete(true)) setConfirmingDelete(false); }} className="rounded-full bg-rosa-mexicano px-4 py-2 text-sm font-semibold text-white">Sí, eliminar</button>
      </div>
    </div>}
    <details className="mt-6 rounded-2xl bg-peach-fuzz/40 p-4 open:bg-peach-fuzz/55">
      <summary className="cursor-pointer font-semibold">Documentos ({completed} de {application.documents.length})</summary>
      <p className="mt-3 text-sm leading-6 text-dark-text/70">Estos son solo ejemplos. Confirma los requisitos reales en la página oficial de tu programa; puedes editar o quitar cualquier documento.</p>
      <div className="mt-4 space-y-3">{application.documents.map((document) => <div key={document.id} className="rounded-2xl bg-white/85 p-3">
        <div className="flex items-center gap-3">
          <input type="checkbox" id={`${application.id}-${document.id}`} checked={document.completed} onChange={() => onToggleDocument(document.id)} className="h-4 w-4 shrink-0 accent-rosa-mexicano" aria-label={`Marcar ${document.name} como ${document.completed ? "pendiente" : "completo"}`} />
          <label htmlFor={`${application.id}-${document.id}`} className="text-sm font-medium">{document.name}</label>
        </div>
        <form onSubmit={(event) => {
          event.preventDefault();
          const name = new FormData(event.currentTarget).get("documentName");
          if (typeof name !== "string" || !onRenameDocument(document.id, name)) setDocumentError("No se pudo cambiar el nombre. Usa uno distinto y no vacío.");
          else setDocumentError("");
        }} className="mt-3 flex flex-wrap gap-2">
          <input key={document.name} name="documentName" defaultValue={document.name} aria-label={`Editar nombre de ${document.name}`} className="min-w-0 flex-1 rounded-xl border border-dark-text/15 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-rosa-mexicano" />
          <button type="submit" className="rounded-full border border-rosa-mexicano/25 px-3 py-2 text-xs font-semibold hover:bg-peach-fuzz">Guardar nombre</button>
          <button type="button" onClick={() => onRemoveDocument(document.id)} className="rounded-full border border-dark-text/15 px-3 py-2 text-xs font-semibold hover:bg-antique-white">Quitar</button>
        </form>
      </div>)}</div>
      <form onSubmit={add} className="mt-4 flex flex-wrap gap-2">
        <input value={newDocument} onChange={(event) => setNewDocument(event.target.value)} aria-label="Nombre del documento nuevo" placeholder="Otro documento" className="min-w-0 flex-1 rounded-xl border border-dark-text/15 bg-white px-4 py-2 text-sm focus-visible:outline-2 focus-visible:outline-rosa-mexicano" />
        <button type="submit" className="rounded-full bg-rosa-mexicano px-4 py-2 text-sm font-semibold text-white hover:bg-rosa-mexicano/90">Agregar documento</button>
      </form>
      {documentError && <p role="alert" className="mt-3 text-sm font-medium text-dark-text">{documentError}</p>}
    </details>
    <p className="mt-5 text-xs text-dark-text/70">Actualizada: {new Intl.DateTimeFormat("es", { dateStyle: "medium" }).format(new Date(application.updatedAt))}</p>
  </article>;
}
