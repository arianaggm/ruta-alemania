import type { ReactNode } from "react";
import { Footer } from "../_components/footer";
import { Navbar } from "../_components/navbar";
import { MiRutaNav } from "./_components/mi-ruta-nav";

export default function MiRutaLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background text-foreground">
      <Navbar />
      <MiRutaNav />
      {children}
      <Footer />
    </div>
  );
}
