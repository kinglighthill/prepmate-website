import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "./LegalPage.module.css";

export type LegalSection = { heading: string; body: string[] };

export default function LegalPage({
  tag,
  title,
  subtitle,
  updated,
  sections,
}: {
  tag: string;
  title: string;
  subtitle: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.body}>
        <header className={styles.head}>
          <span className={styles.tag}>{tag}</span>
          <h1 className="h2">{title}</h1>
          <p className="body-lg">{subtitle}</p>
          <span className={styles.updated}>
            <svg width="16" height="16" viewBox="0 0 256 256" fill="var(--ink-400)">
              <path d="M128,40a96,96,0,1,0,96,96A96.11,96.11,0,0,0,128,40Zm0,176a80,80,0,1,1,80-80A80.09,80.09,0,0,1,128,216Zm45.66-85.66a8,8,0,0,1-11.32,11.32l-40-40A8,8,0,0,1,120,96V56a8,8,0,0,1,16,0V92.69Z" />
            </svg>
            {updated}
          </span>
        </header>

        <article className={styles.content}>
          {sections.map((section, i) => (
            <section key={i} className={styles.section}>
              <h2 className={styles.heading}>{section.heading}</h2>
              {section.body.map((p, j) => (
                <p key={j} className={styles.para}>
                  {p}
                </p>
              ))}
            </section>
          ))}
        </article>
      </div>

      <Footer />
    </main>
  );
}
