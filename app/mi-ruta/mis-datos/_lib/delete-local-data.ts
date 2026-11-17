import { CHECKLIST_STORAGE_KEY } from "../../../checklist/_lib/storage";
import { APPLICATIONS_STORAGE_KEY } from "../../aplicaciones/_lib/storage";
import { MI_RUTA_STORAGE_KEY } from "../../_lib/storage";
import type { StoragePort } from "./backup";

const localDataKeys = [MI_RUTA_STORAGE_KEY, APPLICATIONS_STORAGE_KEY, CHECKLIST_STORAGE_KEY] as const;

export type DeleteLocalDataResult =
  | { status: "deleted"; removedCount: number }
  | { status: "empty"; removedCount: 0 }
  | { status: "error"; message: string };

export function deleteLocalData(storage: StoragePort): DeleteLocalDataResult {
  const previous = new Map<string, string>();
  try {
    for (const key of localDataKeys) {
      const value = storage.getItem(key);
      if (value !== null) previous.set(key, value);
    }
  } catch {
    return { status: "error", message: "No se pudo leer el almacenamiento de este navegador. No se intentó borrar ningún dato." };
  }

  if (previous.size === 0) return { status: "empty", removedCount: 0 };

  const attempted: string[] = [];
  try {
    for (const [key, value] of previous) {
      if (storage.getItem(key) !== value) throw new Error("Los datos cambiaron durante la operación.");
      attempted.push(key);
      storage.removeItem(key);
      if (storage.getItem(key) !== null) throw new Error("No se pudo verificar la eliminación.");
    }
    return { status: "deleted", removedCount: previous.size };
  } catch {
    let restored = true;
    for (const key of attempted.reverse()) {
      try {
        const value = previous.get(key);
        if (value === undefined) throw new Error("Falta una copia local.");
        storage.setItem(key, value);
        if (storage.getItem(key) !== value) restored = false;
      } catch {
        restored = false;
      }
    }
    return { status: "error", message: restored
      ? "No se completó la eliminación. Intentamos recuperar los datos anteriores; revisa tus datos antes de volver a intentarlo."
      : "No se completó la eliminación ni se pudo recuperar todo el estado anterior. Revisa tus datos y conserva cualquier respaldo descargado." };
  }
}
