"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BrandName } from "../../_components/brand-name";
import type { ChecklistSection } from "../../_data/checklist";
import { CHECKLIST_STORAGE_KEY, parseChecklist } from "../_lib/storage";
import styles from "../../practical.module.css";

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
    if (!hasLoadedStorage && !storageError) return;
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
    <div className={styles.checklistBody}>
      {storageError && <p role="alert" className={styles.storageError}>{storageError}</p>}

      <section className={styles.progressSection} aria-labelledby="checklist-progress-heading">
        <div className={styles.progressHeading}>
          <div>
            <p className={styles.eyebrow}>TU AVANCE</p>
            <h2 id="checklist-progress-heading" aria-live="polite">
              {checkedCount} de {totalItems} pasos completados
            </h2>
            <p>Marca los avances que ya resolviste para ver con claridad lo que sigue.</p>
          </div>
          <button
            type="button"
            onClick={clearChecklist}
            disabled={!hasLoadedStorage && !storageError}
            className={styles.clearButton}
          >
            Limpiar checklist
          </button>
        </div>
        <div className={styles.progressSummary}>
          <span>Avance general</span>
          <strong>{progress}%</strong>
        </div>
        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-label="Avance general de la checklist"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </section>

      <p className={styles.checklistNote}>
        Esta checklist es una guía general. Verifica siempre los requisitos oficiales
        según tu caso. Su avance se guarda por separado y no se comparte con las
        tareas personalizadas de <Link href="/mi-ruta">Mi <BrandName /></Link>.
      </p>

      <div className={styles.phaseGrid}>
        {sections.map((section, sectionIndex) => {
          const sectionChecked = section.items.filter((item) =>
            checkedItems.includes(item.id)
          ).length;

          return (
            <section key={section.id} className={styles.phaseCard} aria-labelledby={`phase-${section.id}`}>
              <div className={styles.phaseHeader}>
                <div>
                  <p className={styles.phaseNumber}>FASE 0{sectionIndex + 1}</p>
                  <h2 id={`phase-${section.id}`}>{section.title}</h2>
                </div>
                <p className={styles.phaseCount}>{sectionChecked}/{section.items.length} completados</p>
              </div>
              <ul className={styles.taskList}>
                {section.items.map((item) => {
                  const checked = checkedItems.includes(item.id);
                  return (
                    <li key={item.id} className={styles.taskItem}>
                      <label className={styles.taskLabel}>
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={!hasLoadedStorage}
                          onChange={() => toggleItem(item.id)}
                          className={styles.taskCheckbox}
                        />
                        <span className={checked ? styles.taskDone : styles.taskText}>{item.label}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
