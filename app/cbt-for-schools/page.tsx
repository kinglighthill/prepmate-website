import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import JsonLd from "../components/JsonLd";
import { IMG } from "../data";
import { breadcrumbJsonLd, makeMetadata, serviceJsonLd } from "../seo";
import styles from "./schools.module.css";

const VENLEARN_CBT_URL = "https://venlearn.com/features/cbt-offline-online";

const FEATURES = [
  {
    title: "Bring your own questions",
    text: "Create exams with your institution's own questions, subjects, marking schemes and exam settings.",
  },
  {
    title: "Different question types",
    text: "Set multiple choice single-select, multiple choice multi-select, fill in the blank, and theory questions.",
  },
  {
    title: "Works 100% offline using LAN",
    text: "Venlearn CBT can be configured to work offline using a local area network (LAN). It can also be hosted online if needed.",
  },
  {
    title: "Manage students and exams",
    text: "Add learners, organize them into exam groups, assign tests and keep the testing workflow orderly.",
  },
  {
    title: "Import UTME and WASSCE questions",
    text: "Use existing UTME and WASSCE question banks to quickly prepare realistic practice and mock exams.",
  },
  {
    title: "Online result access",
    text: "Let students check results online after exams, reducing manual result handling for administrators.",
  },
  {
    title: "Built for learning centers",
    text: "Designed for schools, tutorials and learning centers that need a practical CBT setup without unnecessary complexity.",
  },
];

const STEPS = [
  "Prepare questions or import exam content",
  "Create students and assign exams",
  "Connect devices on LAN and start CBT",
  "Publish results for students to review",
];

const description =
  "Venlearn CBT helps schools, tutorials and learning centres conduct computer based testing offline or online for students or candidates using their own questions.";

export const metadata: Metadata = makeMetadata({
  title: "CBT for Schools and Learning Centres",
  description,
  path: "/cbt-for-schools",
  keywords: [
    "CBT for schools",
    "Venlearn CBT",
    "offline CBT software",
    "LAN CBT exams",
    "computer based testing for schools",
  ],
  image: IMG.venlearnCbtLan,
});

function ArrowIcon() {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true">
      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 256 256" aria-hidden="true">
      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
    </svg>
  );
}

export default function CBTForSchoolsPage() {
  return (
    <main className={styles.main}>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "CBT for Schools", path: "/cbt-for-schools" },
          ]),
          serviceJsonLd({
            name: "Venlearn CBT for Schools",
            description,
            path: "/cbt-for-schools",
            serviceUrl: VENLEARN_CBT_URL,
          }),
        ]}
      />
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.tag}>CBT for Schools</span>
          <h1>Conduct CBT for your School</h1>
          <p>
            Venlearn CBT helps schools, tutorials and learning centres conduct
            computer based testing offline or online for students or candidates
            using their own questions.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryCta} href={VENLEARN_CBT_URL} target="_blank" rel="noopener">
              Visit Venlearn CBT
              <ArrowIcon />
            </a>
            <a className={styles.secondaryCta} href="#features">
              View features
            </a>
          </div>
        </div>

        <div className={styles.heroImage}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.venlearnCbtLan} alt="CBT exams connected over LAN" />
        </div>
      </section>

      <div className={styles.body}>
        <section id="features" className={styles.features}>
          <div className={styles.sectionHead}>
            <span className={styles.tag}>What Venlearn CBT Supports</span>
            <h2 className="h2">Everything needed to run CBT exams</h2>
            <p>
              Set up practical CBT sessions for internal exams, mock exams,
              tutorials and learning-center assessments.
            </p>
          </div>

          <div className={styles.grid}>
            {FEATURES.map((feature) => (
              <article key={feature.title} className={styles.card}>
                <span className={styles.cardIcon}>
                  <CheckIcon />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>

          <a className={styles.gridCta} href={VENLEARN_CBT_URL} target="_blank" rel="noopener">
            Learn more
            <ArrowIcon />
          </a>
        </section>

        <section className={styles.flow}>
          <div className={styles.flowCopy}>
            <span className={styles.tag}>How it works</span>
            <h2 className="h2">From question setup to published results</h2>
            <p>
              Venlearn CBT is built around the practical workflow schools and
              tutorial centers already use when conducting exams.
            </p>
          </div>

          <div className={styles.steps}>
            {STEPS.map((step, index) => (
              <div key={step} className={styles.step}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.ctaBand}>
          <div>
            <span className={styles.tag}>Venlearn CBT</span>
            <h2>Ready to conduct CBT in your school?</h2>
            <p>
              Try Venlearn CBT for local-network exams, student assignment,
              question imports and result access.
            </p>
          </div>
          <a className={styles.primaryCta} href={VENLEARN_CBT_URL} target="_blank" rel="noopener">
            Visit Venlearn CBT
            <ArrowIcon />
          </a>
        </section>

        <Testimonials />
      </div>

      <Footer />
    </main>
  );
}
