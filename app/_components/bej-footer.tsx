import Link from "next/link";

import styles from "../home.module.css";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/arianaggm_/" },
  { label: "GitHub", href: "https://github.com/arianaggm" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/arianagutierrezmay/" },
] as const;

export function BejFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div>
          <Link href="/" className={styles.footerLogo}>bej</Link>
          <p>Un camino para estudiar más allá de casa. Empezamos con Alemania.</p>
        </div>
        <nav aria-label="Enlaces del sitio" className={styles.footerLinks}>
          <Link href="/guias">Guías</Link>
          <Link href="/becas">Becas</Link>
          <Link href="/buscadores">Recursos</Link>
          <Link href="/checklist">Checklist</Link>
          <Link href="/mi-ruta">Mi bej</Link>
          <Link href="/que-es-bej">¿Qué es bej?</Link>
          <Link href="/novedades">Novedades</Link>
        </nav>
        <div className={styles.footerSocial} aria-label="Redes sociales">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} bej</span>
        <nav aria-label="Información legal en preparación" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/privacidad" className="underline underline-offset-4">Privacidad (borrador)</Link>
          <Link href="/impressum" className="underline underline-offset-4">Información legal (borrador)</Link>
        </nav>
        <span>Con raíces en México.</span>
      </div>
    </footer>
  );
}
