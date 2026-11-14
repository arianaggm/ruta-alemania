"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

import styles from "../home.module.css";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Guías", href: "/guias" },
  { label: "Becas", href: "/becas" },
  { label: "Mi bej", href: "/mi-ruta" },
  { label: "¿Qué es bej?", href: "/que-es-bej" },
] as const;

export function BejHomeNav() {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  function destination(href: string) {
    return href.startsWith("#") && pathname !== "/" ? `/${href}` : href;
  }

  function current(href: string) {
    if (pathname === "/" && href === "#inicio") return "location";
    if (href === "/guias" && pathname.startsWith("/guias")) return pathname === "/guias" ? "page" : "location";
    return pathname === href ? "page" : undefined;
  }

  function closeMenu() {
    if (menuRef.current) menuRef.current.open = false;
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.logo} aria-label="bej, ir al inicio">bej</Link>

        <nav className={styles.desktopNav} aria-label="Navegación principal">
          {links.map((link) => (
            <Link key={link.href} href={destination(link.href)} aria-current={current(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/mi-ruta/empezar" className={styles.navCta}>Empezar <span aria-hidden="true">↗</span></Link>

        <details ref={menuRef} className={styles.mobileMenu}>
          <summary className={styles.menuToggle} aria-label="Abrir menú principal">
            <span aria-hidden="true" className={styles.menuOpenIcon}>☰</span>
            <span aria-hidden="true" className={styles.menuCloseIcon}>×</span>
          </summary>
          <nav className={styles.mobileNav} aria-label="Navegación principal móvil">
            {links.map((link) => (
              <Link key={link.href} href={destination(link.href)} onClick={closeMenu} aria-current={current(link.href)}>
                {link.label}
              </Link>
            ))}
            <Link href="/mi-ruta/empezar" onClick={closeMenu} className={styles.mobileNavCta}>Empezar <span aria-hidden="true">↗</span></Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
