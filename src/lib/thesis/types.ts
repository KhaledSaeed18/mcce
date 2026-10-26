import type { ThesisTerm } from "@/lib/resources/types";

/** Where a template chapter gets written: one part, or started in A and finished in B. */
export type ThesisChapterTerm = ThesisTerm | "AB";

export interface ThesisChapter {
  content: string;
  number: number;
  term: ThesisChapterTerm;
  title: string;
}

export interface ThesisPart {
  code: string;
  deliverables: string[];
  /** Weights from the published syllabus; empty when the syllabus is not published here. */
  grading: ThesisGradeItem[];
  label: string;
  season: string;
  term: ThesisTerm;
}

export interface ThesisGradeItem {
  activity: string;
  percent: number;
}

export interface ThesisNamedItem {
  detail: string;
  title: string;
}

export interface ThesisTopicDomain {
  courseCode: string;
  examples: string;
  title: string;
}

export interface ThesisSlrPhase {
  steps: string[];
  title: string;
}

export interface ThesisLink {
  href: string;
  label: string;
}

export interface ThesisTip {
  links?: ThesisLink[];
  text: string;
}
