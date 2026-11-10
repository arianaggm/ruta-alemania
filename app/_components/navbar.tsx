"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { activeGlobalHref, closeMobileMenu, globalNavigationLinks } from "./navigation";

export function Navbar() {
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  const activeHref = activeGlobalHref(pathname);

  return (
    <header className="sticky top-0 z-50 px-4 py-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-6xl rounded-[2rem] border border-white/60 bg-white/75 px-5 py-4 shadow-[0_14px_40px_rgba(43,30,36,0.08)] backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rosa-mexicano font-display text-lg font-semibold text-white">
              RA
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-lg font-semibold text-dark-text">
                Ruta Alemania
              </p>
              <p className="truncate text-sm text-dark-text/70">
                De México a la universidad alemana
              </p>
            </div>
          </Link>

          <details ref={mobileMenuRef} className="group lg:hidden">
            <summary
              aria-label="Menú principal"
              className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-rosa-mexicano/16 bg-peach-fuzz/55 text-dark-text [&::-webkit-details-marker]:hidden"
            >
              <span aria-hidden="true" className="text-lg font-semibold group-open:hidden">☰</span>
              <span aria-hidden="true" className="hidden text-lg font-semibold group-open:inline">×</span>
            </summary>
            <nav
              id="main-navigation"
              aria-label="Navegación principal móvil"
              className="absolute left-0 right-0 top-full mt-2 flex flex-col gap-2 rounded-[2rem] border border-dark-text/8 bg-white p-5 text-sm font-medium text-dark-text/78 shadow-[0_18px_50px_rgba(43,30,36,0.12)] lg:hidden"
            >
              {globalNavigationLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={activeHref === link.href ? (pathname === link.href ? "page" : "location") : undefined}
                  onClick={() => closeMobileMenu(mobileMenuRef.current)}
                  className={`rounded-2xl px-4 py-3 hover:bg-rosa-mexicano hover:text-white ${
                    activeHref === link.href ? "bg-rosa-mexicano text-white" : "bg-antique-white/70"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </details>

          <nav
            aria-label="Navegación principal"
            className="hidden items-center justify-end gap-1 text-sm font-medium text-dark-text/72 lg:flex"
          >
            {globalNavigationLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-current={activeHref === link.href ? (pathname === link.href ? "page" : "location") : undefined}
                className={`rounded-full px-3 py-2 hover:bg-rosa-mexicano hover:text-white ${
                  activeHref === link.href ? "bg-rosa-mexicano text-white" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

      </div>
    </header>
  );
}
