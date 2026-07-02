import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import DownloadButton from "../../../../components/DownloadButton";
import JsonLd from "../../../../components/JsonLd";
import {
  allLiteratureTextParams,
  getExam,
  getLiteratureText,
  getSubject,
  novelQuestionLabel,
} from "../../../../pseo";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  learningResourceJsonLd,
  makeMetadata,
} from "../../../../seo";
import styles from "../pseo.module.css";

type Params = {
  examSlug: string;
  subjectSlug: string;
  featureSlug: string;
  textSlug: string;
};

export function generateStaticParams(): Params[] {
  return allLiteratureTextParams().map(({ examSlug, textSlug }) => ({
    examSlug,
    subjectSlug: "literature-in-english",
    featureSlug: "novels",
    textSlug,
  }));
}

function isValid(p: Params): boolean {
  return (
    p.subjectSlug === "literature-in-english" &&
    p.featureSlug === "novels" &&
    getExam(p.examSlug) !== null &&
    getLiteratureText(p.examSlug, p.textSlug) !== null
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const p = await params;
  if (!isValid(p)) return {};
  const exam = getExam(p.examSlug)!;
  const text = getLiteratureText(p.examSlug, p.textSlug)!;
  return makeMetadata({
    title: `${exam.name} Literature: ${text.title} Summary, Themes & Questions`,
    description: `Study ${text.title} for ${exam.name} Literature-in-English on Prepmate — summary, setting, themes, characters, outline and likely practice questions.`,
    path: `/${p.examSlug}/${p.subjectSlug}/${p.featureSlug}/${p.textSlug}`,
    keywords: [
      `${text.title} summary`,
      `${text.title} themes`,
      `${text.title} ${exam.name}`,
      `${exam.name} literature in english`,
    ],
  });
}

const TEXT_STEPS = (examName: string) => [
  `Open Prepmate and choose ${examName}.`,
  "Select Literature-in-English, then open Novels.",
  "Open this text to study the outline and answer the practice questions.",
];

export default async function LiteratureTextPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const p = await params;
  if (!isValid(p)) notFound();

  const exam = getExam(p.examSlug)!;
  const subject = getSubject(p.subjectSlug)!;
  const text = getLiteratureText(p.examSlug, p.textSlug)!;
  const questionLabel = novelQuestionLabel(text);
  const novelsRoute = `/${p.examSlug}/${p.subjectSlug}/${p.featureSlug}`;
  const route = `${novelsRoute}/${p.textSlug}`;

  const faqs = [
    {
      q: `Is ${text.title} a ${exam.name} recommended text?`,
      a: `Yes. ${text.title} is a prescribed ${exam.name} Literature-in-English text on Prepmate, with study notes and practice questions to help you prepare.`,
    },
    {
      q: `What does the ${text.title} study material cover?`,
      a: `Prepmate covers ${text.title} with its summary, setting, themes, characterisation, language and style, and a full ${
        text.genre === "drama" ? "act-by-act" : "chapter or event"
      } outline.`,
    },
    ...(questionLabel
      ? [
          {
            q: `How many practice questions are available for ${text.title}?`,
            a: `${text.title} includes ${questionLabel} on Prepmate, based on ${
              text.practiceQuestions?.basis ?? "its chapters, events and study sections"
            }.`,
          },
        ]
      : []),
    {
      q: `Do I need Prepmate to study ${text.title}?`,
      a: `This page outlines what is covered, while the full lessons, questions and answers for ${text.title} are inside the Prepmate app.`,
    },
  ];

  const description = `Study ${text.title} for ${exam.name} Literature-in-English on Prepmate. Get the summary, setting, themes, characterisation, outline${
    questionLabel ? ` and ${questionLabel}` : ""
  }.`;

  return (
    <main className={styles.main}>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: exam.name, path: `/${p.examSlug}` },
            { name: subject.name, path: `/${p.examSlug}/${p.subjectSlug}` },
            { name: "Novels", path: novelsRoute },
            { name: text.title, path: route },
          ]),
          learningResourceJsonLd({
            name: `${text.title} — ${exam.name} Literature study guide`,
            description,
            path: route,
          }),
          faqJsonLd(faqs),
        ]}
      />
      <Navbar />

      <article className={styles.body}>
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={`/${p.examSlug}`}>{exam.name}</Link>
          <span>/</span>
          <Link href={`/${p.examSlug}/${p.subjectSlug}`}>{subject.name}</Link>
          <span>/</span>
          <Link href={novelsRoute}>Novels</Link>
          <span>/</span>
          <span aria-current="page">{text.title}</span>
        </nav>

        <header className={styles.hero}>
          <span className={styles.tag}>
            {exam.name} · Literature-in-English
          </span>
          <h1 className={styles.h1}>{text.title}</h1>
          <p className={styles.lead}>{description}</p>
          <DownloadButton />
        </header>

        {text.outline && text.outline.length > 0 && (
          <section className={styles.section} aria-labelledby="outline-title">
            <h2 id="outline-title" className="h2" style={{ textAlign: "left" }}>
              {text.title} study outline
            </h2>
            {questionLabel && (
              <p className={styles.outlineIntro}>
                {text.title} includes {questionLabel} on Prepmate, covering the
                sections below.
              </p>
            )}
            <div className={styles.groups}>
              <div className={styles.group}>
                <ul className={styles.topicList}>
                  {text.outline.map((item) => (
                    <li key={item.slug}>{item.title}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        <section className={styles.section} aria-labelledby="how-title">
          <h2 id="how-title" className="h2" style={{ textAlign: "left" }}>
            How to study {text.title} on Prepmate
          </h2>
          <ol className={styles.steps}>
            {TEXT_STEPS(exam.name).map((line, i) => (
              <li key={i}>
                <span className={styles.stepNum}>{i + 1}</span>
                <span>{line}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="faq-title">
          <h2 id="faq-title" className="h2" style={{ textAlign: "left" }}>
            Frequently Asked Questions
          </h2>
          <div className={styles.faqList}>
            {faqs.map((faq, i) => (
              <details key={i} className={styles.faqItem}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.ctaBand}>
          <div>
            <h2>Continue in Prepmate</h2>
            <p>
              Download Prepmate to study {text.title} in full, practise
              questions and track your exam preparation.
            </p>
          </div>
          <DownloadButton label="Download Prepmate App" />
        </section>
      </article>

      <Footer />
    </main>
  );
}
