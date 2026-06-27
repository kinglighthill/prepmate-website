import { IMG } from "../data";
import styles from "./PhoneCard.module.css";

export default function PhoneCard({
  title,
  screen,
}: {
  title?: string;
  screen: string;
}) {
  return (
    <div className={styles.card}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.cardBg} src={IMG.cardBg} alt="" />
      <div className={styles.gradient} />

      {title && (
        <div className={styles.textBox}>
          <h3 className="h3" style={{ textAlign: "center" }}>
            {title}
          </h3>
        </div>
      )}

      <div className={styles.phoneArea}>
        <div className={styles.phone}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.frame} src={IMG.phoneFrame} alt="" />
          <div className={styles.uiImage}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={screen} alt="App screen" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.camera} src={IMG.phoneCamera} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
