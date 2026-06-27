import { DOWNLOAD_LINKS, IMG } from "../data";
import styles from "./StoreGrid.module.css";

const STORES = [
  { icon: IMG.storeGooglePlay, small: "Get It On", big: "Google Play", href: DOWNLOAD_LINKS.googlePlay },
  { icon: IMG.storeAppStore, small: "Download on the", big: "App Store", href: DOWNLOAD_LINKS.appStore },
  { icon: IMG.storeWindows, small: "Download for", big: "Windows PC", href: DOWNLOAD_LINKS.windows },
  { icon: IMG.storeMac, small: "Download for", big: "Mac OS", href: DOWNLOAD_LINKS.mac },
];

export default function StoreGrid() {
  return (
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
  );
}
