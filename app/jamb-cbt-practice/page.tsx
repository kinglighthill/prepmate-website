import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ExploreScreens from "../components/ExploreScreens";
import Testimonials from "../components/Testimonials";
import DownloadButton from "../components/DownloadButton";
import FeaturesSection from "../components/FeaturesSection";
import SubjectLinks from "../components/SubjectLinks";
import JambSeoContent from "../components/JambSeoContent";
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
            UTME 2027
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
        <FeaturesSection features={FEATURES} />

        <JambSeoContent />

        <SubjectLinks examSlug="jamb" />

        <Testimonials />
      </div>

      <Footer />
    </main>
  );
}
