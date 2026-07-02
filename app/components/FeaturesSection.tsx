import StoreGrid from "./StoreGrid";
import { IMG } from "../data";
import styles from "../jamb-cbt-practice-download/download.module.css";

export default function FeaturesSection({
  features,
  heading = "Features",
  portraitAlt = "Student using Prepmate",
}: {
  features: string[];
  heading?: string;
  portraitAlt?: string;
}) {
  return (
    <section className={styles.features}>
      <div className={styles.featuresLeft}>
        <h2 className="h2" style={{ textAlign: "left" }}>
          {heading}
        </h2>
        <div className={styles.pills}>
          {features.map((feature) => (
            <span key={feature} className={styles.pill}>
              <svg width="20" height="20" viewBox="0 0 256 256" fill="var(--ink-700)">
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
              </svg>
              {feature}
            </span>
          ))}
        </div>
        <StoreGrid />
      </div>

      <div className={styles.portrait}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG.lekkiStudent} alt={portraitAlt} />
      </div>
    </section>
  );
}
