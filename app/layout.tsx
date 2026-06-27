import type { Metadata } from "next";
import { IMG } from "./data";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prepmate",
  description:
    "Join thousands of students using Prepmate to prepare for their exams",
  icons: {
    icon: IMG.favicon,
    apple: IMG.favicon,
  },
  openGraph: {
    type: "website",
    title: "Prepmate",
    description:
      "Join thousands of students using Prepmate to prepare for their exams",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prepmate",
    description:
      "Join thousands of students using Prepmate to prepare for their exams",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
