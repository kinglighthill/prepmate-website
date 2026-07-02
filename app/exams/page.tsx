import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import DownloadButton from "../components/DownloadButton";
import SubjectMarquee from "../components/SubjectMarquee";
import JsonLd from "../components/JsonLd";
import { EXAMS } from "../data";
import { allExamSlugs, getExam, subjectsForExam } from "../pseo";
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
                <Image
                  src={exam.logo}
                  alt={`${exam.name} logo`}
                  width={110}
                  height={110}
                  sizes="110px"
                  loading={i < 8 ? "eager" : "lazy"}
                  style={{
                    width: "auto",
                    height: "auto",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <p className={styles.name}>{exam.name}</p>
              <DownloadButton className={styles.download} />
            </article>
          ))}
        </section>

        <section className={styles.browse} aria-labelledby="browse-title">
          <h2 id="browse-title" className="h2">
            Browse subjects, notes, past questions &amp; syllabus
          </h2>
          <div className={styles.browseGrid}>
            {allExamSlugs().map((slug) => {
              const exam = getExam(slug);
              const subjects = subjectsForExam(slug);
              if (!exam) return null;
              return (
                <div key={slug} className={styles.browseExam}>
                  <Link href={`/${slug}`} className={styles.browseHead}>
                    {exam.name} Subjects →
                  </Link>
                  <SubjectMarquee examSlug={slug} subjects={subjects} />
                </div>
              );
            })}
          </div>
        </section>

        <Testimonials />
      </div>

      <Footer />
    </main>
  );
}
