export const globalNavigationLinks = [
  { label: "Inicio", href: "/" },
  { label: "Guías", href: "/guias" },
  { label: "Becas", href: "/becas" },
  { label: "Recursos", href: "/buscadores" },
  { label: "Checklist", href: "/checklist" },
  { label: "Mi Ruta", href: "/mi-ruta" },
] as const;

export function activeGlobalHref(pathname: string): (typeof globalNavigationLinks)[number]["href"] | null {
  if (pathname === "/mi-ruta" || pathname.startsWith("/mi-ruta/")) return "/mi-ruta";
  if (pathname === "/guias" || pathname.startsWith("/guias/")) return "/guias";
  return globalNavigationLinks.find((link) => link.href === pathname)?.href ?? null;
}

export function closeMobileMenu(menu: { open: boolean } | null): void {
  if (menu) menu.open = false;
}
