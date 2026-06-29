import { IMG } from "../data";
import styles from "./CBTForSchools.module.css";

const BENEFITS = [
  "Bring your own questions",
  "Connect locally using LAN",
  "Add students and assign them to exams",
  "Import questions from UTME and WASSCE",
  "Students can check results online",
  "And so much more",
];

export default function CBTForSchools() {
  return (
    <section className={styles.section} aria-labelledby="cbt-schools-title">
      <div className={styles.copy}>
        <span className={styles.tag}>CBT for Schools</span>

        <div className={styles.heading}>
          <h2 id="cbt-schools-title" className="h2">
            Conduct CBT for your School
          </h2>
          <p>
            For schools, tutorials or learning centers looking to adopt CBT mode
            of testing for their students, try Venlearn CBT.
          </p>
        </div>

        <div className={styles.list}>
          {BENEFITS.map((benefit) => (
            <div key={benefit} className={styles.item}>
              <span className={styles.check} aria-hidden="true">
                <svg viewBox="0 0 256 256">
                  <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                </svg>
              </span>
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        <a
          className={styles.cta}
          href="https://venlearn.com/features/cbt-offline-online"
          target="_blank"
          rel="noopener"
        >
          Visit Venlearn CBT
          <svg viewBox="0 0 256 256" aria-hidden="true">
            <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
          </svg>
        </a>
      </div>

      <div className={styles.visual}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG.venlearnCbtLan} alt="CBT exams connected over LAN" />
      </div>
    </section>
  );
}
