import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.contactRow}>
          <span className={styles.line} />
          <a className={styles.contact} href="mailto:info@veracone.com">
            <svg width="24" height="24" viewBox="0 0 256 256" fill="#212121">
              <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z" />
            </svg>
            <span>info@veracone.com</span>
          </a>
          <a className={styles.contact} href="tel:+2348107993604">
            <svg width="24" height="24" viewBox="0 0 256 256" fill="#212121">
              <path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z" />
            </svg>
            <span>+2348107993604</span>
          </a>
          <span className={styles.line} />
        </div>

        <div className={styles.links}>
          <Link href="/exams">Exams</Link>
          <Link href="/jamb-cbt-practice">UTME 2027</Link>
          <Link href="/wassce-past-questions-answers">WASSCE</Link>
          <Link href="/cbt-for-schools">CBT for Schools</Link>
          <Link href="/lekki-headmaster">Lekki Headmaster</Link>
        </div>

        <div className={styles.bottom}>
          <div className={styles.legal}>
            <Link href="/terms">Terms Of Use</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
          <p className={styles.copyright}>
           © {new Date().getFullYear()} Veracone Technologies Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
