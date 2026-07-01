import { DOWNLOAD_LINKS, IMG } from "../data";
import styles from "./DownloadOptions.module.css";

const OPTIONS = [
  { icon: IMG.storeGooglePlay, label: "Download for Android", href: DOWNLOAD_LINKS.googlePlay },
  { icon: IMG.storeAppStore, label: "Download for iOS", href: DOWNLOAD_LINKS.appStore },
  { icon: IMG.storeWindows, label: "Download for Windows", href: DOWNLOAD_LINKS.windows },
  { icon: IMG.storeMac, label: "Download for Mac", href: DOWNLOAD_LINKS.mac },
];

export default function DownloadOptions() {
  return (
    <div className={styles.box}>
      {OPTIONS.map((opt, i) => (
        <a
          key={i}
          className={styles.option}
          href={opt.href}
          target="_blank"
          rel="noopener"
        >
          <span className={styles.icon}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={opt.icon} alt="" />
          </span>
          <span className={styles.label}>{opt.label}</span>
          <span className={styles.arrow}>
            <svg width="16" height="16" viewBox="0 0 256 256" fill="var(--ink-350)">
              <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
            </svg>
          </span>
        </a>
      ))}
    </div>
  );
}
