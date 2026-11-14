"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { activeMiRutaHref, miRutaNavigationLinks } from "../_lib/navigation";
import styles from "../mi-bej.module.css";

export function MiRutaNav() {
  const pathname = usePathname();
  const activeHref = activeMiRutaHref(pathname);

  return <nav aria-label="Herramientas de Mi bej" className={styles.subnav}>
    <div className={styles.subnavInner}>
      {miRutaNavigationLinks.map((link) => <Link key={link.href} href={link.href}
        aria-current={activeHref === link.href ? (pathname === link.href ? "page" : "location") : undefined}
        className={`${styles.subnavLink} ${activeHref === link.href ? styles.subnavLinkActive : ""}`}>
        {link.label}
      </Link>)}
    </div>
  </nav>;
}
