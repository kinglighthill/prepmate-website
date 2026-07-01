import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ExamTicker from "./components/ExamTicker";
import Proof from "./components/Proof";
import Features from "./components/Features";
import CBTForSchools from "./components/CBTForSchools";
import HowToUse from "./components/HowToUse";
import Testimonials from "./components/Testimonials";
import ExploreScreens from "./components/ExploreScreens";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import JsonLd from "./components/JsonLd";
import {
  faqJsonLd,
  makeMetadata,
  softwareApplicationJsonLd,
} from "./seo";
import styles from "./page.module.css";

const description =
  "Download Prepmate for JAMB CBT, WAEC/WASSCE past questions, study notes, novels, syllabus and offline exam practice on Android, iOS, Windows and macOS.";

export const metadata: Metadata = makeMetadata({
  title: "Prepmate - JAMB CBT, WAEC Past Questions and Exam Prep App",
  description,
  path: "/",
  keywords: [
    "JAMB CBT app",
    "WAEC exam preparation",
    "WASSCE practice questions",
    "Prepmate download",
  ],
});

export default function Home() {
  return (
    <main className={styles.main}>
      <JsonLd
        data={[
          softwareApplicationJsonLd({
            name: "Prepmate",
            description,
            path: "/",
            featureList: [
              "JAMB CBT practice questions",
              "WAEC and WASSCE past questions",
              "Offline exam preparation",
              "Study notes, novels and syllabus",
              "Android, iOS, Windows and macOS downloads",
            ],
          }),
          faqJsonLd(),
        ]}
      />
      <Navbar />

      <section className={styles.hero}>
        <Hero />
        <ExamTicker />
      </section>

      <div className={styles.body}>
        <Proof />
        <Features />
        <CBTForSchools />
        <HowToUse />
        <Testimonials />
        <ExploreScreens />
        <FAQ />
        <CTA />
      </div>

      <Footer />
    </main>
  );
}
