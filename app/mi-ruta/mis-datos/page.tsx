import Link from "next/link";
import { DataBackup } from "./_components/data-backup";

export default function MisDatosPage() {
  return <main className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
    <Link href="/mi-ruta" className="text-sm font-semibold text-rosa-mexicano hover:underline">← Volver a Mi Ruta</Link>
    <header className="mt-8 rounded-[2rem] border border-rosa-mexicano/12 bg-peach-fuzz/65 p-7 shadow-[0_22px_70px_rgba(43,30,36,0.08)] sm:p-10">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-rosa-mexicano">Tu información</p>
      <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Mis Datos</h1>
      <p className="mt-4 max-w-2xl leading-7 text-dark-text/75">Mi Ruta, Mis Aplicaciones y la checklist se guardan en este navegador, no en una cuenta. Puedes descargar un respaldo y restaurarlo cuando lo necesites.</p>
    </header>
    <DataBackup />
  </main>;
}
