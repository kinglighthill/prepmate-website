"use client";

import { useEffect, useState } from "react";
import { IMG } from "../data";
import DownloadButton from "./DownloadButton";
import SectionHeader from "./SectionHeader";
import styles from "./ExploreScreens.module.css";

const DESKTOP_SLIDES = [
  IMG.screen2,
  IMG.screenPastQuestions,
  IMG.screenStudyPastQuestions,
  IMG.screenStudyNotes,
  IMG.screenLekkiSummary,
  IMG.screen1,
];

const MOBILE_SLIDES = [
  IMG.screenMobileHome,
  IMG.screenMobileSubjects,
  IMG.screenMobileCbt,
];

export default function ExploreScreens({
  variant = "section",
  deviceMode = "auto",
}: {
  variant?: "section" | "compact";
  deviceMode?: "auto" | "desktop" | "mobile";
}) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const useMobileSlides =
    deviceMode === "mobile" || (deviceMode === "auto" && isMobile);
  const slides = useMobileSlides ? MOBILE_SLIDES : DESKTOP_SLIDES;
  const slideCount = slides.length;
  const activeIndex = index % slideCount;
  const prev = () => setIndex((i) => (i - 1 + slideCount) % slideCount);
  const next = () => setIndex((i) => (i + 1) % slideCount);
  const activeSlide = slides[activeIndex];
  const previousSlide = slides[(activeIndex - 1 + slideCount) % slideCount];
  const nextSlide = slides[(activeIndex + 1) % slideCount];

  useEffect(() => {
    const media = window.matchMedia("(max-width: 809px)");
    const updateIsMobile = () => setIsMobile(media.matches);

    updateIsMobile();
    media.addEventListener("change", updateIsMobile);
    return () => media.removeEventListener("change", updateIsMobile);
  }, []);

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setIndex((i) => (i + 1) % slideCount);
    }, 4200);
    return () => window.clearInterval(intervalId);
  }, [isPaused, slideCount]);

  return (
    <section
      className={`${styles.section} ${variant === "compact" ? styles.compact : ""} ${
        deviceMode === "desktop" ? styles.desktopMode : ""
      }`}
    >
      {variant === "section" && (
        <SectionHeader
          tag="User interface"
          tagIcon={IMG.interfaceTagIcon}
          title="Explore Screens"
          subtitle="Checkout our App's beautiful user interface and user experience in pictures"
        />
      )}

      <div className={styles.carousel}>
        <div
          className={`${styles.laptop} ${useMobileSlides ? styles.mobileSlider : ""}`}
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.mobileFrame} src={IMG.phoneFrame} alt="" />

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
      </div>

      {variant === "section" && <DownloadButton />}
    </section>
  );
}
