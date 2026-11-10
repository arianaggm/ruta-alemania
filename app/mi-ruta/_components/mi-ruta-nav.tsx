"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { activeMiRutaHref, miRutaNavigationLinks } from "../_lib/navigation";

export function MiRutaNav() {
  const pathname = usePathname();
  const activeHref = activeMiRutaHref(pathname);

  return <nav aria-label="Herramientas de Mi Ruta" className="mx-auto flex max-w-6xl flex-wrap gap-2 px-4 pb-2 sm:px-6 lg:px-8">
    {miRutaNavigationLinks.map((link) => <Link key={link.href} href={link.href} aria-current={activeHref === link.href ? (pathname === link.href ? "page" : "location") : undefined}
      className={`rounded-full border px-4 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-rosa-mexicano ${activeHref === link.href
        ? "border-rosa-mexicano bg-rosa-mexicano text-white"
        : "border-rosa-mexicano/20 bg-white/80 text-rosa-mexicano hover:bg-peach-fuzz"}`}>
      {link.label}
    </Link>)}
  </nav>;
}
