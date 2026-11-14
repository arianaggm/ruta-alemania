import type { ReactNode } from "react";
import { BejFooter } from "../_components/bej-footer";
import { dmSans, fraunces } from "../_components/bej-fonts";
import { BejHomeNav } from "../_components/bej-home-nav";
import homeStyles from "../home.module.css";
import { MiRutaNav } from "./_components/mi-ruta-nav";
import styles from "./mi-bej.module.css";

export default function MiRutaLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${dmSans.variable} ${fraunces.variable} ${homeStyles.page} ${styles.shell}`}>
      <BejHomeNav />
      <MiRutaNav />
      {children}
      <BejFooter />
    </div>
  );
}
