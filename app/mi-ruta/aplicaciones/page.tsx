import type { Metadata } from "next";
import { noIndexMetadata } from "../../_lib/seo";
import { ApplicationsBoard } from "./_components/applications-board";

export const metadata: Metadata = noIndexMetadata(
  "Mis aplicaciones",
  "Organiza tus solicitudes a universidades y programas en Alemania en este navegador.",
);

export default function ApplicationsPage() {
  return <ApplicationsBoard />;
}
