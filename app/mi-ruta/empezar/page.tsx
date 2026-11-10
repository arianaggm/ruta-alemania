import type { Metadata } from "next";
import { Onboarding } from "../_components/onboarding";

export const metadata: Metadata = { title: "Empezar Mi Ruta | Ruta Alemania" };

export default function EmpezarPage() {
  return <Onboarding />;
}
