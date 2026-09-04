import {
  CompassIcon,
  HelpCircleIcon,
  type LucideIcon,
  MailIcon,
  WifiOffIcon,
} from "lucide-react";
import type { COURSE_CARD_COLORS } from "@/config/courses";

export type FeatureRoute = "/about" | "/faq" | "/contact";

export interface FeatureCardItem {
  color: (typeof COURSE_CARD_COLORS)[number];
  description: string;
  icon: LucideIcon;
  label: string;
  title: string;
  to: FeatureRoute;
}

/** Small link tiles in the bottom row of the home feature grid. The search,
 * GPA, and plan-of-study features get their own hand-built tiles instead. */
export const FEATURE_CARDS: FeatureCardItem[] = [
  {
    color: "chart-3",
    description:
      "How the program works, and how syncing, search, and file access work here.",
    icon: HelpCircleIcon,
    label: "Read the FAQ",
    title: "Questions, answered",
    to: "/faq",
  },
  {
    color: "chart-4",
    description:
      "What MCCE covers, and why this index exists outside the official page.",
    icon: CompassIcon,
    label: "About the site",
    title: "The program, in context",
    to: "/about",
  },
  {
    color: "chart-2",
    description:
      "Report a broken link, request a course, or send materials for the archive.",
    icon: MailIcon,
    label: "Send a message",
    title: "Reach the maintainer",
    to: "/contact",
  },
];

export const OFFLINE_FEATURE = {
  color: "chart-5",
  description:
    "The index is cached on first visit, so browsing and search keep working with no connection and no sign-in.",
  icon: WifiOffIcon,
  points: ["Installable", "No sign-in", "Cached index", "No ads"],
  title: "Works offline",
} as const;

/** Sample query and facet chips drawn in the home search tile. Illustrative
 * only: the real facets are derived from the index on the search page. */
export const SEARCH_PREVIEW_QUERY = "fourier transform";
export const SEARCH_PREVIEW_CHIPS = [
  "First Year · Fall",
  "CENG566",
  "pdf",
  "slides",
  "video",
] as const;

export interface GpaPreviewPoint {
  gpa: number;
  label: string;
}

/** Illustrative GPA trend drawn in the home GPA tile. Not real data: the
 * calculator page computes this from averages the reader types in. */
export const GPA_PREVIEW_POINTS: GpaPreviewPoint[] = [
  { gpa: 2.6, label: "Y1 F" },
  { gpa: 2.9, label: "Y1 S" },
  { gpa: 3.4, label: "Y2 F" },
  { gpa: 3.1, label: "Y2 S" },
];

/** Condensed version of the admissions flow, drawn in the home admissions tile.
 * The real tracks and their full steps live in `config/admissions`. */
export const ADMISSIONS_PREVIEW_STEPS = [
  "Apply and open a file",
  "The School of Engineering reviews it",
  "Accepted, then the curriculum is set",
] as const;

export interface SyncStep {
  body: string;
  title: string;
}

export const SYNC_STEPS: SyncStep[] = [
  {
    body: "Program materials live in shared Google Drive folders for each year and semester.",
    title: "The program's Drive",
  },
  {
    body: "A sync job walks every folder and writes names, types, sizes, and dates into a static index.",
    title: "Indexed, not mirrored",
  },
  {
    body: "Files open in Drive as always. The index just gets you there in one step.",
    title: "Straight to the file",
  },
];
