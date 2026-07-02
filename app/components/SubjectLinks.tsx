import Link from "next/link";
import { getExam, subjectsForExam } from "../pseo";
import styles from "./SubjectLinks.module.css";

export default function SubjectLinks({ examSlug }: { examSlug: string }) {
  const exam = getExam(examSlug);
  const subjects = subjectsForExam(examSlug);
  if (!exam || subjects.length === 0) return null;

  return (
    <section className={styles.wrap} aria-labelledby="subject-links-title">
      <div className={styles.head}>
        <h2 id="subject-links-title" className="h2" style={{ textAlign: "left" }}>
          {`${exam.name} subjects: notes, past questions & syllabus`}
        </h2>
        <p className={styles.lead}>
          Browse all {subjects.length} {exam.name} subjects and study notes,
          past questions and the syllabus for each on Prepmate.
        </p>
      </div>

      <div className={styles.grid}>
        {subjects.map((s) => (
          <Link key={s.slug} href={`/${examSlug}/${s.slug}`} className={styles.chip}>
            {s.name}
          </Link>
        ))}
      </div>

      <Link href={`/${examSlug}`} className={styles.allLink}>
        View all {exam.name} subjects →
      </Link>
    </section>
  );
}
