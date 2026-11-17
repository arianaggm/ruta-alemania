"use client";

import { useRef, useState, type ReactNode } from "react";
import { BrandName } from "../../../_components/brand-name";
import {
  backupCount,
  createBackup,
  parseBackup,
  previewRestore,
  restoreBackup,
  validateBackupFile,
  type Backup,
  type DomainName,
  type Snapshot,
} from "../_lib/backup";
import { deleteLocalData } from "../_lib/delete-local-data";

const domains: { key: DomainName; label: string; unit: string }[] = [
  { key: "miRuta", label: "Mi bej", unit: "perfil" },
  { key: "aplicaciones", label: "Mis Aplicaciones", unit: "programas" },
  { key: "checklist", label: "Checklist", unit: "pasos marcados" },
];

type ImportPreview = { backup: Backup; snapshot: Snapshot; filename: string };

function stateLabel(domain: Backup["domains"][DomainName]): string {
  if (domain.state === "included") return "Incluida";
  if (domain.state === "missing") return "Sin datos guardados";
  return domain.reason === "unsupported" ? "Excluida: versión no compatible" : "Excluida: datos dañados o inválidos";
}

export function DataBackup() {
  const [exported, setExported] = useState<Backup | null>(null);
  const [preview, setPreview] = useState<ImportPreview | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [message, setMessage] = useState<ReactNode>(null);
  const [error, setError] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  function cancelDelete() {
    setDeleteOpen(false);
    setDeleteConfirmed(false);
    deleteButtonRef.current?.focus();
  }

  function removeLocalData() {
    if (!deleteConfirmed) return;
    let result: ReturnType<typeof deleteLocalData>;
    try {
      result = deleteLocalData(window.localStorage);
    } catch {
      setError("No se pudo acceder al almacenamiento de este navegador. No se confirmó la eliminación.");
      setMessage(null);
      return;
    }
    if (result.status === "error") {
      setExported(null);
      setPreview(null);
      setConfirmed(false);
      setError(result.message);
      setMessage(null);
      return;
    }
    setExported(null);
    setPreview(null);
    setConfirmed(false);
    setDeleteOpen(false);
    setDeleteConfirmed(false);
    setError("");
    setMessage(result.status === "empty"
      ? "No había datos de bej guardados en este navegador y dirección del sitio."
      : "Se eliminaron el perfil, las aplicaciones y el avance de la checklist de este navegador y dirección del sitio. Los respaldos descargados siguen en tu dispositivo.");
    deleteButtonRef.current?.focus();
  }

  function exportData() {
    setError("");
    try {
      const backup = createBackup(window.localStorage, new Date().toISOString());
      const blob = new Blob([JSON.stringify(backup)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ruta-alemania-respaldo-${backup.exportedAt.slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 0);
      setExported(backup);
      setMessage("Se descargó el respaldo. Revisa abajo qué se incluyó antes de guardarlo en un lugar seguro.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No pudimos crear el respaldo. Revisa el almacenamiento local y las descargas.");
    }
  }

  async function selectFile(file: File | undefined) {
    setPreview(null);
    setConfirmed(false);
    setMessage(null);
    setError("");
    if (!file) return;
    const fileError = validateBackupFile(file.name, file.type, file.size);
    if (fileError) {
      setError(fileError);
      return;
    }
    try {
      const parsed = parseBackup(await file.text());
      if (parsed.status !== "ready") {
        setError(parsed.message);
        return;
      }
      const snapshot = previewRestore(window.localStorage, parsed.backup);
      setPreview({ backup: parsed.backup, snapshot, filename: file.name });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No pudimos leer el archivo o los datos locales.");
    }
  }

  function restore() {
    if (!preview || !confirmed) return;
    const result = restoreBackup(window.localStorage, preview.backup, preview.snapshot);
    if (result.status === "error") {
      setError(result.message);
      setConfirmed(false);
      return;
    }
    setError("");
    setMessage(<>Respaldo restaurado. Abre Mi <BrandName />, Mis aplicaciones o la checklist para ver los datos recuperados.</>);
    setPreview(null);
    setConfirmed(false);
  }

  const included = preview && domains.some(({ key }) => preview.backup.domains[key].state === "included");

  return <div className="mt-8 space-y-8">
    <aside aria-label="Privacidad en dispositivos compartidos" className="rounded-[1.5rem] bg-butter/60 p-5 text-sm leading-6 text-dark-text/80 sm:p-6">
      <p>Lo que escribes en Mi bej se guarda en el navegador de este dispositivo, no en una cuenta. No se sincroniza con otros dispositivos y puede perderse si borras los datos del navegador. Otras personas que usen el mismo perfil del navegador podrían acceder a ello. Cada dirección del sitio, como localhost, 127.0.0.1 o una dirección de red local, tiene datos separados.</p>
      <p className="mt-3">En un equipo compartido, evita escribir notas sensibles. Los respaldos JSON no están cifrados y pueden permanecer en Descargas: expórtalos solo si es necesario y elimina tus datos locales al terminar. Borrar los datos del navegador no elimina los archivos que ya descargaste.</p>
    </aside>

    <section className="rounded-[2rem] border border-dark-text/8 bg-white/85 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.07)] sm:p-8" aria-labelledby="export-heading">
      <h2 id="export-heading" className="font-display text-2xl font-semibold">Descargar respaldo</h2>
      <p className="mt-3 text-sm leading-6 text-dark-text/70">Solo se incluyen datos que podemos validar. Los datos faltantes o dañados se señalan y no se agregan al archivo.</p>
      <button type="button" onClick={exportData} className="mt-5 rounded-full bg-rosa-mexicano px-6 py-3 font-semibold text-white hover:bg-rosa-mexicano/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosa-mexicano">Descargar JSON</button>
      {exported && <div className="mt-5 space-y-2 text-sm">{domains.map(({ key, label, unit }) => <p key={key}><span className="font-semibold">{label}:</span> {stateLabel(exported.domains[key])}{exported.domains[key].state === "included" ? ` · ${backupCount(key, exported)} ${unit}` : ""}</p>)}</div>}
    </section>

    <section className="rounded-[2rem] border border-dark-text/8 bg-white/85 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.07)] sm:p-8" aria-labelledby="import-heading">
      <h2 id="import-heading" className="font-display text-2xl font-semibold">Restaurar respaldo</h2>
      <p className="mt-3 text-sm leading-6 text-dark-text/70">Selecciona un respaldo compatible de hasta 1 MB, incluido el formato anterior de Ruta Alemania. Antes de reemplazar datos, verás una comparación y tendrás que confirmar. No se mezclan registros: cada sección incluida reemplaza por completo su sección local; las secciones faltantes o excluidas no se tocan. La escritura de varias secciones no es atómica: si falla, intentaremos recuperar los datos anteriores.</p>
      <label className="mt-5 grid max-w-lg gap-2 text-sm font-semibold">Archivo JSON
        <input type="file" accept=".json,application/json" onChange={(event) => { void selectFile(event.target.files?.[0]); event.currentTarget.value = ""; }} className="min-w-0 w-full rounded-2xl border border-dark-text/15 bg-antique-white p-3 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-peach-fuzz file:px-3 file:py-2 file:font-semibold" />
      </label>
      {preview && <div className="mt-6 rounded-[1.5rem] border border-rosa-mexicano/18 bg-peach-fuzz/40 p-5 sm:p-6">
        <h3 className="font-display text-xl font-semibold">Vista previa: {preview.filename}</h3>
        <p className="mt-2 text-sm text-dark-text/70">Exportado el {new Intl.DateTimeFormat("es", { dateStyle: "medium", timeStyle: "short" }).format(new Date(preview.backup.exportedAt))}.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">{domains.map(({ key, label, unit }) => <div key={key} className="rounded-2xl bg-white/85 p-4 text-sm">
          <p className="font-semibold">{label}</p>
          <p className="mt-2">En este navegador: {preview.snapshot.counts[key]} {unit}</p>
          <p className="mt-1">En el respaldo: {preview.backup.domains[key].state === "included" ? `${backupCount(key, preview.backup)} ${unit}` : stateLabel(preview.backup.domains[key])}</p>
          <p className="mt-2 font-semibold text-rosa-mexicano">{preview.backup.domains[key].state === "included" ? "Se reemplazará" : "Se conservará"}</p>
        </div>)}</div>
        {included ? <>
          <label className="mt-5 flex items-start gap-3 text-sm leading-6"><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-rosa-mexicano" /><span>Entiendo que se reemplazarán los datos locales de las secciones incluidas y que esta acción no combina registros.</span></label>
          <div className="mt-5 flex flex-wrap gap-3"><button type="button" disabled={!confirmed} onClick={restore} className="rounded-full bg-rosa-mexicano px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-45">Confirmar restauración</button><button type="button" onClick={() => { setPreview(null); setConfirmed(false); }} className="rounded-full border border-dark-text/20 bg-white px-5 py-2.5 text-sm font-semibold">Cancelar</button></div>
        </> : <p className="mt-5 text-sm font-medium">Este archivo no contiene secciones validadas para restaurar.</p>}
      </div>}
    </section>
    <section className="rounded-[2rem] border border-rosa-mexicano/25 bg-white/85 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.07)] sm:p-8" aria-labelledby="delete-heading">
      <h2 id="delete-heading" className="font-display text-2xl font-semibold">Eliminar mis datos de este dispositivo</h2>
      <p className="mt-3 text-sm leading-6 text-dark-text/70">Esta acción quita solo los datos de bej guardados en este navegador y dirección del sitio: tu perfil de Mi bej, tus aplicaciones y el avance de la checklist. No borra datos de otros sitios ni respaldos ya descargados.</p>
      <p className="mt-3 text-sm leading-6 text-dark-text/70">Si quieres conservar una copia, <a href="#export-heading" className="font-semibold text-rosa-mexicano underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosa-mexicano">descarga un respaldo primero</a> y revisa qué datos se incluyeron.</p>
      <button ref={deleteButtonRef} type="button" aria-expanded={deleteOpen} aria-controls="delete-confirmation" onClick={() => { setDeleteOpen(true); setDeleteConfirmed(false); setMessage(null); setError(""); }} className="mt-5 rounded-full border border-rosa-mexicano px-6 py-3 font-semibold text-rosa-mexicano hover:bg-peach-fuzz/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosa-mexicano">Eliminar mis datos de este dispositivo</button>
      {deleteOpen && <div id="delete-confirmation" className="mt-5 rounded-[1.5rem] border border-rosa-mexicano/25 bg-antique-white p-5">
        <h3 className="font-display text-xl font-semibold">Confirma antes de borrar</h3>
        <p className="mt-2 text-sm leading-6">Se eliminarán tu perfil, tus aplicaciones y tus pasos marcados en la checklist de este navegador. La acción no afecta otros dispositivos ni archivos JSON descargados.</p>
        <label className="mt-4 flex items-start gap-3 text-sm leading-6"><input type="checkbox" checked={deleteConfirmed} onChange={(event) => setDeleteConfirmed(event.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-rosa-mexicano" /><span>Entiendo qué datos se borrarán y que no podré recuperarlos aquí sin un respaldo.</span></label>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" disabled={!deleteConfirmed} onClick={removeLocalData} className="rounded-full bg-rosa-mexicano px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosa-mexicano">Confirmar eliminación</button>
          <button type="button" onClick={cancelDelete} className="rounded-full border border-dark-text/20 bg-white px-5 py-2.5 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosa-mexicano">Cancelar</button>
        </div>
      </div>}
    </section>
    {message && <p role="status" className="rounded-2xl bg-peach-fuzz/70 p-4 text-sm font-medium">{message}</p>}
    {error && <p role="alert" className="rounded-2xl bg-butter/80 p-4 text-sm font-medium">{error}</p>}
  </div>;
}
