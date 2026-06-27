"use client";

import { useEffect, useState } from "react";
import { IMG } from "../data";
import DownloadButton from "./DownloadButton";
import SectionHeader from "./SectionHeader";
import styles from "./ExploreScreens.module.css";

const SLIDES = [
  IMG.screen2,
  IMG.screenPastQuestions,
  IMG.screenStudyPastQuestions,
  IMG.screenStudyNotes,
  IMG.screenLekkiSummary,
  IMG.screen1,
];

export default function ExploreScreens() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setIndex((i) => (i + 1) % SLIDES.length);
  const activeSlide = SLIDES[index];
  const previousSlide = SLIDES[(index - 1 + SLIDES.length) % SLIDES.length];
  const nextSlide = SLIDES[(index + 1) % SLIDES.length];

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 4200);
    return () => window.clearInterval(intervalId);
  }, [isPaused]);

  return (
    <section className={styles.section}>
      <SectionHeader
        tag="User interface"
        tagIcon={IMG.interfaceTagIcon}
        title="Explore Screens"
        subtitle="Checkout our App's beautiful user interface and user experience in pictures"
      />

      <div
        className={styles.laptop}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={`left-${previousSlide}`}
          className={`${styles.preview} ${styles.previewLeft}`}
          src={previousSlide}
          alt=""
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={`right-${nextSlide}`}
          className={`${styles.preview} ${styles.previewRight}`}
          src={nextSlide}
          alt=""
        />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.device} src={IMG.laptopDevice} alt="Laptop" />

        <div className={styles.screenArea}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={activeSlide} className={styles.screen} src={activeSlide} alt="App screen" />
        </div>

        <button className={`${styles.arrow} ${styles.left}`} onClick={prev} aria-label="Previous">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.screenArrowLeft} alt="" />
        </button>
        <button className={`${styles.arrow} ${styles.right}`} onClick={next} aria-label="Next">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.screenArrowRight} alt="" />
        </button>
      </div>

      <DownloadButton />
    </section>
  );
}
