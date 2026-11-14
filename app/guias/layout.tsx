import { BejFooter } from "../_components/bej-footer";
import { dmSans, fraunces } from "../_components/bej-fonts";
import { BejHomeNav } from "../_components/bej-home-nav";
import homeStyles from "../home.module.css";
import styles from "./guides.module.css";

export default function GuidesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${dmSans.variable} ${fraunces.variable} ${homeStyles.page} ${styles.guideShell}`}>
      <BejHomeNav />
      {children}
      <BejFooter />
    </div>
  );
}
