import { HOW_TO_USE } from "../data";
import DownloadButton from "./DownloadButton";
import PhoneCard from "./PhoneCard";
import SectionHeader from "./SectionHeader";
import styles from "./HowToUse.module.css";

export default function HowToUse() {
  return (
    <section id="how-to-use" className={styles.section}>
      <SectionHeader
        tag="How to Use"
        tagIcon="https://framerusercontent.com/images/QarR7jCeWZ8qrL80Ay7uhECzto.svg?width=20&height=20"
        title="Getting Started with Prepmate"
        subtitle="Follow these simple steps to set up your account and start learning today."
      />

      <div className={styles.grid}>
        <div className={styles.topRow}>
          <div className={styles.cell}>
            <PhoneCard title={HOW_TO_USE[0].title} screen={HOW_TO_USE[0].image} />
          </div>
          <div className={styles.cell}>
            <PhoneCard title={HOW_TO_USE[1].title} screen={HOW_TO_USE[1].image} />
          </div>
        </div>
        <div className={styles.bottomCell}>
          <PhoneCard title={HOW_TO_USE[2].title} screen={HOW_TO_USE[2].image} />
        </div>
      </div>

      <DownloadButton />
    </section>
  );
}
