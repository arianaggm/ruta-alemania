import type { Metadata } from "next";
import { RouteDashboard } from "./_components/route-dashboard";

export const metadata: Metadata = { title: "Mi Ruta | Ruta Alemania" };

export default function MiRutaPage() {
  return <RouteDashboard />;
}
