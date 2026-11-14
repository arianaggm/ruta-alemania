import type { ReactNode } from "react";

import { BejFooter } from "./bej-footer";
import { dmSans, fraunces } from "./bej-fonts";
import { BejHomeNav } from "./bej-home-nav";
import homeStyles from "../home.module.css";
import editorialStyles from "../editorial.module.css";

export function BejEditorialShell({ children }: { children: ReactNode }) {
  return (
    <div className={`${dmSans.variable} ${fraunces.variable} ${homeStyles.page} ${editorialStyles.shell}`}>
      <BejHomeNav />
      {children}
      <BejFooter />
    </div>
  );
}
