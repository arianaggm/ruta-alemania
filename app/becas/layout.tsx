import { BejFooter } from "../_components/bej-footer";
import { dmSans, fraunces } from "../_components/bej-fonts";
import { BejHomeNav } from "../_components/bej-home-nav";
import homeStyles from "../home.module.css";
import styles from "./scholarships.module.css";

export default function ScholarshipsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${dmSans.variable} ${fraunces.variable} ${homeStyles.page} ${styles.scholarshipShell}`}>
      <BejHomeNav />
      {children}
      <BejFooter />
    </div>
  );
}
