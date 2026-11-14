import styles from "./brand-name.module.css";

type BrandNameProps = {
  context?: "body" | "heading";
  tone?: "default" | "light";
};

export function BrandName({ context = "body", tone = "default" }: BrandNameProps) {
  return <span className={`${styles.brand} ${styles[context]} ${styles[tone]}`}>bej</span>;
}
