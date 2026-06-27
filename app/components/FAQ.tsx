"use client";

import { useState } from "react";
import { FAQS } from "../data";
import styles from "./FAQ.module.css";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.head}>
        <div className={styles.tag}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://framerusercontent.com/images/tDIEGUB77CcjgJtVjPGSsOuOnc.svg?width=20&height=20"
            alt=""
          />
          <span>FAQ&apos;s</span>
        </div>
        <h2 className="h2">Frequently Asked Questions</h2>
      </div>

      <div className={styles.list}>
        {FAQS.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={styles.item}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <div className={styles.question}>
                <p className={styles.qText}>{faq.q}</p>
                <div className={styles.icon}>
                  <span className={`${styles.bar} ${styles.barH}`} />
                  <span
                    className={`${styles.bar} ${styles.barV} ${
                      isOpen ? styles.barVOpen : ""
                    }`}
                  />
                </div>
              </div>
              <div
                className={styles.answerWrap}
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className={styles.answerInner}>
                  <p className={styles.answer}>{faq.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
