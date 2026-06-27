"use client";

import { useState } from "react";
import { IMG } from "../data";
import DownloadButton from "./DownloadButton";
import SectionHeader from "./SectionHeader";
import styles from "./ExploreScreens.module.css";

const SCREENS = [IMG.screen2, IMG.screen1];

export default function ExploreScreens() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + SCREENS.length) % SCREENS.length);
  const next = () => setIndex((i) => (i + 1) % SCREENS.length);

  return (
    <section className={styles.section}>
      <SectionHeader
        tag="User interface"
        tagIcon="https://framerusercontent.com/images/rs39uhBOlBlpzeVhwp0IwDNDQ.svg?width=20&height=20"
        title="Explore Screens"
        subtitle="Checkout our App's beautiful user interface and user experience in pictures"
      />

      <div className={styles.laptop}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.device} src={IMG.laptopDevice} alt="Laptop" />

        <div className={styles.screenArea}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.screen} src={SCREENS[index]} alt="App screen" />

          <button className={`${styles.arrow} ${styles.left}`} onClick={prev} aria-label="Previous">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://framerusercontent.com/images/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg" alt="" />
          </button>
          <button className={`${styles.arrow} ${styles.right}`} onClick={next} aria-label="Next">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://framerusercontent.com/images/11KSGbIZoRSg4pjdnUoif6MKHI.svg" alt="" />
          </button>
        </div>
      </div>

      <DownloadButton />
    </section>
  );
}
