import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import DownloadButton from "../components/DownloadButton";
import JsonLd from "../components/JsonLd";
import { EXAMS } from "../data";
import {
  breadcrumbJsonLd,
  examItemListJsonLd,
  makeMetadata,
} from "../seo";
import styles from "./exams.module.css";

const description =
  "Explore exams supported by Prepmate, including UTME JAMB CBT and WASSCE past questions with practice questions, notes, novels and syllabus.";

export const metadata: Metadata = makeMetadata({
  title: "Exams Supported by Prepmate",
  description,
  path: "/exams",
  keywords: [
    "exams supported by Prepmate",
    "JAMB CBT exam app",
    "WASSCE exam app",
    "WAEC and JAMB practice",
  ],
});

export default function ExamsPage() {
  return (
    <main className={styles.main}>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Exams", path: "/exams" },
          ]),
          examItemListJsonLd(EXAMS),
        ]}
      />
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
            <article key={i} className={styles.card}>
              <Link
                href={exam.href}
                className={styles.detailsLink}
                aria-label={`View ${exam.name} details`}
              />
              <div className={styles.logoBox}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={exam.logo} alt={exam.name} />
              </div>
              <p className={styles.name}>{exam.name}</p>
              <DownloadButton className={styles.download} />
            </article>
          ))}
        </section>

        <Testimonials />
      </div>

      <Footer />
    </main>
  );
}
