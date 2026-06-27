import { DOWNLOAD_LINKS, IMG } from "../data";
import styles from "./DownloadOptions.module.css";

const OPTIONS = [
  { icon: IMG.storeGooglePlay, label: "Download for Andriod", href: DOWNLOAD_LINKS.googlePlay },
  { icon: IMG.storeAppStore, label: "Download for Iphone", href: DOWNLOAD_LINKS.appStore },
  { icon: IMG.storeWindows, label: "Download for Windows", href: DOWNLOAD_LINKS.windows },
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
              <path d="M229.66,77.66l-96,96a8,8,0,0,1-11.32,0l-96-96A8,8,0,0,1,37.66,66.34L128,156.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z" />
            </svg>
          </span>
        </a>
      ))}
    </div>
  );
}
