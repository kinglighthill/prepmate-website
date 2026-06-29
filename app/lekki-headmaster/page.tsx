import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import StoreGrid from "../components/StoreGrid";
import OSIcon from "../components/OSIcon";
import JsonLd from "../components/JsonLd";
import { DOWNLOAD_LINKS, IMG } from "../data";
import {
  breadcrumbJsonLd,
  learningResourceJsonLd,
  makeMetadata,
} from "../seo";
import styles from "./lekki.module.css";

const description =
  "Study The Lekki Headmaster on Prepmate with chapter by chapter summary, analysis, likely questions, answers and references for exam preparation.";

export const metadata: Metadata = makeMetadata({
  title: "Lekki Headmaster Summary, Questions and Answers",
  description,
  path: "/lekki-headmaster",
  keywords: [
    "Lekki Headmaster summary",
    "Lekki Headmaster questions and answers",
    "JAMB literature novel",
    "Lekki Headmaster analysis",
  ],
  image: IMG.lekkiHeroScreen,
});

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

export default function LekkiHeadmasterPage() {
  return (
    <main className={styles.main}>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Lekki Headmaster", path: "/lekki-headmaster" },
          ]),
          learningResourceJsonLd({
            name: "Lekki Headmaster Summary, Questions and Answers",
            description,
            path: "/lekki-headmaster",
          }),
        ]}
      />
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className={styles.heroTitleRow}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.jambLogo} src={IMG.jamb} alt="JAMB logo" />
            <h1 className={styles.heroTitle}>Lekki Headmaster</h1>
          </div>
          <p className={styles.heroText}>
            Chapter by Chapter Summary and Analysis including
            <br />
            200 Likely Questions, Answers and References
          </p>

          <a
            className={styles.heroCta}
            href={DOWNLOAD_LINKS.mac}
            target="_blank"
            rel="noopener"
          >
            <OSIcon os="macos" />
            Download for Mac
          </a>

          <div className={styles.availableRow}>
            <span className={styles.availableLabel}>
              <span className={styles.infoIcon}>i</span>
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
        </div>

        <div className={styles.heroImage}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.lekkiHeroScreen} alt="Lekki Headmaster on Prepmate" />
        </div>
      </section>

      <div className={styles.body}>
        {/* Other Useful Features + portrait */}
        <section className={styles.features}>
          <div className={styles.featuresLeft}>
            <h2 className="h2" style={{ textAlign: "left" }}>
              Other Useful Features
            </h2>
            <div className={styles.pills}>
              {FEATURES.map((f, i) => (
                <span key={i} className={styles.pill}>
                  <svg width="20" height="20" viewBox="0 0 256 256" fill="var(--ink-700)">
                    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z" />
                  </svg>
                  {f}
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
