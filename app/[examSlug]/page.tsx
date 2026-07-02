import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DownloadButton from "../components/DownloadButton";
import JsonLd from "../components/JsonLd";
import {
  allExamSlugs,
  featuresForExamSubject,
  getExam,
  subjectsForExam,
} from "../pseo";
import { absoluteUrl, breadcrumbJsonLd, makeMetadata } from "../seo";
import styles from "./hub.module.css";

type Params = { examSlug: string };

export function generateStaticParams(): Params[] {
  return allExamSlugs().map((examSlug) => ({ examSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { examSlug } = await params;
  const exam = getExam(examSlug);
  if (!exam) return {};
  const subjects = subjectsForExam(examSlug);
  return makeMetadata({
    title: `${exam.name} Subjects, Notes, Past Questions & Syllabus`,
    description: `Study for ${exam.name} on Prepmate. Browse ${subjects.length} subjects with notes, past questions, syllabus and novels for exam preparation.`,
    path: `/${examSlug}`,
    keywords: [
      `${exam.name} subjects`,
      `${exam.name} notes`,
      `${exam.name} past questions`,
      `${exam.name} syllabus`,
    ],
  });
}

export default async function ExamHubPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { examSlug } = await params;
  const exam = getExam(examSlug);
  if (!exam) notFound();

  const subjects = subjectsForExam(examSlug);

  return (
    <main className={styles.main}>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: exam.name, path: `/${examSlug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `${exam.name} subjects on Prepmate`,
            url: absoluteUrl(`/${examSlug}`),
            hasPart: subjects.map((s) => ({
              "@type": "WebPage",
              name: `${exam.name} ${s.name}`,
              url: absoluteUrl(`/${examSlug}/${s.slug}`),
            })),
          },
        ]}
      />
      <Navbar />

      <div className={styles.body}>
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">{exam.name}</span>
        </nav>

        <header className={styles.hero}>
          <span className={styles.tag}>{exam.name}</span>
          <h1 className={styles.h1}>
            {`${exam.name} Subjects, Notes, Past Questions & Syllabus`}
          </h1>
          <p className={styles.lead}>
            Prepare for {exam.name} on Prepmate. Choose a subject below to study
            notes, review the syllabus, practise past questions ({exam.practiceQuestionFormat.toLowerCase()}) and,
            where available, prescribed novels.
          </p>
          <DownloadButton />
        </header>

        <section className={styles.section} aria-labelledby="subjects-title">
          <h2 id="subjects-title" className="h2" style={{ textAlign: "left" }}>
            {subjects.length} {exam.name} subjects
          </h2>
          <div className={styles.grid}>
            {subjects.map((s) => {
              const features = featuresForExamSubject(examSlug, s.slug);
              return (
                <article key={s.slug} className={styles.card}>
                  <Link
                    href={`/${examSlug}/${s.slug}`}
                    className={styles.cardTitle}
                  >
                    {exam.name} {s.name}
                  </Link>
                  <div className={styles.featureLinks}>
                    {features.map((f) => (
                      <Link key={f.route} href={f.route}>
                        {f.feature.name}
                      </Link>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
