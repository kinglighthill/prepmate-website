import type { MetadataRoute } from "next";
import { CANONICAL_ROUTES, absoluteUrl } from "./seo";
import {
  allExamSlugs,
  allExamSubjectPairs,
  allLiteratureTextParams,
  allPages,
} from "./pseo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Static / marketing routes
  const staticRoutes: MetadataRoute.Sitemap = CANONICAL_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Programmatic SEO: exam hubs
  const examHubs: MetadataRoute.Sitemap = allExamSlugs().map((examSlug) => ({
    url: absoluteUrl(`/${examSlug}`),
    lastModified,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Programmatic SEO: exam+subject hubs
  const subjectHubs: MetadataRoute.Sitemap = allExamSubjectPairs().map(
    ({ examSlug, subjectSlug }) => ({
      url: absoluteUrl(`/${examSlug}/${subjectSlug}`),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  // Programmatic SEO: leaf pages (exam/subject/feature)
  const leafPages: MetadataRoute.Sitemap = allPages().map((page) => ({
    url: absoluteUrl(page.route),
    lastModified,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // Programmatic SEO: per-text literature pages
  const literatureTexts: MetadataRoute.Sitemap = allLiteratureTextParams().map(
    ({ examSlug, textSlug }) => ({
      url: absoluteUrl(
        `/${examSlug}/literature-in-english/novels/${textSlug}`
      ),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.6,
    })
  );

  return [
    ...staticRoutes,
    ...examHubs,
    ...subjectHubs,
    ...leafPages,
    ...literatureTexts,
  ];
}
