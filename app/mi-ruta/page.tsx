import type { Metadata } from "next";
import { RouteDashboard } from "./_components/route-dashboard";

export const metadata: Metadata = { title: "Mi bej | bej" };

export default function MiRutaPage() {
  return <RouteDashboard />;
}
