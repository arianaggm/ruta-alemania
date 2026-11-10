"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ChecklistSection } from "../../_data/checklist";
import { CHECKLIST_STORAGE_KEY, parseChecklist } from "../_lib/storage";

type ChecklistBoardProps = {
  sections: ChecklistSection[];
};

export function ChecklistBoard({ sections }: ChecklistBoardProps) {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    let restoredCheckedItems: string[] = [];
    let error = "";
    try {
      const storedValue = window.localStorage.getItem(CHECKLIST_STORAGE_KEY);
      if (storedValue !== null) {
        const parsed = parseChecklist(storedValue);
        if (parsed === null) error = "No pudimos leer tu checklist guardada. No hemos modificado ni borrado esos datos.";
        else restoredCheckedItems = parsed;
      }
    } catch {
      error = "El almacenamiento de este navegador no está disponible. No pudimos cargar tu checklist.";
    }

    queueMicrotask(() => {
      setCheckedItems(restoredCheckedItems);
      setStorageError(error);
      setHasLoadedStorage(!error);
    });
  }, []);

  const totalItems = useMemo(
    () => sections.reduce((total, section) => total + section.items.length, 0),
    [sections]
  );
  const checkedCount = checkedItems.length;
  const progress = totalItems === 0 ? 0 : Math.round((checkedCount / totalItems) * 100);

  function toggleItem(itemId: string) {
    if (!hasLoadedStorage) return;
    const next = checkedItems.includes(itemId)
      ? checkedItems.filter((id) => id !== itemId)
      : [...checkedItems, itemId];
    try {
      window.localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(next));
      setCheckedItems(next);
      setStorageError("");
    } catch {
      setStorageError("No se pudo guardar tu avance en este navegador.");
    }
  }

  function clearChecklist() {
    if (storageError && !window.confirm("No pudimos leer la checklist guardada. ¿Quieres borrar esos datos de forma permanente?")) return;
    try {
      window.localStorage.removeItem(CHECKLIST_STORAGE_KEY);
      setCheckedItems([]);
      setStorageError("");
      setHasLoadedStorage(true);
    } catch {
      setStorageError("No se pudo limpiar la checklist en este navegador.");
    }
  }

  return (
    <div className="mt-10 space-y-8">
      {storageError && <p role="alert" className="rounded-2xl bg-butter/70 p-4 text-sm font-medium">{storageError}</p>}
      <section className="rounded-[2rem] border border-rosa-mexicano/12 bg-white/82 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.08)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-rosa-mexicano">
              Progreso
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-dark-text">
              {checkedCount} de {totalItems} pasos completados
            </h2>
            <p className="mt-3 text-base leading-7 text-dark-text/74">
              Marca los avances que ya resolviste para tener una vista clara de
              lo que sigue en tu proceso.
            </p>
          </div>

          <button
            type="button"
            onClick={clearChecklist}
            className="inline-flex items-center justify-center rounded-full border border-rosa-mexicano/16 bg-peach-fuzz/55 px-4 py-2 text-sm font-semibold text-dark-text hover:border-rosa-mexicano hover:bg-peach-fuzz"
          >
            Limpiar checklist
          </button>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-sm font-medium text-dark-text/68">
            <span>Avance general</span>
            <span>{progress}%</span>
          </div>
          <div className="mt-3 h-3 overflow-hidden rounded-full bg-antique-white">
            <div
              className="h-full rounded-full bg-rosa-mexicano transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </section>

      <div className="rounded-[2rem] border border-dark-text/8 bg-butter/45 px-5 py-4 text-sm font-medium text-dark-text shadow-[0_18px_50px_rgba(43,30,36,0.08)] sm:px-6">
        Esta checklist es una guía general. Verifica siempre los requisitos
        oficiales según tu caso. Su avance se guarda por separado y no se comparte
        con las tareas personalizadas de <Link href="/mi-ruta" className="font-semibold text-rosa-mexicano underline underline-offset-2">Mi Ruta</Link>.
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {sections.map((section, sectionIndex) => {
          const sectionChecked = section.items.filter((item) =>
            checkedItems.includes(item.id)
          ).length;

          return (
            <section
              key={section.id}
              className="rounded-[2rem] border border-dark-text/8 bg-white/82 p-6 shadow-[0_18px_50px_rgba(43,30,36,0.08)] sm:p-8"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-3 rounded-full bg-peach-fuzz/65 px-4 py-2 text-sm font-semibold text-dark-text">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rosa-mexicano text-white">
                      {sectionIndex + 1}
                    </span>
                    Fase
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-dark-text">
                    {section.title}
                  </h3>
                </div>
                <p className="rounded-full bg-antique-white px-4 py-2 text-sm font-medium text-dark-text/72">
                  {sectionChecked}/{section.items.length} completados
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {section.items.map((item) => {
                  const checked = checkedItems.includes(item.id);

                  return (
                    <label
                      key={item.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-3xl border px-4 py-4 transition ${
                        checked
                          ? "border-rosa-mexicano/20 bg-peach-fuzz/55"
                          : "border-dark-text/8 bg-antique-white/80"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={!hasLoadedStorage}
                        onChange={() => toggleItem(item.id)}
                        className="mt-1 h-5 w-5 rounded border-dark-text/20 accent-[#D4447A]"
                      />
                      <span
                        className={`text-sm leading-7 sm:text-base ${
                          checked ? "text-dark-text" : "text-dark-text/82"
                        }`}
                      >
                        {item.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
