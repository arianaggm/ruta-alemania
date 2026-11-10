import type { Priority, StartSemester, StudentPreferences, StudentStage, StudyLanguage, StudyLevel } from "./roadmap";

export const MI_RUTA_STORAGE_KEY = "ruta-alemania:mi-ruta:v1";

export type SavedRoute = {
  version: 1;
  preferences: StudentPreferences;
  completedTaskIds: string[];
};

export type LoadResult =
  | { status: "ready"; data: SavedRoute }
  | { status: "empty" | "invalid" | "unavailable" };

function isOneOf<T extends string>(value: unknown, options: readonly T[]): value is T {
  return typeof value === "string" && options.includes(value as T);
}

export function parseSavedRoute(raw: string): SavedRoute | null {
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object") return null;
    const record = value as Record<string, unknown>;
    const preferences = record.preferences as Record<string, unknown> | null;
    if (record.version !== 1 || !preferences || typeof preferences !== "object") return null;
    if (!isOneOf<StudyLevel>(preferences.studyLevel, ["bachelor", "master", "phd"])) return null;
    if (!isOneOf<StudyLanguage>(preferences.studyLanguage, ["english", "german", "either", "undecided"])) return null;
    if (!isOneOf<StudentStage>(preferences.stage, ["exploring", "applying", "accepted", "inGermany"])) return null;
    if (!isOneOf<StartSemester>(preferences.startSemester, ["winter", "summer", "undecided"])) return null;
    if (!isOneOf<Priority>(preferences.priority, ["program", "funding", "applications", "relocation", "settling"])) return null;
    if (preferences.startSemester === "undecided"
      ? preferences.startYear !== null
      : !Number.isInteger(preferences.startYear) || (preferences.startYear as number) < 2020 || (preferences.startYear as number) > 2100) return null;
    if (!Array.isArray(record.completedTaskIds) || !record.completedTaskIds.every((id) => typeof id === "string")) return null;
    return {
      version: 1,
      preferences: preferences as StudentPreferences,
      completedTaskIds: [...new Set(record.completedTaskIds as string[])],
    };
  } catch {
    return null;
  }
}

export function loadSavedRoute(): LoadResult {
  try {
    const raw = window.localStorage.getItem(MI_RUTA_STORAGE_KEY);
    if (raw === null) return { status: "empty" };
    const data = parseSavedRoute(raw);
    return data ? { status: "ready", data } : { status: "invalid" };
  } catch {
    return { status: "unavailable" };
  }
}

export function saveRoute(data: SavedRoute): boolean {
  try {
    window.localStorage.setItem(MI_RUTA_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function saveEditedProfile(
  preferences: StudentPreferences,
  previouslyLoaded: SavedRoute | null,
): { status: "saved"; data: SavedRoute } | { status: "invalid" | "unavailable" } {
  const latest = loadSavedRoute();
  if (latest.status === "unavailable") return { status: "unavailable" };
  if (latest.status === "invalid" && previouslyLoaded !== null) return { status: "invalid" };

  const data: SavedRoute = {
    version: 1,
    preferences,
    completedTaskIds: latest.status === "ready"
      ? latest.data.completedTaskIds
      : previouslyLoaded?.completedTaskIds ?? [],
  };
  return saveRoute(data) ? { status: "saved", data } : { status: "unavailable" };
}
