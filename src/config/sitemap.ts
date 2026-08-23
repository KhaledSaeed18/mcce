import {
  BookOpenIcon,
  CompassIcon,
  ExternalLinkIcon,
  FolderTreeIcon,
  type LucideIcon,
  ScaleIcon,
} from "lucide-react";
import type { COURSE_CARD_COLORS } from "@/config/courses";
import { DRIVE_SOURCES } from "@/config/sources";

export interface SitemapEntry {
  description: string;
  label: string;
  to:
    | "/"
    | "/search"
    | "/course"
    | "/exams"
    | "/recent"
    | "/saved"
    | "/admissions"
    | "/tuition-fees"
    | "/plan-of-study"
    | "/gpa-calculator"
    | "/about"
    | "/faq"
    | "/contact"
    | "/legal";
}

export interface SitemapBrowseEntry {
  description: string;
  folderId: string;
  label: string;
}

export interface SitemapGroup {
  color: (typeof COURSE_CARD_COLORS)[number];
  entries: SitemapEntry[];
  icon: LucideIcon;
  label: string;
  value: string;
}

export const SITEMAP_GROUPS: SitemapGroup[] = [
  {
    color: "chart-1",
    entries: [
      {
        description: "The index at a glance, with what changed most recently.",
        label: "Home",
        to: "/",
      },
      {
        description:
          "Search every indexed file by name, course, semester, or file type.",
        label: "Search files",
        to: "/search",
      },
      {
        description:
          "Every course in the program, grouped by year and semester.",
        label: "All courses",
        to: "/course",
      },
      {
        description:
          "Past exams and quizzes, pulled out of the course folders.",
        label: "Past exams",
        to: "/exams",
      },
      {
        description: "What reached the Drive in the most recent syncs.",
        label: "Recently added",
        to: "/recent",
      },
      {
        description: "Files you kept, held in this browser on this device.",
        label: "Saved",
        to: "/saved",
      },
    ],
    icon: CompassIcon,
    label: "Browse the index",
    value: "index",
  },
  {
    color: "chart-3",
    entries: [
      {
        description:
          "The full plan of study with prerequisites drawn as a roadmap.",
        label: "Plan of study",
        to: "/plan-of-study",
      },
      {
        description:
          "Official tuition reference numbers and a year fee planner with exports.",
        label: "Tuition and fees",
        to: "/tuition-fees",
      },
      {
        description:
          "Semester and cumulative GPA on the program's grading scale.",
        label: "GPA calculator",
        to: "/gpa-calculator",
      },
      {
        description:
          "Graduate admissions requirements, LIU and non-LIU tracks, and official contact points.",
        label: "Admissions guide",
        to: "/admissions",
      },
    ],
    icon: BookOpenIcon,
    label: "Program tools",
    value: "program",
  },
  {
    color: "chart-5",
    entries: [
      {
        description:
          "What this site is, and why it sits outside the official page.",
        label: "About",
        to: "/about",
      },
      {
        description: "Common questions about the program and about the index.",
        label: "FAQ",
        to: "/faq",
      },
      {
        description: "Send materials, report a bug, or ask something.",
        label: "Contact",
        to: "/contact",
      },
      {
        description:
          "Privacy, cookies, analytics, terms, and takedown requests.",
        label: "Privacy and terms",
        to: "/legal",
      },
    ],
    icon: ScaleIcon,
    label: "About this site",
    value: "site",
  },
];

export const SITEMAP_BROWSE_GROUP = {
  color: "chart-2",
  entries: DRIVE_SOURCES.map((source) => ({
    description: `Every folder shared for ${source.label.toLowerCase()}, as it sits in Drive.`,
    folderId: source.rootFolderId,
    label: source.label,
  })) satisfies SitemapBrowseEntry[],
  icon: FolderTreeIcon,
  label: "Drive folders",
  value: "browse",
} as const;

export const SITEMAP_DRIVE_GROUP = {
  color: "chart-1",
  icon: ExternalLinkIcon,
  label: "Drive folders, direct",
  value: "drive",
} as const;

export const SITEMAP_COURSES_GROUP = {
  color: "chart-4",
  icon: BookOpenIcon,
  label: "Course pages",
  value: "courses",
} as const;
