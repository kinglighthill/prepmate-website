import Link from "next/link";
import type { PseoSubject } from "../pseo";
import styles from "./SubjectMarquee.module.css";

const ROWS = 4;

export default function SubjectMarquee({
  examSlug,
  subjects,
}: {
  examSlug: string;
  subjects: PseoSubject[];
}) {
  const rows: PseoSubject[][] = Array.from({ length: ROWS }, () => []);
  subjects.forEach((s, i) => rows[i % ROWS].push(s));

  return (
    <div className={styles.rows}>
      {rows.map((row, r) => {
        if (row.length === 0) return null;
        const items = [...row, ...row, ...row];
        return (
          <div key={r} className={styles.marquee}>
            <ul
              className={`${styles.track} ${r % 2 === 1 ? styles.reverse : ""}`}
            >
              {items.map((s, i) => (
                <li key={`${s.slug}-${i}`}>
                  <Link href={`/${examSlug}/${s.slug}`} className={styles.chip}>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
