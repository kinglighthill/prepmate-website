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
  makeMetadata,
  softwareApplicationJsonLd,
} from "../seo";
import styles from "../jamb-cbt-practice-download/download.module.css";

const description =
  "Computer Based Testing Software for UTME preparation with Practice Questions, Notes, Novels and Syllabus";

const FEATURES = [
  "Up-to-date past and modelled questions",
  "CBT practice interface",
  "Built-in timer feature",
  "Concise study notes on various subjects",
  "Detailed results breakdown",
  "Built-in Syllabus",
  "JAMB and Literature Novels",
  "CBT mode, Study mode, Mock mode, and Game mode",
];

export const metadata: Metadata = makeMetadata({
  title: "JAMB CBT Practice Software for UTME",
  description,
  path: "/jamb-cbt-practice",
  keywords: [
    "JAMB CBT practice software",
    "UTME CBT practice",
    "JAMB past questions and answers",
    "JAMB mock exam app",
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

export default function JambCbtPracticePage() {
  return (
    <main className={styles.main}>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "JAMB CBT Practice", path: "/jamb-cbt-practice" },
          ]),
          softwareApplicationJsonLd({
            name: "Prepmate JAMB CBT Practice Software",
            description,
            path: "/jamb-cbt-practice",
            featureList: FEATURES,
          }),
        ]}
      />
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            UTME 2026
          </div>

          <div className={styles.text}>
            <h1>2026 JAMB CBT Practice Software</h1>
            <p>
              Computer Based Testing Software for <strong>UTME</strong>
              <br />
              preparation with <strong>Practice Questions, Notes,</strong>
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
            <img src={IMG.lekkiStudent} alt="Student" />
          </div>
        </section>

        <Testimonials />
      </div>

      <Footer />
    </main>
  );
}
