import { checklistSections } from "../../_data/checklist";

export const CHECKLIST_STORAGE_KEY = "ruta-alemania-checklist";

const validItemIds = new Set(checklistSections.flatMap((section) => section.items.map((item) => item.id)));

export function parseChecklist(raw: string): string[] | null {
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value) || !value.every((id) => typeof id === "string" && validItemIds.has(id))) return null;
    if (new Set(value).size !== value.length) return null;
    return value;
  } catch {
    return null;
  }
}
