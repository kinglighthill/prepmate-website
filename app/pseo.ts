import dataset from "./data/pseo.json";

export interface PseoTopic {
  title: string;
  slug: string;
}
export interface PseoTopicGroup {
  title: string;
  slug: string;
  topics: PseoTopic[];
}
export interface PseoSubject {
  name: string;
  slug: string;
  aliases?: string[];
  topicGroups?: PseoTopicGroup[];
}
export interface PseoExam {
  name: string;
  slug: string;
  practiceQuestionFormat: string;
  defaultFeatures: string[];
}
export interface PseoFeature {
  name: string;
  slug: string;
}
export interface PseoNovelOutlineItem {
  title: string;
  slug: string;
}
export interface PseoNovel {
  title: string;
  slug: string;
  genre?: string;
  subjectSlug: string;
  examSlugs: string[];
  practiceQuestions?: { count?: number; maxCount?: number; basis: string };
  outline?: PseoNovelOutlineItem[];
}

export function novelQuestionLabel(novel: PseoNovel): string | null {
  const pq = novel.practiceQuestions;
  if (!pq) return null;
  if (typeof pq.count === "number") return `${pq.count} practice questions`;
  if (typeof pq.maxCount === "number")
    return `up to ${pq.maxCount} practice questions`;
  return null;
}

export interface PseoPage {
  route: string;
  params: { examSlug: string; subjectSlug: string; featureSlug: string };
  templateKey: string;
  descriptionTemplate: string;
  renderVars: Record<string, string | number>;
  content: {
    examRef: string;
    subjectRef: string;
    featureRef: string;
    outlineRefs: string[];
    faqTemplateIds: string[];
    instructionTemplateRef: string;
    ctaTemplateRef: string;
    outlineType: "topics" | "novels" | string;
    outlineSummary?: string[];
    topicGroupCount?: number;
    topicCount?: number;
    novelRefs?: string[];
    novelCount?: number;
    practiceQuestionTotal?: number;
  };
}

interface Dataset {
  exams: Record<string, PseoExam>;
  subjects: Record<string, PseoSubject>;
  features: Record<string, PseoFeature>;
  novels: Record<string, PseoNovel>;
  literatureSets: Record<string, Record<string, string[]>>;
  pages: PseoPage[];
  indexes: { byRoute: Record<string, number> };
  templates: {
    page: {
      title: string;
      metaTitle: string;
      h1: string;
      descriptions: Record<string, string>;
      instructions: Record<string, string[]>;
      cta: { title: string; body: string; buttonText: string };
    };
    faqs: Record<string, { question: string; answer: string }>;
  };
}

const data = dataset as unknown as Dataset;

export const PSEO = data;

export function interpolate(
  template: string,
  vars: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in vars ? String(vars[key]) : `{${key}}`
  );
}

/* Resolve a dotted ref like "templates.page.descriptions.notes" */
function resolveRef(ref: string): unknown {
  return ref.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as object)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, data);
}

export function getPage(
  examSlug: string,
  subjectSlug: string,
  featureSlug: string
): PseoPage | null {
  const route = `/${examSlug}/${subjectSlug}/${featureSlug}`;
  const idx = data.indexes.byRoute[route];
  return idx === undefined ? null : data.pages[idx] ?? null;
}

export function allPages(): PseoPage[] {
  return data.pages;
}

export interface PseoView {
  page: PseoPage;
  exam: PseoExam;
  subject: PseoSubject;
  feature: PseoFeature;
  title: string;
  metaTitle: string;
  h1: string;
  description: string;
  instructions: string[];
  cta: { title: string; body: string; buttonText: string };
  faqs: Array<{ q: string; a: string }>;
  topicGroups: PseoTopicGroup[];
  novels: PseoNovel[];
  outlineType: string;
  linkTexts: boolean;
}

export function buildView(page: PseoPage): PseoView {
  const vars = page.renderVars;
  const exam = data.exams[page.params.examSlug];
  const subject = data.subjects[page.params.subjectSlug];
  const feature = data.features[page.params.featureSlug];

  const tpl = data.templates.page;
  const descTemplate = (resolveRef(page.descriptionTemplate) as string) ?? "";

  const instrTemplate =
    (resolveRef(page.content.instructionTemplateRef) as string[]) ?? [];
  const instructions = instrTemplate.map((line) => interpolate(line, vars));

  const faqs = page.content.faqTemplateIds
    .map((id) => data.templates.faqs[id])
    .filter(Boolean)
    .map((f) => ({
      q: interpolate(f.question, vars),
      a: interpolate(f.answer, vars),
    }));

  const topicGroups =
    page.content.outlineType === "topics" ? subject.topicGroups ?? [] : [];

  const isLiterature =
    page.params.subjectSlug === "literature-in-english" &&
    page.content.outlineType === "novels";

  const novels = isLiterature
    ? literatureTextsForExam(page.params.examSlug)
    : (page.content.novelRefs ?? [])
        .map((ref) => data.novels[ref.split(".")[1]])
        .filter(Boolean);

  return {
    page,
    exam,
    subject,
    feature,
    title: interpolate(tpl.title, vars),
    metaTitle: interpolate(tpl.metaTitle, vars),
    h1: interpolate(tpl.h1, vars),
    description: interpolate(descTemplate, vars),
    instructions,
    cta: {
      title: interpolate(tpl.cta.title, vars),
      body: interpolate(tpl.cta.body, vars),
      buttonText: interpolate(tpl.cta.buttonText, vars),
    },
    faqs,
    topicGroups,
    novels,
    outlineType: page.content.outlineType,
    linkTexts: isLiterature,
  };
}

export function getExam(examSlug: string): PseoExam | null {
  return data.exams[examSlug] ?? null;
}

export function getSubject(subjectSlug: string): PseoSubject | null {
  return data.subjects[subjectSlug] ?? null;
}

/** Distinct subjects that actually have pages under an exam. */
export function subjectsForExam(examSlug: string): PseoSubject[] {
  const seen = new Set<string>();
  const out: PseoSubject[] = [];
  for (const p of data.pages) {
    if (p.params.examSlug !== examSlug) continue;
    if (seen.has(p.params.subjectSlug)) continue;
    seen.add(p.params.subjectSlug);
    const s = data.subjects[p.params.subjectSlug];
    if (s) out.push(s);
  }
  return out;
}

/** Feature pages available for a given exam+subject. */
export function featuresForExamSubject(
  examSlug: string,
  subjectSlug: string
): Array<{ feature: PseoFeature; route: string }> {
  const out: Array<{ feature: PseoFeature; route: string }> = [];
  for (const p of data.pages) {
    if (p.params.examSlug !== examSlug) continue;
    if (p.params.subjectSlug !== subjectSlug) continue;
    const f = data.features[p.params.featureSlug];
    if (f) out.push({ feature: f, route: p.route });
  }
  return out;
}

/** Distinct exam slugs present in the dataset. */
export function allExamSlugs(): string[] {
  return Object.keys(data.exams).filter((slug) =>
    data.pages.some((p) => p.params.examSlug === slug)
  );
}

/** All unique exam+subject pairs that have pages (for hub static params). */
export function allExamSubjectPairs(): Array<{
  examSlug: string;
  subjectSlug: string;
}> {
  const seen = new Set<string>();
  const out: Array<{ examSlug: string; subjectSlug: string }> = [];
  for (const p of data.pages) {
    const key = `${p.params.examSlug}/${p.params.subjectSlug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({
      examSlug: p.params.examSlug,
      subjectSlug: p.params.subjectSlug,
    });
  }
  return out;
}

const LITERATURE_SUBJECT = "literature-in-english";

export function getNovel(slug: string): PseoNovel | null {
  return data.novels[slug] ?? null;
}

export function literatureTextsForExam(examSlug: string): PseoNovel[] {
  const slugs = data.literatureSets?.[examSlug]?.[LITERATURE_SUBJECT] ?? [];
  return slugs.map((s) => data.novels[s]).filter(Boolean);
}

export function examHasLiterature(examSlug: string): boolean {
  return (
    getPage(examSlug, LITERATURE_SUBJECT, "novels") !== null &&
    literatureTextsForExam(examSlug).length > 0
  );
}

export function allLiteratureTextParams(): Array<{
  examSlug: string;
  textSlug: string;
}> {
  const out: Array<{ examSlug: string; textSlug: string }> = [];
  for (const examSlug of Object.keys(data.literatureSets ?? {})) {
    if (!examHasLiterature(examSlug)) continue;
    for (const text of literatureTextsForExam(examSlug)) {
      out.push({ examSlug, textSlug: text.slug });
    }
  }
  return out;
}

export function getLiteratureText(
  examSlug: string,
  textSlug: string
): PseoNovel | null {
  return literatureTextsForExam(examSlug).find((t) => t.slug === textSlug) ?? null;
}
