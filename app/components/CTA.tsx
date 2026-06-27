import { DOWNLOAD_LINKS, IMG } from "../data";
import styles from "./CTA.module.css";

const STORES = [
  { icon: IMG.storeGooglePlay, small: "Get It On", big: "Google Play", href: DOWNLOAD_LINKS.googlePlay },
  { icon: IMG.storeAppStore, small: "Download on the", big: "App Store", href: DOWNLOAD_LINKS.appStore },
  { icon: IMG.storeWindows, small: "Download for", big: "Windows PC", href: DOWNLOAD_LINKS.windows },
  { icon: IMG.storeMac, small: "Download for", big: "Mac OS", href: DOWNLOAD_LINKS.mac },
];

export default function CTA() {
  return (
    <section id="cta" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageBox}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.abstract} src={IMG.ctaAbstract} alt="" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.hero} src={IMG.heroImage} alt="Prepmate app" />
        </div>

        <div className={styles.text}>
          <h2 className="h2">Download Prepmate and Start Learning Today</h2>

          <div className={styles.stores}>
            {STORES.map((store, i) => (
              <a
                key={i}
                className={styles.store}
                href={store.href}
                target="_blank"
                rel="noopener"
              >
                <div className={styles.storeIcon}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={store.icon} alt="" />
                </div>
                <div className={styles.storeText}>
                  <span className={styles.storeSmall}>{store.small}</span>
                  <span className={styles.storeBig}>{store.big}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
