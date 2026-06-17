"use client";

import Link from "next/link";
import { useState } from "react";

type NavLink = {
  label: string;
  href: string;
  active?: boolean;
};

type NavbarProps = {
  links: NavLink[];
  homeHref?: string;
};

export function Navbar({ links, homeHref = "/" }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/60 bg-white/75 px-5 py-4 shadow-[0_14px_40px_rgba(43,30,36,0.08)] backdrop-blur">
        <div className="flex items-center justify-between gap-4">
          <Link href={homeHref} className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rosa-mexicano font-display text-lg font-semibold text-white">
              RA
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-lg font-semibold text-dark-text">
                Ruta Alemania
              </p>
              <p className="truncate text-sm text-dark-text/70">
                De Mexico a la universidad alemana
              </p>
            </div>
          </Link>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
            aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-rosa-mexicano/16 bg-peach-fuzz/55 text-dark-text sm:hidden"
          >
            <span className="text-lg font-semibold">{isMenuOpen ? "×" : "≡"}</span>
          </button>

          <nav
            className="hidden flex-wrap items-center justify-end gap-2 text-sm font-medium text-dark-text/72 sm:flex"
          >
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`rounded-full px-4 py-2 hover:bg-rosa-mexicano hover:text-white ${
                  link.active ? "bg-rosa-mexicano text-white" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <nav
          id="main-navigation"
          className={`${isMenuOpen ? "mt-4 flex" : "hidden"} flex-col gap-2 border-t border-dark-text/8 pt-4 text-sm font-medium text-dark-text/78 sm:hidden`}
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={`rounded-2xl px-4 py-3 hover:bg-rosa-mexicano hover:text-white ${
                link.active ? "bg-rosa-mexicano text-white" : "bg-antique-white/70"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
