import Link from "next/link";
import { TICKER_LOGOS } from "../data";
import styles from "./ExamTicker.module.css";

export default function ExamTicker() {
  // duplicate logos for seamless marquee
  const logos = [...TICKER_LOGOS, ...TICKER_LOGOS, ...TICKER_LOGOS];

  return (
    <div className={styles.wrap}>
      <h2 className={styles.heading}>20+ Exams Supported.</h2>

      <div className={styles.marquee}>
        <ul className={styles.track}>
          {logos.map((logo, i) => (
            <li key={i} className={styles.logo}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo} alt="Exam logo" />
            </li>
          ))}
        </ul>
      </div>

      <Link className={styles.seeAll} href="/exams">
        <span>See all Exams</span>
        <svg width="14" height="14" viewBox="0 0 256 256" fill="var(--primary)">
          <path d="M224.49,136.49l-72,72a12,12,0,0,1-17-17L187,140H40a12,12,0,0,1,0-24H187L135.51,64.48a12,12,0,0,1,17-17l72,72A12,12,0,0,1,224.49,136.49Z" />
        </svg>
      </Link>
    </div>
  );
}
