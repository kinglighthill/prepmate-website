import Image from "next/image";
import { IMG } from "../data";
import DownloadButton from "./DownloadButton";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.card}>
        {/* Decorative background */}
        <div className={styles.bg}>
          <div className={styles.fill} />
          {/* Decorative SVG background - plain <img> (no optimization needed) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.dots}
            src={IMG.heroBackdropDots}
            alt=""
            aria-hidden="true"
            loading="eager"
            decoding="async"
          />
          <div className={styles.radial} />
          <div className={styles.gradient} />
        </div>

        <div className={styles.content}>
          {/* Exam badge pills */}
          <div className={styles.badges}>
            <div className={styles.badge}>
              <Image src={IMG.jamb} alt="JAMB" width={40} height={38} sizes="40px" />
            </div>
            <div className={styles.badge}>
              <Image src={IMG.waec} alt="WAEC" width={40} height={38} sizes="40px" />
            </div>
            <div className={styles.badge}>
              <Image src={IMG.neco} alt="NECO" width={40} height={38} sizes="40px" />
            </div>
          </div>

          <div className={styles.text}>
            <h1 className="h1">Powerful eLearning &amp; CBT Practice Software</h1>
            <p className="body-lg">
              Join thousands of people using Prepmate for learning and exam
              preparation
            </p>
          </div>

          <div className={styles.actions}>
            <DownloadButton />

            <div className={styles.platformRow}>
              <div className={styles.platformLabel}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.availableIcon} alt="" />
                <span>Available on all Platforms</span>
              </div>
              <div className={styles.platformIcons}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.platformAndroid} alt="Android" />
                <span className={styles.divider} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.platformApple} alt="Apple" />
                <span className={styles.divider} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.platformWindows} alt="Windows" />
                <span className={styles.divider} />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.platformMac} alt="Mac" />
              </div>
            </div>
          </div>
        </div>

        {/* Hero device image */}
        <div className={styles.imageContainer}>
          {/* LCP element - load eagerly with high priority */}
          <Image
            className={styles.heroImage}
            src={IMG.heroImage}
            alt="Prepmate app dashboard on laptop and phone"
            width={1610}
            height={1104}
            priority
            sizes="(max-width: 809px) 92vw, (max-width: 1319px) 80vw, 1152px"
          />
        </div>
      </div>
    </section>
  );
}
