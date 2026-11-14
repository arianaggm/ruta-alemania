import Link from "next/link";
import { BrandName } from "../../_components/brand-name";
import { DataBackup } from "./_components/data-backup";
import styles from "../mi-bej.module.css";

export default function MisDatosPage() {
  return <main className={styles.main}>
    <Link href="/mi-ruta" className={styles.backLink}>← Volver a Mi bej</Link>
    <header className={styles.toolHeader}>
      <div className={styles.introRule} aria-hidden="true" />
      <p className={styles.eyebrow}>MIS DATOS</p>
      <h1>Conserva tu avance.</h1>
      <p>Mi <BrandName />, Mis aplicaciones y la checklist se guardan en este navegador, no en una cuenta. Puedes descargar un respaldo y restaurarlo cuando lo necesites.</p>
    </header>
    <DataBackup />
  </main>;
}
