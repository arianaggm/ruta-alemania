import type { Metadata } from "next";
import Link from "next/link";

import { BejEditorialShell } from "../_components/bej-editorial-shell";
import { checklistSections } from "../_data/checklist";
import { ChecklistBoard } from "./_components/checklist-board";
import styles from "../practical.module.css";

export const metadata: Metadata = {
  title: "Checklist para estudiar en Alemania | bej",
  description:
    "Organiza tus pasos para elegir un programa, preparar documentos, buscar becas y planear tu llegada a Alemania.",
};

export default function ChecklistPage() {
  return (
    <BejEditorialShell>
      <main className={styles.main}>
        <div className={styles.contentWidth}>
          <Link href="/" className={styles.backLink}>← Volver al inicio</Link>

          <header className={styles.intro}>
            <div className={styles.introRule} aria-hidden="true" />
            <p className={styles.eyebrow}>UN PASO A LA VEZ</p>
            <h1>Checklist para estudiar <em>en Alemania.</em></h1>
            <p className={styles.introDescription}>
              Una guía paso a paso para organizar tu aplicación, documentos, becas,
              visa y llegada desde México.
            </p>
          </header>

          <ChecklistBoard sections={checklistSections} />
        </div>
      </main>
    </BejEditorialShell>
  );
}
