import type { LucideIcon } from "lucide-react";
import styles from "./styles.module.css";

interface FeaturePageLayoutProps {
  children: React.ReactNode;
  icon: LucideIcon;
  title: string;
  description: string;
}

function FeaturePageLayout({
  children,
  icon: Icon,
  title,
  description,
}: FeaturePageLayoutProps) {
  return (
    <div className={styles.featurePageLayout}>
      <header className={styles.headerSection}>
        <div className={styles.headerIcon}>
          <Icon size={40} color="white" strokeWidth={2} />
        </div>
        <h1 className={styles.mainTitle}>{title}</h1>
        <p className={styles.subtitle}>{description}</p>
      </header>

      {children}
    </div>
  );
}

export default FeaturePageLayout;
