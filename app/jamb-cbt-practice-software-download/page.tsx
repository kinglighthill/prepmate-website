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
import { DOWNLOAD_LINKS, IMG } from "../data";
import {
  breadcrumbJsonLd,
  makeMetadata,
  softwareApplicationJsonLd,
} from "../seo";
import styles from "../jamb-cbt-practice-download/download.module.css";

const description =
  "Prepmate JAMB CBT Practice Software works offline and Contains up to date JAMB Past Questions and Answers, Notes, Novels and Syllabus. Click the button below to download";

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
  title: "Download Offline JAMB CBT Software for PC",
  description,
  path: "/jamb-cbt-practice-software-download",
  keywords: [
    "download JAMB CBT software",
    "offline JAMB CBT software for PC",
    "JAMB CBT software for Windows",
    "UTME practice software download",
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

export default function JambCbtPracticeSoftwareDownloadPage() {
  return (
    <main className={`${styles.main} ${styles.desktopOnly}`}>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            {
              name: "Download Offline JAMB CBT Software",
              path: "/jamb-cbt-practice-software-download",
            },
          ]),
          softwareApplicationJsonLd({
            name: "Prepmate Offline JAMB CBT Software",
            description,
            path: "/jamb-cbt-practice-software-download",
            downloadUrl: DOWNLOAD_LINKS.windows,
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
            <h1>Download Offline JAMB CBT Software</h1>
            <p>{description}</p>
          </div>

          <DownloadButton className={styles.cta} />
          <PlatformAvailability />
        </div>

        <div className={styles.slider}>
          <ExploreScreens variant="compact" deviceMode="desktop" />
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
