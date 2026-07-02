import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ExploreScreens from "../components/ExploreScreens";
import Testimonials from "../components/Testimonials";
import DownloadButton from "../components/DownloadButton";
import StoreGrid from "../components/StoreGrid";
import JsonLd from "../components/JsonLd";
import { IMG } from "../data";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  makeMetadata,
  softwareApplicationJsonLd,
} from "../seo";
import styles from "../jamb-cbt-practice-download/download.module.css";
import seo from "../components/SeoContent.module.css";

const description =
  "Practice WAEC past questions and answers with Prepmate. Prepare for WASSCE with CBT practice, study notes, novels, syllabus, and detailed results.";

const FEATURES = [
  "Up-to-date WAEC past questions and answers",
  "CBT practice interface",
  "Built-in timer feature",
  "Concise study notes on various subjects",
  "Detailed results breakdown",
  "Built-in Syllabus",
  "WAEC and Literature Novels",
  "CBT mode, Study mode, Mock mode, and Game mode",
];

const INTRO_PARAGRAPHS = [
  "The West African Senior School Certificate Examination (WASSCE), set by the West African Examinations Council (WAEC), is one of the most important exams for secondary school students in Nigeria and across West Africa. Strong preparation with real WAEC past questions and answers is the fastest way to understand how the exam is set, which topics recur, and how marks are awarded.",
  "Prepmate brings years of WAEC past questions and answers together in one app so you can practise anytime, online or completely offline. Instead of carrying stacks of past-question booklets, you get a searchable, timed, exam-realistic CBT experience on your phone, tablet or computer, with worked answers and explanations to help you learn from every question you attempt.",
  "Whether you are a school candidate or a private (GCE) candidate, you can rehearse full WASSCE papers under timed conditions, review detailed result breakdowns to see your weak areas, and study the recommended novels and syllabus for each subject, all in the same place.",
];

const SUBJECTS = [
  "English Language",
  "Mathematics",
  "Biology",
  "Chemistry",
  "Physics",
  "Economics",
  "Government",
  "Literature-in-English",
  "Financial Accounting",
  "Commerce",
  "Geography",
  "Agricultural Science",
];

const WASSCE_FAQS = [
  {
    q: "Are the WAEC past questions on Prepmate up to date?",
    a: "Yes. Prepmate's WAEC past questions and answers are regularly updated to stay in line with the current WASSCE syllabus and the way WAEC sets its papers, so you practise with relevant, exam-realistic questions.",
  },
  {
    q: "Can I practise WASSCE past questions offline?",
    a: "Yes. Once your WAEC content is downloaded, you can practise past questions, take mock exams and read study notes offline, with no internet connection required, which is ideal for uninterrupted revision.",
  },
  {
    q: "Do the WAEC past questions come with answers and explanations?",
    a: "Every WAEC past question on Prepmate comes with the correct answer, and many include explanations so you understand why an answer is right rather than just memorising it.",
  },
  {
    q: "Which WASSCE subjects are covered?",
    a: "Prepmate covers the core WASSCE subjects including English Language, Mathematics, the sciences (Biology, Chemistry, Physics), commercial subjects, arts and social sciences, plus the recommended literature novels and syllabus for each.",
  },
  {
    q: "Is Prepmate suitable for private (GCE) WASSCE candidates?",
    a: "Yes. Both school candidates and private (GCE) candidates can use Prepmate to prepare for WASSCE with CBT practice, mock exams, study notes, novels and syllabus.",
  },
  {
    q: "Is Prepmate free to use for WAEC preparation?",
    a: "Prepmate is free to download and start practising WAEC past questions. Some premium content may require activation, but core practice features are available to every student.",
  },
];

export const metadata: Metadata = makeMetadata({
  title: "WAEC Past Questions and Answers for WASSCE",
  description,
  path: "/wassce-past-questions-answers",
  keywords: [
    "WAEC past questions and answers",
    "WASSCE past questions",
    "WAEC CBT practice",
    "WASSCE exam preparation",
  ],
});

function PlatformAvailability() {
  return (
    <div className={styles.availableRow}>
      <span className={styles.availableLabel}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG.availableIcon} alt="" />
        App Available For
      </span>
      <div className={styles.platforms}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG.platformAndroid} alt="Android" />
        <span className={styles.platformDivider} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG.platformApple} alt="Apple" />
        <span className={styles.platformDivider} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG.platformWindows} alt="Windows" />
        <span className={styles.platformDivider} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG.platformMac} alt="Mac" />
      </div>
    </div>
  );
}

export default function WasscePastQuestionsAnswersPage() {
  return (
    <main className={styles.main}>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            {
              name: "WAEC Past Questions and Answers",
              path: "/wassce-past-questions-answers",
            },
          ]),
          softwareApplicationJsonLd({
            name: "Prepmate WASSCE Past Questions and Answers",
            description,
            path: "/wassce-past-questions-answers",
            featureList: FEATURES,
          }),
          faqJsonLd(WASSCE_FAQS),
        ]}
      />
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            WASSCE
          </div>

          <div className={styles.text}>
            <h1>WAEC Past Questions and Answers</h1>
            <p>
              Prepare for <strong>WASSCE</strong>{" "}
              <br />
              with <strong>Past Questions, Answers, Notes,</strong>
              <br />
              <strong>Novels and Syllabus</strong>
            </p>
          </div>

          <DownloadButton className={styles.cta} />
          <PlatformAvailability />
        </div>

        <div className={styles.slider}>
          <ExploreScreens variant="compact" />
          <DownloadButton className={styles.sliderCta} />
        </div>
      </section>

      <div className={styles.body}>
        <section className={styles.features}>
          <div className={styles.featuresLeft}>
            <h2 className="h2" style={{ textAlign: "left" }}>
              Features
            </h2>
            <div className={styles.pills}>
              {FEATURES.map((feature) => (
                <span key={feature} className={styles.pill}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 256 256"
                    fill="var(--ink-700)"
                  >
                    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                  </svg>
                  {feature}
                </span>
              ))}
            </div>
            <StoreGrid />
          </div>

          <div className={styles.portrait}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMG.lekkiStudent}
              alt="Student practising WAEC past questions on Prepmate"
            />
          </div>
        </section>

        <section className={seo.prose} aria-labelledby="wassce-about">
          <h2 id="wassce-about" className="h2" style={{ textAlign: "left" }}>
            Prepare for WASSCE with real WAEC past questions
          </h2>
          {INTRO_PARAGRAPHS.map((para, i) => (
            <p key={i}>{para}</p>
          ))}

          <h3>WASSCE subjects you can practise on Prepmate</h3>
          <p>
            Prepmate covers WAEC past questions and answers across the core
            WASSCE subjects, including:
          </p>
          <ul className={seo.subjectList}>
            {SUBJECTS.map((subject) => (
              <li key={subject}>{subject}</li>
            ))}
          </ul>
          <p>
            Each subject includes past questions with answers, concise study
            notes and the relevant syllabus, plus the recommended literature
            novels where applicable, so you can revise the exact material WAEC
            examines.
          </p>
        </section>

        <section className={seo.faq} aria-labelledby="wassce-faq">
          <h2 id="wassce-faq" className="h2">
            WAEC / WASSCE Frequently Asked Questions
          </h2>
          <div className={seo.faqList}>
            {WASSCE_FAQS.map((faq) => (
              <details key={faq.q} className={seo.faqItem}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <Testimonials />
      </div>

      <Footer />
    </main>
  );
}
