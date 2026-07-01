"use client";

import { OS_DOWNLOAD } from "../data";
import { useOS } from "../hooks/useOS";
import OSIcon from "./OSIcon";
import styles from "./DownloadButton.module.css";

/**
 * The single, OS-aware download CTA used across the whole site.
 * Detects the visitor's OS and shows the matching label, icon and link.
 *
 * variant:
 *  - "primary" (default): rounded purple pill button (page bodies)
 *  - "nav": navbar pill (same look, slightly different padding via class)
 */
export default function DownloadButton({
  variant = "primary",
  className = "",
  label: labelOverride,
}: {
  variant?: "primary" | "nav";
  className?: string;
  label?: string;
}) {
  const os = useOS();
  const { label, href } = OS_DOWNLOAD[os];

  return (
    <a
      className={`${styles.btn} ${variant === "nav" ? styles.nav : ""} ${className}`}
      href={href}
      target="_blank"
      rel="noopener"
    >
      <OSIcon os={os} />
      {labelOverride ?? label}
    </a>
  );
}
