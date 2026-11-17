import type { Metadata } from "next";
import { noIndexMetadata } from "../../_lib/seo";
import { Onboarding } from "../_components/onboarding";

export const metadata: Metadata = noIndexMetadata(
  "Personaliza tu bej",
  "Define tus metas de estudio para organizar tu camino personal en este navegador.",
);

export default function EmpezarPage() {
  return <Onboarding />;
}
