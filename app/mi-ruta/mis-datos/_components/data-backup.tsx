"use client";

import { useState } from "react";
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

const domains: { key: DomainName; label: string; unit: string }[] = [
  { key: "miRuta", label: "Mi Ruta", unit: "perfil" },
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
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
    setMessage("");
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
    setMessage("Respaldo restaurado. Abre Mi Ruta, Mis Aplicaciones o la checklist para ver los datos recuperados.");
    setPreview(null);
    setConfirmed(false);
  }

  const included = preview && domains.some(({ key }) => preview.backup.domains[key].state === "included");

  return <div className="mt-8 space-y-8">
    <p className="rounded-[1.5rem] bg-butter/60 p-5 text-sm leading-6 text-dark-text/80 sm:p-6">Los datos de este navegador pueden perderse al borrar el historial o cambiar de dispositivo. Un respaldo puede contener información personal: guárdalo de forma privada. localhost, 127.0.0.1 y las direcciones de red local no comparten almacenamiento.</p>

    <section className="rounded-[2rem] border border-dark-text/8 bg-white/85 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.07)] sm:p-8" aria-labelledby="export-heading">
      <h2 id="export-heading" className="font-display text-2xl font-semibold">Descargar respaldo</h2>
      <p className="mt-3 text-sm leading-6 text-dark-text/70">Solo se incluyen datos que podemos validar. Los datos faltantes o dañados se señalan y no se agregan al archivo.</p>
      <button type="button" onClick={exportData} className="mt-5 rounded-full bg-rosa-mexicano px-6 py-3 font-semibold text-white hover:bg-rosa-mexicano/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rosa-mexicano">Descargar JSON</button>
      {exported && <div className="mt-5 space-y-2 text-sm">{domains.map(({ key, label, unit }) => <p key={key}><span className="font-semibold">{label}:</span> {stateLabel(exported.domains[key])}{exported.domains[key].state === "included" ? ` · ${backupCount(key, exported)} ${unit}` : ""}</p>)}</div>}
    </section>

    <section className="rounded-[2rem] border border-dark-text/8 bg-white/85 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.07)] sm:p-8" aria-labelledby="import-heading">
      <h2 id="import-heading" className="font-display text-2xl font-semibold">Restaurar respaldo</h2>
      <p className="mt-3 text-sm leading-6 text-dark-text/70">Selecciona un respaldo de Ruta Alemania de hasta 1 MB. Antes de reemplazar datos, verás una comparación y tendrás que confirmar. No se mezclan registros: cada sección incluida reemplaza por completo su sección local; las secciones faltantes o excluidas no se tocan. La escritura de varias secciones no es atómica: si falla, intentaremos recuperar los datos anteriores.</p>
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
    {message && <p role="status" className="rounded-2xl bg-peach-fuzz/70 p-4 text-sm font-medium">{message}</p>}
    {error && <p role="alert" className="rounded-2xl bg-butter/80 p-4 text-sm font-medium">{error}</p>}
  </div>;
}
