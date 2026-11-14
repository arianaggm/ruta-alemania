import type { Metadata } from "next";
import { ApplicationsBoard } from "./_components/applications-board";

export const metadata: Metadata = {
  title: "Mis aplicaciones | bej",
  description: "Organiza tus solicitudes a universidades y programas en Alemania en este navegador.",
};

export default function ApplicationsPage() {
  return <ApplicationsBoard />;
}
