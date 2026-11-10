import {
  applicationStatuses,
  isSafeExternalUrl,
  isValidDate,
  validateDraft,
  type ApplicationDocument,
  type ApplicationDraft,
  type UniversityApplication,
} from "./model";

export const APPLICATIONS_STORAGE_KEY = "ruta-alemania:aplicaciones:v1";

export type SavedApplications = { version: 1; applications: UniversityApplication[] };
export type ApplicationsLoadResult =
  | { status: "ready"; data: SavedApplications }
  | { status: "invalid" | "unsupported" | "unavailable" };

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isTimestamp(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime()) && date.toISOString() === value;
}

function isDocument(value: unknown): value is ApplicationDocument {
  return isRecord(value)
    && typeof value.id === "string" && Boolean(value.id)
    && typeof value.name === "string" && Boolean(value.name.trim())
    && typeof value.completed === "boolean";
}

function isApplication(value: unknown): value is UniversityApplication {
  if (!isRecord(value)) return false;
  const draft = {
    universityName: value.universityName,
    programName: value.programName,
    studyLevel: value.studyLevel,
    city: value.city,
    officialProgramUrl: value.officialProgramUrl,
    applicationPortalUrl: value.applicationPortalUrl,
    intakeSemester: value.intakeSemester,
    intakeYear: value.intakeYear,
    deadline: value.deadline,
    notes: value.notes,
  };
  if (typeof value.id !== "string" || !value.id
    || typeof draft.universityName !== "string"
    || typeof draft.programName !== "string"
    || typeof draft.city !== "string"
    || typeof draft.officialProgramUrl !== "string"
    || typeof draft.applicationPortalUrl !== "string"
    || typeof draft.deadline !== "string"
    || typeof draft.notes !== "string"
    || (draft.intakeYear !== null && typeof draft.intakeYear !== "number")) return false;
  if (validateDraft(draft as ApplicationDraft) !== null) return false;
  if (draft.deadline && !isValidDate(draft.deadline)) return false;
  if (!isSafeExternalUrl(draft.officialProgramUrl) || !isSafeExternalUrl(draft.applicationPortalUrl)) return false;
  if (!applicationStatuses.includes(value.status as (typeof applicationStatuses)[number])) return false;
  if (!isTimestamp(value.createdAt) || !isTimestamp(value.updatedAt)) return false;
  if (!Array.isArray(value.documents) || !value.documents.every(isDocument)) return false;
  const documentIds = value.documents.map((document: ApplicationDocument) => document.id);
  return new Set(documentIds).size === documentIds.length;
}

export function parseApplications(raw: string): ApplicationsLoadResult {
  try {
    const value: unknown = JSON.parse(raw);
    if (!isRecord(value)) return { status: "invalid" };
    if (typeof value.version !== "number") return { status: "invalid" };
    if (value.version !== 1) return { status: "unsupported" };
    if (!Array.isArray(value.applications) || !value.applications.every(isApplication)) return { status: "invalid" };
    const ids = value.applications.map((application: UniversityApplication) => application.id);
    if (new Set(ids).size !== ids.length) return { status: "invalid" };
    return { status: "ready", data: { version: 1, applications: value.applications } };
  } catch {
    return { status: "invalid" };
  }
}

export function loadApplications(): ApplicationsLoadResult {
  try {
    const raw = window.localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    return raw === null
      ? { status: "ready", data: { version: 1, applications: [] } }
      : parseApplications(raw);
  } catch {
    return { status: "unavailable" };
  }
}

export function saveApplications(data: SavedApplications): boolean {
  try {
    window.localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function updateApplications(
  change: (applications: UniversityApplication[]) => UniversityApplication[],
): ApplicationsLoadResult {
  const latest = loadApplications();
  if (latest.status !== "ready") return latest;
  const data: SavedApplications = { version: 1, applications: change(latest.data.applications) };
  return saveApplications(data) ? { status: "ready", data } : { status: "unavailable" };
}
