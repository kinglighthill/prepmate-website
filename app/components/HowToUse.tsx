import { HOW_TO_USE, IMG } from "../data";
import DownloadButton from "./DownloadButton";
import PhoneCard from "./PhoneCard";
import SectionHeader from "./SectionHeader";
import styles from "./HowToUse.module.css";

export default function HowToUse() {
  return (
    <section id="how-to-use" className={styles.section}>
      <SectionHeader
        tag="How to Use"
        tagIcon={IMG.howToUseTagIcon}
        title="Getting Started with Prepmate"
        subtitle="Follow these simple steps to set up your account and start learning today."
      />

      <div className={styles.grid}>
        {HOW_TO_USE.map((step) => (
          <div className={styles.cell} key={step.title}>
            <PhoneCard title={step.title} screen={step.image} />
          </div>
        ))}
      </div>

      <DownloadButton />
    </section>
  );
}
