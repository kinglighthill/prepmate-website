import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ExamTicker from "../components/ExamTicker";
import ExploreScreens from "../components/ExploreScreens";
import Testimonials from "../components/Testimonials";
import DownloadOptions from "../components/DownloadOptions";
import { IMG } from "../data";
import styles from "./utme.module.css";
// Hero uses the boxed DownloadOptions selector (matches the original design).

export const metadata: Metadata = {
  title: "UTME (JAMB CBT) | Prepmate",
  description:
    "Score 300+ in JAMB CBT. Access Notes, Past Questions, Syllabus and Novels all in one App.",
};

export default function JambCbtPage() {
  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.body}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroDevices}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.heroImage} alt="Prepmate UTME app" />
          </div>

          <div className={styles.heroText}>
            <h1 className="h2">UTME (JAMB CBT)</h1>
            <p className="body-lg">
              Score 300+ in 2024 JAMB CBT. Access Notes, Past Questions,
              Syllabus and Novels all in one App. Click the download button
              below to continue ⬇️
            </p>
          </div>

          <DownloadOptions />
        </section>

        <ExamTicker />
        <ExploreScreens />
        <Testimonials />
      </div>

      <Footer />
    </main>
  );
}
