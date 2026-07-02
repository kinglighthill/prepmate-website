import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import DownloadButton from "../../components/DownloadButton";
import JsonLd from "../../components/JsonLd";
import {
  allExamSubjectPairs,
  featuresForExamSubject,
  getExam,
  getSubject,
} from "../../pseo";
import { absoluteUrl, breadcrumbJsonLd, makeMetadata } from "../../seo";
import styles from "./subject-hub.module.css";

type Params = { examSlug: string; subjectSlug: string };

export function generateStaticParams(): Params[] {
  return allExamSubjectPairs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { examSlug, subjectSlug } = await params;
  const exam = getExam(examSlug);
  const subject = getSubject(subjectSlug);
  if (!exam || !subject) return {};
  const features = featuresForExamSubject(examSlug, subjectSlug);
  if (features.length === 0) return {};
  return makeMetadata({
    title: `${exam.name} ${subject.name}: Notes, Past Questions & Syllabus`,
    description: `Everything you need to study ${exam.name} ${subject.name} on Prepmate — notes, syllabus, past questions and practice, all in one app.`,
    path: `/${examSlug}/${subjectSlug}`,
    keywords: [
      `${exam.name} ${subject.name}`,
      `${exam.name} ${subject.name} notes`,
      `${exam.name} ${subject.name} past questions`,
      `${exam.name} ${subject.name} syllabus`,
    ],
  });
}

export default async function SubjectHubPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { examSlug, subjectSlug } = await params;
  const exam = getExam(examSlug);
  const subject = getSubject(subjectSlug);
  const features = exam && subject
    ? featuresForExamSubject(examSlug, subjectSlug)
    : [];
  // Only valid if this exam+subject combination actually has pages.
  if (!exam || !subject || features.length === 0) notFound();

  const featureBlurb: Record<string, string> = {
    Notes: "Study clear, exam-focused lessons on every topic.",
    "Past Questions": "Attempt real past questions and review the answers.",
    Syllabus: "Review the full outline of what you're expected to cover.",
    Novels: "Study prescribed texts with summaries and likely questions.",
  };

  return (
    <main className={styles.main}>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: exam.name, path: `/${examSlug}` },
            { name: subject.name, path: `/${examSlug}/${subjectSlug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${exam.name} ${subject.name} on Prepmate`,
            url: absoluteUrl(`/${examSlug}/${subjectSlug}`),
            hasPart: features.map((f) => ({
              "@type": "WebPage",
              name: `${exam.name} ${subject.name} ${f.feature.name}`,
              url: absoluteUrl(f.route),
            })),
          },
        ]}
      />
      <Navbar />

      <div className={styles.body}>
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={`/${examSlug}`}>{exam.name}</Link>
          <span>/</span>
          <span aria-current="page">{subject.name}</span>
        </nav>

        <header className={styles.hero}>
          <span className={styles.tag}>
            {exam.name} · {subject.name}
          </span>
          <h1 className={styles.h1}>
            {exam.name} {subject.name}
          </h1>
          <p className={styles.lead}>
            Prepare for {exam.name} {subject.name} on Prepmate. Pick what you
            want to study below, then continue in the app for the full content
            and practice.
          </p>
          <DownloadButton />
        </header>

        <section className={styles.section} aria-labelledby="features-title">
          <h2
            id="features-title"
            className="h2"
            style={{ textAlign: "left" }}
          >
            Study {exam.name} {subject.name}
          </h2>
          <div className={styles.grid}>
            {features.map((f) => (
              <Link key={f.route} href={f.route} className={styles.card}>
                <h3 className={styles.cardTitle}>
                  {subject.name} {f.feature.name}
                </h3>
                <p className={styles.cardText}>
                  {featureBlurb[f.feature.name] ??
                    `Study ${subject.name} ${f.feature.name.toLowerCase()} on Prepmate.`}
                </p>
                <span className={styles.cardLink}>
                  View {f.feature.name.toLowerCase()} →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
