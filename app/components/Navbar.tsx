"use client";

import { useState } from "react";
import Link from "next/link";
import { IMG } from "../data";
import DownloadButton from "./DownloadButton";
import styles from "./Navbar.module.css";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/exams", label: "Exams" },
  { href: "/jamb-cbt-practice", label: "UTME 2026" },
  { href: "/lekki-headmaster", label: "Lekki Headmaster" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.bar}>
        <Link href="/" className={styles.logo} aria-label="Prepmate home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.logo} alt="Prepmate" />
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
          <DownloadButton />
        </div>
      </div>
    </nav>
  );
}
