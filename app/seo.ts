import type { Metadata } from "next";
import { DOWNLOAD_LINKS, FAQS, IMG } from "./data";

export const SITE_NAME = "Prepmate";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.myprepmate.com"
).replace(/\/$/, "");

export const DEFAULT_DESCRIPTION =
  "Prepmate is an exam preparation app for JAMB CBT, WAEC/WASSCE past questions, study notes, novels, syllabus and offline practice on Android, iOS, Windows and macOS.";

export const DEFAULT_KEYWORDS = [
  "Prepmate",
  "JAMB CBT practice",
  "UTME practice software",
  "WAEC past questions",
  "WASSCE past questions",
  "CBT practice app",
  "offline JAMB CBT software",
  "exam preparation app",
  "study notes",
  "syllabus",
  "JAMB novels",
  "Nigeria exam prep",
];

export const DEFAULT_OG_IMAGE = IMG.heroImage;

export const CANONICAL_ROUTES = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/exams", priority: 0.9, changeFrequency: "weekly" },
  { path: "/jamb-cbt-practice", priority: 1, changeFrequency: "weekly" },
  {
    path: "/jamb-cbt-practice-software-download",
    priority: 0.95,
    changeFrequency: "weekly",
  },
  {
    path: "/wassce-past-questions-answers",
    priority: 0.95,
    changeFrequency: "weekly",
  },
  { path: "/cbt-for-schools", priority: 0.9, changeFrequency: "monthly" },
  { path: "/lekki-headmaster", priority: 0.85, changeFrequency: "weekly" },
  { path: "/privacy", priority: 0.35, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.35, changeFrequency: "yearly" },
] as const;

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function makeMetadata({
  title,
  description,
  path,
  keywords = [],
  image,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  // Optional page-specific social image. When omitted, the generated
  // app/opengraph-image.tsx card is used automatically.
  image?: string;
}): Metadata {
  const fullTitle = title.includes(SITE_NAME)
    ? title
    : `${title} | ${SITE_NAME}`;
  const mergedKeywords = Array.from(
    new Set([...DEFAULT_KEYWORDS, ...keywords])
  );

  const imageMeta = image
    ? {
        openGraph: { images: [{ url: absoluteUrl(image), alt: fullTitle }] },
        twitter: { images: [absoluteUrl(image)] },
      }
    : { openGraph: {}, twitter: {} };

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: absoluteUrl(path),
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_NG",
      url: absoluteUrl(path),
      title: fullTitle,
      description,
      ...imageMeta.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...imageMeta.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: "Veracone Technologies Ltd.",
    url: SITE_URL,
    logo: absoluteUrl(IMG.logo),
    email: "info@veracone.com",
    telephone: "+2348107993604",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "info@veracone.com",
        telephone: "+2348107993604",
        areaServed: "NG",
        availableLanguage: ["English"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function webPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function softwareApplicationJsonLd({
  name,
  description,
  path,
  downloadUrl = DOWNLOAD_LINKS.googlePlay,
  featureList,
}: {
  name: string;
  description: string;
  path: string;
  downloadUrl?: string;
  featureList: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: absoluteUrl(path),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    applicationCategory: "EducationalApplication",
    operatingSystem: "Android, iOS, Windows, macOS",
    downloadUrl,
    featureList,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "NGN",
      availability: "https://schema.org/InStock",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function faqJsonLd(faqs: Array<{ q: string; a: string }> = FAQS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

export function examItemListJsonLd(
  exams: Array<{ name: string; href: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Exams supported by Prepmate",
    itemListElement: exams.map((exam, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: exam.name,
      url: absoluteUrl(exam.href),
    })),
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
  serviceUrl,
}: {
  name: string;
  description: string;
  path: string;
  serviceUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: "Computer Based Testing software",
    areaServed: "NG",
    provider: {
      "@type": "Organization",
      name: "Venlearn CBT",
      url: serviceUrl,
    },
  };
}

export function learningResourceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name,
    description,
    url: absoluteUrl(path),
    learningResourceType: "Study guide",
    educationalUse: ["Exam preparation", "Practice questions"],
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}
