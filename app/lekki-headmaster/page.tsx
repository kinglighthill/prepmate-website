import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import StoreGrid from "../components/StoreGrid";
import DownloadButton from "../components/DownloadButton";
import { IMG } from "../data";
import styles from "./lekki.module.css";

export const metadata: Metadata = {
  title: "Lekki Headmaster | Prepmate",
  description:
    "Chapter by Chapter Summary and Analysis including 200 Likely Questions, Answers and References.",
};

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
      <Navbar />

      <div className={styles.body}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.tag}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.ticker1} alt="" />
          </div>
          <h1 className="h2">Lekki Headmaster</h1>
          <p className="body-lg">
            Chapter by Chapter Summary and Analysis including 200 Likely
            Questions, Answers and References
          </p>

          <DownloadButton />

          <div className={styles.availableRow}>
            <span>App Available For</span>
            <div className={styles.platforms}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.platformAndroid} alt="Android" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.platformApple} alt="Apple" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.platformWindows} alt="Windows" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.platformMac} alt="Mac" />
            </div>
          </div>

          <div className={styles.heroImage}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.heroImage} alt="Lekki Headmaster on Prepmate" />
          </div>

          <DownloadButton />
        </section>

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
            <img
              src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900&q=80&auto=format&fit=crop"
              alt="Student"
            />
          </div>
        </section>

        <Testimonials />
      </div>

      <Footer />
    </main>
  );
}
