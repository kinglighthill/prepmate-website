import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prepmate",
  description:
    "Join thousands of students using Prepmate to prepare for their exams",
  icons: {
    icon: "https://framerusercontent.com/images/qEOW7SwcB8Z3dBjmQpf7vKLaLE.png",
    apple:
      "https://framerusercontent.com/images/qEOW7SwcB8Z3dBjmQpf7vKLaLE.png",
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
