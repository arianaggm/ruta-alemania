import { CHECKLIST_STORAGE_KEY, parseChecklist } from "../../../checklist/_lib/storage";
import { APPLICATIONS_STORAGE_KEY, parseApplications, type SavedApplications } from "../../aplicaciones/_lib/storage";
import { MI_RUTA_STORAGE_KEY, parseSavedRoute, type SavedRoute } from "../../_lib/storage";

export const BACKUP_FORMAT = "ruta-alemania-backup";
export const BACKUP_VERSION = 1;
export const MAX_BACKUP_BYTES = 1_000_000;

export function validateBackupFile(name: string, type: string, size: number): string | null {
  if (!name.toLowerCase().endsWith(".json") || (type && type !== "application/json" && type !== "text/json")) return "Selecciona un archivo JSON (.json) para importar.";
  if (size === 0 || size > MAX_BACKUP_BYTES) return "El archivo debe contener datos y no superar 1 MB.";
  return null;
}

export type BackupDomain<T> = { state: "included"; data: T } | { state: "missing" } | { state: "excluded"; reason: "invalid" | "unsupported" };
export type Backup = {
  format: typeof BACKUP_FORMAT;
  schemaVersion: typeof BACKUP_VERSION;
  exportedAt: string;
  application: "Ruta Alemania";
  domains: {
    miRuta: BackupDomain<SavedRoute>;
    aplicaciones: BackupDomain<SavedApplications>;
    checklist: BackupDomain<string[]>;
  };
};

export type StoragePort = Pick<Storage, "getItem" | "setItem" | "removeItem">;
export type DomainName = keyof Backup["domains"];
export type Snapshot = {
  raw: Record<DomainName, string | null>;
  counts: Record<DomainName, number>;
};

const keys: Record<DomainName, string> = {
  miRuta: MI_RUTA_STORAGE_KEY,
  aplicaciones: APPLICATIONS_STORAGE_KEY,
  checklist: CHECKLIST_STORAGE_KEY,
};
const domainNames: DomainName[] = ["miRuta", "aplicaciones", "checklist"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function hasKeys(value: Record<string, unknown>, expected: string[]): boolean {
  const actual = Object.keys(value);
  return actual.length === expected.length && expected.every((key) => Object.hasOwn(value, key));
}

function isTimestamp(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime()) && date.toISOString() === value;
}

function validatedRoute(value: unknown): SavedRoute | null {
  if (!isRecord(value) || !hasKeys(value, ["version", "preferences", "completedTaskIds"])) return null;
  if (!isRecord(value.preferences) || !hasKeys(value.preferences, ["studyLevel", "studyLanguage", "stage", "startSemester", "startYear", "priority"])) return null;
  if (!Array.isArray(value.completedTaskIds)
    || !value.completedTaskIds.every((id) => typeof id === "string" && Boolean(id.trim()))
    || new Set(value.completedTaskIds).size !== value.completedTaskIds.length) return null;
  const parsed = parseSavedRoute(JSON.stringify(value));
  if (!parsed) return null;
  const { studyLevel, studyLanguage, stage, startSemester, startYear, priority } = parsed.preferences;
  return { version: 1, preferences: { studyLevel, studyLanguage, stage, startSemester, startYear, priority }, completedTaskIds: parsed.completedTaskIds };
}

function validatedApplications(value: unknown): SavedApplications | null {
  if (!isRecord(value) || !hasKeys(value, ["version", "applications"]) || !Array.isArray(value.applications)) return null;
  const parsed = parseApplications(JSON.stringify(value));
  if (parsed.status !== "ready") return null;
  for (const item of value.applications) {
    if (!isRecord(item) || !hasKeys(item, ["id", "universityName", "programName", "studyLevel", "city", "officialProgramUrl", "applicationPortalUrl", "intakeSemester", "intakeYear", "deadline", "notes", "status", "documents", "createdAt", "updatedAt"])) return null;
    if (!Array.isArray(item.documents) || !item.documents.every((document) => isRecord(document) && hasKeys(document, ["id", "name", "completed"]))) return null;
  }
  return parsed.data;
}

function validatedChecklist(value: unknown): string[] | null {
  return parseChecklist(JSON.stringify(value));
}

function validateDomain(name: DomainName, value: unknown): SavedRoute | SavedApplications | string[] | null {
  if (name === "miRuta") return validatedRoute(value);
  if (name === "aplicaciones") return validatedApplications(value);
  return validatedChecklist(value);
}

function validateStored(name: DomainName, raw: string): SavedRoute | SavedApplications | string[] | null {
  try {
    return validateDomain(name, JSON.parse(raw));
  } catch {
    return null;
  }
}

function count(name: DomainName, data: SavedRoute | SavedApplications | string[] | null): number {
  if (!data) return 0;
  if (name === "miRuta") return 1;
  if (name === "aplicaciones") return (data as SavedApplications).applications.length;
  return (data as string[]).length;
}

export function createBackup(storage: StoragePort, exportedAt: string): Backup {
  if (!isTimestamp(exportedAt)) throw new Error("No se pudo generar una fecha de exportación válida.");
  const read = (name: DomainName) => {
    const raw = storage.getItem(keys[name]);
    if (raw === null) return { state: "missing" as const };
    const data = validateStored(name, raw);
    if (data !== null) return { state: "included" as const, data };
    let unsupported = false;
    try {
      const value: unknown = JSON.parse(raw);
      unsupported = name !== "checklist" && isRecord(value) && typeof value.version === "number" && value.version !== 1;
    } catch { /* Malformed JSON is invalid, not a newer schema. */ }
    return { state: "excluded" as const, reason: unsupported ? "unsupported" as const : "invalid" as const };
  };
  const miRuta = read("miRuta");
  const aplicaciones = read("aplicaciones");
  const checklist = read("checklist");
  const backup: Backup = {
    format: BACKUP_FORMAT,
    schemaVersion: BACKUP_VERSION,
    exportedAt,
    application: "Ruta Alemania",
    domains: {
      miRuta: miRuta as Backup["domains"]["miRuta"],
      aplicaciones: aplicaciones as Backup["domains"]["aplicaciones"],
      checklist: checklist as Backup["domains"]["checklist"],
    },
  };
  if (new TextEncoder().encode(JSON.stringify(backup)).length > MAX_BACKUP_BYTES) throw new Error("El respaldo supera el límite de 1 MB.");
  return backup;
}

export function parseBackup(raw: string): { status: "ready"; backup: Backup } | { status: "error"; message: string } {
  if (new TextEncoder().encode(raw).length > MAX_BACKUP_BYTES) return { status: "error", message: "El archivo supera el límite de 1 MB." };
  let value: unknown;
  try { value = JSON.parse(raw); } catch { return { status: "error", message: "El archivo no contiene JSON válido." }; }
  if (!isRecord(value) || !hasKeys(value, ["format", "schemaVersion", "exportedAt", "application", "domains"]) || value.format !== BACKUP_FORMAT || value.application !== "Ruta Alemania") {
    return { status: "error", message: "Este archivo no es un respaldo de Ruta Alemania compatible." };
  }
  if (value.schemaVersion !== BACKUP_VERSION) return { status: "error", message: "La versión del respaldo no es compatible con esta página." };
  if (!isTimestamp(value.exportedAt) || !isRecord(value.domains) || !hasKeys(value.domains, domainNames)) {
    return { status: "error", message: "El respaldo tiene metadatos incompletos o inválidos." };
  }
  const domains: Record<string, BackupDomain<SavedRoute | SavedApplications | string[]>> = {};
  for (const name of domainNames) {
    const domain = value.domains[name];
    if (!isRecord(domain) || !["included", "missing", "excluded"].includes(String(domain.state))) {
      return { status: "error", message: `La sección ${name} del respaldo no es válida.` };
    }
    if (domain.state === "included") {
      if (!hasKeys(domain, ["state", "data"])) return { status: "error", message: `La sección ${name} contiene campos no reconocidos.` };
      const data = validateDomain(name, domain.data);
      if (data === null) return { status: "error", message: `La sección ${name} contiene registros inválidos o duplicados.` };
      domains[name] = { state: "included", data };
    } else if (domain.state === "missing") {
      if (!hasKeys(domain, ["state"])) return { status: "error", message: `La sección ${name} contiene campos no reconocidos.` };
      domains[name] = { state: "missing" };
    } else {
      if (!hasKeys(domain, ["state", "reason"]) || (domain.reason !== "invalid" && domain.reason !== "unsupported")) return { status: "error", message: `La sección ${name} no explica por qué fue excluida.` };
      domains[name] = { state: "excluded", reason: domain.reason };
    }
  }
  return { status: "ready", backup: { format: BACKUP_FORMAT, schemaVersion: BACKUP_VERSION, exportedAt: value.exportedAt, application: "Ruta Alemania", domains: domains as Backup["domains"] } };
}

function snapshot(storage: StoragePort): Snapshot {
  const raw = {} as Snapshot["raw"];
  const counts = {} as Snapshot["counts"];
  for (const name of domainNames) {
    raw[name] = storage.getItem(keys[name]);
    if (raw[name] === null) counts[name] = 0;
    else {
      const data = validateStored(name, raw[name]);
      if (data === null) throw new Error("Hay datos locales que no podemos validar. No se reemplazó ninguna sección.");
      counts[name] = count(name, data);
    }
  }
  return { raw, counts };
}

export function previewRestore(storage: StoragePort, backup: Backup): Snapshot {
  if (parseBackup(JSON.stringify(backup)).status !== "ready") throw new Error("El respaldo no es válido.");
  return snapshot(storage);
}

export function restoreBackup(storage: StoragePort, backup: Backup, preview: Snapshot): { status: "restored" } | { status: "error"; message: string } {
  if (parseBackup(JSON.stringify(backup)).status !== "ready") return { status: "error", message: "El respaldo no es válido." };
  const included = domainNames.filter((name) => backup.domains[name].state === "included");
  if (included.length === 0) return { status: "error", message: "El respaldo no contiene datos validados para restaurar." };
  let current: Snapshot;
  try {
    current = snapshot(storage);
    if (domainNames.some((name) => current.raw[name] !== preview.raw[name])) return { status: "error", message: "Los datos locales cambiaron desde la vista previa. Vuelve a seleccionar el archivo antes de restaurar." };
  } catch (cause) {
    return { status: "error", message: cause instanceof Error ? cause.message : "No se pudo leer el almacenamiento local." };
  }
  const attempted: DomainName[] = [];
  try {
    for (const name of included) {
      const domain = backup.domains[name];
      if (domain.state !== "included") continue;
      const serialized = JSON.stringify(domain.data);
      attempted.push(name);
      storage.setItem(keys[name], serialized);
      if (storage.getItem(keys[name]) !== serialized) throw new Error("No se pudo verificar una escritura del respaldo.");
    }
    return { status: "restored" };
  } catch {
    let rollbackComplete = true;
    for (const name of attempted.reverse()) {
      try {
        const previous = current.raw[name];
        if (previous === null) storage.removeItem(keys[name]);
        else storage.setItem(keys[name], previous);
        if (storage.getItem(keys[name]) !== previous) rollbackComplete = false;
      } catch { rollbackComplete = false; }
    }
    return { status: "error", message: rollbackComplete
      ? "Falló la restauración. Se recuperaron los datos anteriores; no se aplicó el respaldo completo."
      : "Falló la restauración y no se pudo recuperar todo el estado anterior. No cierres esta página; revisa tus datos locales y conserva el archivo de respaldo." };
  }
}

export function backupCount(name: DomainName, backup: Backup): number {
  const domain = backup.domains[name];
  return domain.state === "included" ? count(name, domain.data) : 0;
}
