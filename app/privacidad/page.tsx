import type { Metadata } from "next";
import Link from "next/link";

import { BejEditorialShell } from "../_components/bej-editorial-shell";
import { BrandName } from "../_components/brand-name";
import { noIndexMetadata } from "../_lib/seo";
import styles from "../editorial.module.css";

export const metadata: Metadata = noIndexMetadata(
  "Privacidad (borrador)",
  "Borrador informativo sobre los datos locales de bej. No es un aviso de privacidad definitivo.",
);

export default function PrivacidadPage() {
  return <BejEditorialShell>
    <main className={styles.main}>
      <div className={styles.contentWidth}>
        <Link href="/" className={styles.backLink}>← Volver al inicio</Link>
        <header className={styles.hero}>
          <div className={styles.introRule} aria-hidden="true" />
          <p className={styles.eyebrow}>BORRADOR NO FINAL</p>
          <h1>Privacidad, <em>sin sorpresas.</em></h1>
          <p className={styles.lead}>Esta página explica algunas funciones actuales de <BrandName />, pero todavía no es un aviso de privacidad completo ni está lista para el lanzamiento público. Faltan datos del responsable, del alojamiento del sitio y una revisión legal.</p>
        </header>

        <section className={styles.splitSection} aria-labelledby="local-heading">
          <div><p className={styles.sectionIndex}>01 / DATOS EN TU NAVEGADOR</p><h2 id="local-heading">Tu avance se guarda <em>aquí.</em></h2></div>
          <div className={styles.prose}>
            <p>Hoy puedes usar Mi <BrandName />, Mis aplicaciones y la checklist sin crear una cuenta. El perfil, las tareas marcadas, las aplicaciones y sus notas se guardan en el navegador de este dispositivo. No se sincronizan automáticamente con otros dispositivos.</p>
            <p>Quien use el mismo perfil del navegador podría ver esos datos. Evita escribir información sensible en un equipo compartido. Borrar datos del navegador o cambiar de dispositivo puede hacer que pierdas tu avance.</p>
            <p>Desde <Link href="/mi-ruta/mis-datos" className="font-semibold underline underline-offset-4">Mis datos</Link> puedes descargar un respaldo JSON o eliminar los datos locales de este navegador. El archivo descargado no está cifrado y no se borra cuando eliminas los datos del navegador.</p>
          </div>
        </section>

        <section className={styles.splitSection} aria-labelledby="pending-heading">
          <div><p className={styles.sectionIndex}>02 / ANTES DE PUBLICAR</p><h2 id="pending-heading">Información <em>pendiente.</em></h2></div>
          <div className={styles.prose}>
            <p>Antes de convertir este borrador en un aviso definitivo, debemos confirmar quién opera el sitio y cómo contactarlo, dónde se aloja, qué datos técnicos conserva el proveedor y durante cuánto tiempo, qué servicios externos intervienen y qué obligaciones legales aplican.</p>
            <p>También falta revisar los fundamentos jurídicos, las transferencias de datos y la información sobre derechos de las personas usuarias. No afirmamos que este borrador cumpla por sí solo con todos los requisitos legales.</p>
          </div>
        </section>
      </div>
    </main>
  </BejEditorialShell>;
}
