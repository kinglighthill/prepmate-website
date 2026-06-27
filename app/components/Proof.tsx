import { IMG } from "../data";
import styles from "./Proof.module.css";

const CARDS = [
  {
    number: "20",
    suffix: "+ Exams",
    text: "All Exams in one App. UTME, WASSCE, etc.",
  },
  {
    number: "4",
    suffix: " Platforms",
    text: "Works on Android, iOS, Windows and MacOS",
  },
  {
    number: "",
    suffix: "Offline",
    text: "Content can be saved for offline use.",
  },
];

export default function Proof() {
  return (
    <section className={styles.section}>
      <div className={styles.headingWrap}>
        <h2 className="h2">
          Quality Content With Superior Technology defines Prepmate
        </h2>
      </div>

      <div className={styles.cards}>
        {CARDS.map((card, i) => (
          <div key={i} className={styles.card}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.dots} src={IMG.proofDots} alt="" />
            <div className={styles.number}>
              {card.number}
              {card.suffix}
            </div>
            <p className={styles.text}>{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
