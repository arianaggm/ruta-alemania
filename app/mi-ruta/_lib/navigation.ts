export const miRutaNavigationLinks = [
  { label: "Mi Ruta", href: "/mi-ruta" },
  { label: "Mis Aplicaciones", href: "/mi-ruta/aplicaciones" },
  { label: "Mis Datos", href: "/mi-ruta/mis-datos" },
] as const;

export function activeMiRutaHref(pathname: string): (typeof miRutaNavigationLinks)[number]["href"] | null {
  if (pathname === "/mi-ruta/aplicaciones" || pathname.startsWith("/mi-ruta/aplicaciones/")) return "/mi-ruta/aplicaciones";
  if (pathname === "/mi-ruta/mis-datos" || pathname.startsWith("/mi-ruta/mis-datos/")) return "/mi-ruta/mis-datos";
  if (pathname === "/mi-ruta" || pathname === "/mi-ruta/empezar") return "/mi-ruta";
  return null;
}
