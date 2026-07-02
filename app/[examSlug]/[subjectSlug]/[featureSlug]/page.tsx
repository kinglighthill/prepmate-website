import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import DownloadButton from "../../../components/DownloadButton";
import JsonLd from "../../../components/JsonLd";
import { allPages, buildView, getPage, novelQuestionLabel } from "../../../pseo";
import { breadcrumbJsonLd, faqJsonLd, makeMetadata } from "../../../seo";
import styles from "./pseo.module.css";

type Params = {
  examSlug: string;
  subjectSlug: string;
  featureSlug: string;
};

export function generateStaticParams(): Params[] {
  return allPages().map((p) => p.params);
}

function outlineHeading(feature: string, exam: string, subject: string): string {
  switch (feature) {
    case "syllabus":
      return `${exam} ${subject} syllabus topics`;
    case "past-questions":
      return `Topics covered in ${exam} ${subject} past questions`;
    case "notes":
    default:
      return `${exam} ${subject} notes: topics covered`;
  }
}

function outlineIntro(feature: string, exam: string, subject: string): string {
  switch (feature) {
    case "syllabus":
      return `These are the areas the ${exam} ${subject} syllabus expects you to cover. Use them as a checklist as you revise on Prepmate.`;
    case "past-questions":
      return `${exam} ${subject} past questions on Prepmate are drawn from across these topics, so you can practise the full breadth of the exam.`;
    case "notes":
    default:
      return `Prepmate's ${exam} ${subject} notes cover each of these topics with clear, exam-focused lessons and examples.`;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { examSlug, subjectSlug, featureSlug } = await params;
  const page = getPage(examSlug, subjectSlug, featureSlug);
  if (!page) return {};
  const view = buildView(page);
  return makeMetadata({
    title: view.metaTitle.replace(" | Prepmate", ""),
    description: view.description,
    path: page.route,
    keywords: [
      `${view.exam.name} ${view.subject.name}`,
      `${view.exam.name} ${view.subject.name} ${view.feature.name.toLowerCase()}`,
      `${view.subject.name} ${view.feature.name.toLowerCase()}`,
    ],
  });
}

export default async function PseoLeafPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { examSlug, subjectSlug, featureSlug } = await params;
  const page = getPage(examSlug, subjectSlug, featureSlug);
  if (!page) notFound();

  const view = buildView(page);

  return (
    <main className={styles.main}>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: view.exam.name, path: `/${view.exam.slug}` },
            {
              name: view.subject.name,
              path: `/${view.exam.slug}/${view.subject.slug}`,
            },
            { name: view.feature.name, path: page.route },
          ]),
          faqJsonLd(view.faqs.map((f) => ({ q: f.q, a: f.a }))),
        ]}
      />
      <Navbar />

      <article className={styles.body}>
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={`/${view.exam.slug}`}>{view.exam.name}</Link>
          <span>/</span>
          <Link href={`/${view.exam.slug}/${view.subject.slug}`}>
            {view.subject.name}
          </Link>
          <span>/</span>
          <span aria-current="page">{view.feature.name}</span>
        </nav>

        <header className={styles.hero}>
          <span className={styles.tag}>
            {view.exam.name} · {view.feature.name}
          </span>
          <h1 className={styles.h1}>{view.h1}</h1>
          <p className={styles.lead}>{view.description}</p>
          <DownloadButton />
        </header>

        {view.outlineType === "topics" && view.topicGroups.length > 0 && (
          <section className={styles.section} aria-labelledby="outline-title">
            <h2 id="outline-title" className="h2" style={{ textAlign: "left" }}>
              {outlineHeading(view.feature.slug, view.exam.name, view.subject.name)}
            </h2>
            <p className={styles.outlineIntro}>
              {outlineIntro(view.feature.slug, view.exam.name, view.subject.name)}
            </p>
            <div className={styles.groups}>
              {view.topicGroups.map((group) => (
                <div key={group.slug} className={styles.group}>
                  <h3 className={styles.groupTitle}>{group.title}</h3>
                  <ul className={styles.topicList}>
                    {group.topics.map((topic) => (
                      <li key={topic.slug}>{topic.title}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {view.outlineType === "novels" && view.novels.length > 0 && (
          <section className={styles.section} aria-labelledby="novels-title">
            <h2 id="novels-title" className="h2" style={{ textAlign: "left" }}>
              Prescribed text{view.novels.length > 1 ? "s" : ""}
            </h2>

            {view.linkTexts ? (
              <div className={styles.textGrid}>
                {view.novels.map((novel) => {
                  const label = novelQuestionLabel(novel);
                  return (
                    <Link
                      key={novel.slug}
                      href={`${page.route}/${novel.slug}`}
                      className={styles.textCard}
                    >
                      <span className={styles.textTitle}>{novel.title}</span>
                      {label && (
                        <span className={styles.textMeta}>{label}</span>
                      )}
                      <span className={styles.textLink}>Study text →</span>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className={styles.groups}>
                {view.novels.map((novel) => {
                  const label = novelQuestionLabel(novel);
                  return (
                    <div key={novel.slug} className={styles.group}>
                      <h3 className={styles.groupTitle}>
                        {novel.title}
                        {label ? ` — ${label}` : ""}
                      </h3>
                      {novel.outline && (
                        <ul className={styles.topicList}>
                          {novel.outline.map((item) => (
                            <li key={item.slug}>{item.title}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {view.instructions.length > 0 && (
          <section className={styles.section} aria-labelledby="how-title">
            <h2 id="how-title" className="h2" style={{ textAlign: "left" }}>
              How to study {view.subject.name} {view.feature.name} on Prepmate
            </h2>
            <ol className={styles.steps}>
              {view.instructions.map((line, i) => (
                <li key={i}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  <span>{line}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {view.faqs.length > 0 && (
          <section className={styles.section} aria-labelledby="faq-title">
            <h2 id="faq-title" className="h2" style={{ textAlign: "left" }}>
              Frequently Asked Questions
            </h2>
            <div className={styles.faqList}>
              {view.faqs.map((faq, i) => (
                <details key={i} className={styles.faqItem}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <section className={styles.ctaBand}>
          <div>
            <h2>{view.cta.title}</h2>
            <p>{view.cta.body}</p>
          </div>
          <DownloadButton label={view.cta.buttonText} />
        </section>
      </article>

      <Footer />
    </main>
  );
}
