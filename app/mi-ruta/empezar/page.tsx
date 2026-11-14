import type { Metadata } from "next";
import { Onboarding } from "../_components/onboarding";

export const metadata: Metadata = { title: "Personaliza tu bej | bej" };

export default function EmpezarPage() {
  return <Onboarding />;
}
