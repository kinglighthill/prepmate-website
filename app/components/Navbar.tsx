"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IMG } from "../data";
import DownloadButton from "./DownloadButton";
import styles from "./Navbar.module.css";

const LINKS = [
  { href: "/exams", label: "Exams" },
  { href: "/jamb-cbt-practice", label: "UTME 2027" },
  { href: "/jamb-cbt-practice-software-download", label: "Download for PC" },
  { href: "/cbt-for-schools", label: "CBT for Schools" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.bar}>
        <Link href="/" className={styles.logo} aria-label="Prepmate home">
          <Image
            src={IMG.logo}
            alt="Prepmate"
            width={960}
            height={173}
            priority
            sizes="224px"
            style={{ width: "100%", height: "auto" }}
          />
        </Link>

        <div className={styles.links}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>

        <DownloadButton variant="nav" className={styles.cta} />

        {/* Mobile hamburger */}
        <button
          className={styles.burger}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`${styles.line} ${open ? styles.line1 : ""}`} />
          <span className={`${styles.line} ${open ? styles.line2 : ""}`} />
          <span className={`${styles.line} ${open ? styles.line3 : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`${styles.mobileMenu} ${open ? styles.mobileOpen : ""}`}>
        <div className={styles.mobileInner}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <DownloadButton className={styles.mobileDownload} label="Download" />
        </div>
      </div>
    </nav>
  );
}
