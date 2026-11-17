import type { Metadata } from "next";
import { noIndexMetadata } from "../_lib/seo";
import { RouteDashboard } from "./_components/route-dashboard";

export const metadata: Metadata = noIndexMetadata(
  "Mi bej",
  "Organiza tus metas de estudio, tareas y próximos pasos guardados en este navegador.",
);

export default function MiRutaPage() {
  return <RouteDashboard />;
}
