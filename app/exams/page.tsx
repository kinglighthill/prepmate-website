import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import { DOWNLOAD_LINKS, EXAMS } from "../data";
import styles from "./exams.module.css";

export const metadata: Metadata = {
  title: "Exams | Prepmate",
  description:
    "Explore a growing list of exams currently available on the Prepmate app.",
};

export default function ExamsPage() {
  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.body}>
        <section className={styles.head}>
          <span className={styles.tag}>Exams</span>
          <h1 className="h2">Prepare for your next Exam with Prepmate</h1>
          <p className="body-lg">
            Explore a growing list of exams currently available on the Prepmate
            app. App covers content including Past Questions, Notes, Novels and
            syllabus for the exams below
          </p>
        </section>

        <section className={styles.grid}>
          {EXAMS.map((exam, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.logoBox}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={exam.logo} alt={exam.name} />
              </div>
              <p className={styles.name}>{exam.name}</p>
              <a
                className={styles.download}
                href={DOWNLOAD_LINKS.googlePlay}
                target="_blank"
                rel="noopener"
              >
                <svg width="18" height="18" fill="#fff" viewBox="0 0 24 24">
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                </svg>
                Download
              </a>
            </div>
          ))}
        </section>

        <Testimonials />
      </div>

      <Footer />
    </main>
  );
}
