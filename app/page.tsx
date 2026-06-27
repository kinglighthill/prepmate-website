import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ExamTicker from "./components/ExamTicker";
import Proof from "./components/Proof";
import Features from "./components/Features";
import HowToUse from "./components/HowToUse";
import Testimonials from "./components/Testimonials";
import ExploreScreens from "./components/ExploreScreens";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.hero}>
        <Hero />
        <ExamTicker />
      </section>

      <div className={styles.body}>
        <Proof />
        <Features />
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
