import { IMG, TESTIMONIALS_ROW1, TESTIMONIALS_ROW2 } from "../data";
import DownloadButton from "./DownloadButton";
import SectionHeader from "./SectionHeader";
import styles from "./Testimonials.module.css";

type Review = { initials: string; name: string; text: string };

function Card({ review }: { review: Review }) {
  return (
    <div className={styles.card}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.cardBg} src={IMG.testimonialBg} alt="" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.comma} src={IMG.comma} alt="" />

      <div className={styles.head}>
        <div className={styles.avatar}>{review.initials}</div>
        <div className={styles.meta}>
          <div className={styles.name}>{review.name}</div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.stars} src={IMG.stars} alt="5 stars" />
        </div>
      </div>

      <div className={styles.line} />

      <p className={styles.text}>{review.text}</p>
    </div>
  );
}

function Row({
  reviews,
  reverse,
}: {
  reviews: Review[];
  reverse?: boolean;
}) {
  const items = [...reviews, ...reviews, ...reviews];
  return (
    <div className={styles.marquee}>
      <ul className={`${styles.track} ${reverse ? styles.reverse : ""}`}>
        {items.map((r, i) => (
          <li key={i}>
            <Card review={r} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className={styles.section}>
      <SectionHeader
        tag="Our Testimonials"
        tagIcon={IMG.interfaceTagIcon}
        title="User Reviews and Feedback"
        subtitle="See how Prepmate has transformed users' performance and experience"
      />

      <div className={styles.rows}>
        <Row reviews={TESTIMONIALS_ROW1} />
        <Row reviews={TESTIMONIALS_ROW2} reverse />
      </div>

      <DownloadButton />
    </section>
  );
}
