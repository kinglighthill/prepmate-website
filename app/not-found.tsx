import Link from "next/link";
import Navbar from "./components/Navbar";
import { IMG } from "./data";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <Link href="/" className={styles.logo} aria-label="Prepmate home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.logo} alt="Prepmate" />
        </Link>

        <h1 className={styles.code}>404</h1>

        <h2 className={styles.title}>Oops page not found</h2>

        <p className={styles.text}>
          We regret to inform you that the page you&apos;re searching for seems
          to be beyond our grasp. We apologize for any inconvenience this may
          cause.
        </p>

        <Link href="/" className={styles.cta}>
          Back to Home
        </Link>
      </main>
    </>
  );
}
