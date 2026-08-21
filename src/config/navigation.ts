import {
  BookmarkIcon,
  CalculatorIcon,
  ClockIcon,
  CompassIcon,
  DollarSignIcon,
  FileTextIcon,
  FolderIcon,
  GraduationCapIcon,
  HardDriveIcon,
  HomeIcon,
  InfoIcon,
  LibraryIcon,
  type LucideIcon,
  MailIcon,
  MapIcon,
  NetworkIcon,
  ScaleIcon,
  SearchIcon,
  ShieldQuestionIcon,
} from "lucide-react";
import type { COURSE_CARD_COLORS } from "@/config/courses";
import { DRIVE_DIRECT_LINKS } from "@/config/drive-links";
import { PROGRAM_OFFICIAL_POS_URL, PROGRAM_OFFICIAL_URL } from "@/config/site";
import { DRIVE_SOURCES } from "@/config/sources";

/** The command palette shows a shortlist; the search page is where everything is. */
export const COMMAND_RESULT_LIMIT = 8;

export type NavRoute =
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
  | "/legal"
  | "/sitemap";

interface NavEntryBase {
  description: string;
  icon: LucideIcon;
  label: string;
}

export type NavEntry =
  | (NavEntryBase & { to: NavRoute })
  | (NavEntryBase & { folderId: string; to: "/browse/$folderId" })
  | (NavEntryBase & { href: string });

export interface NavGroup {
  color: (typeof COURSE_CARD_COLORS)[number];
  entries: NavEntry[];
  icon: LucideIcon;
  label: string;
  /** Sits beside the entries as the group's one-line reason for existing. */
  tagline: string;
  value: string;
}

const BROWSE_ENTRIES: NavEntry[] = [
  {
    description: "The index at a glance, with the newest files on top.",
    icon: HomeIcon,
    label: "Home",
    to: "/",
  },
  {
    description: "Every indexed file by name, course, semester, or type.",
    icon: SearchIcon,
    label: "Search files",
    to: "/search",
  },
  {
    description: "All courses, grouped by year and semester.",
    icon: LibraryIcon,
    label: "All courses",
    to: "/course",
  },
  {
    description: "Exams and quizzes pulled out of the course folders.",
    icon: FileTextIcon,
    label: "Past exams",
    to: "/exams",
  },
  {
    description: "What reached the Drive in the most recent syncs.",
    icon: ClockIcon,
    label: "Recently added",
    to: "/recent",
  },
  {
    description: "Files you kept, held in this browser on this device.",
    icon: BookmarkIcon,
    label: "Saved",
    to: "/saved",
  },
  ...DRIVE_SOURCES.map((source) => ({
    description: `Folders shared for ${source.label.toLowerCase()}, as they sit in Drive.`,
    folderId: source.rootFolderId,
    icon: FolderIcon,
    label: source.label,
    to: "/browse/$folderId" as const,
  })),
  ...DRIVE_DIRECT_LINKS.map((link) => ({
    description: `Opens ${link.driveLabel} in Google Drive, outside this site.`,
    href: link.href,
    icon: HardDriveIcon,
    label: `${link.label} in Drive`,
  })),
];

const PROGRAM_ENTRIES: NavEntry[] = [
  {
    description: "The full plan with prerequisites drawn as a roadmap.",
    icon: MapIcon,
    label: "Plan of study",
    to: "/plan-of-study",
  },
  {
    description: "Semester and cumulative GPA on the program's scale.",
    icon: CalculatorIcon,
    label: "GPA calculator",
    to: "/gpa-calculator",
  },
  {
    description:
      "Reference tuition numbers and plan credits for each semester.",
    icon: DollarSignIcon,
    label: "Tuition and fees",
    to: "/tuition-fees",
  },
  {
    description: "Admissions steps, required documents, and contact emails.",
    icon: GraduationCapIcon,
    label: "Admissions guide",
    to: "/admissions",
  },
  {
    description: "The plan of study as published by the department.",
    href: PROGRAM_OFFICIAL_POS_URL,
    icon: GraduationCapIcon,
    label: "Official plan (PDF)",
  },
  {
    description: "The department's own page for the graduate programs.",
    href: PROGRAM_OFFICIAL_URL,
    icon: NetworkIcon,
    label: "Official program page",
  },
];

const SITE_ENTRIES: NavEntry[] = [
  {
    description:
      "What this site is, and why it sits outside the official page.",
    icon: InfoIcon,
    label: "About",
    to: "/about",
  },
  {
    description: "Common questions about the program and about the index.",
    icon: ShieldQuestionIcon,
    label: "FAQ",
    to: "/faq",
  },
  {
    description: "Send materials, report a bug, or ask something.",
    icon: MailIcon,
    label: "Contact",
    to: "/contact",
  },
  {
    description: "Privacy, cookies, analytics, terms, and takedowns.",
    icon: ScaleIcon,
    label: "Privacy and terms",
    to: "/legal",
  },
  {
    description: "Every page on this site, listed on one page.",
    icon: CompassIcon,
    label: "Sitemap",
    to: "/sitemap",
  },
];

export const NAV_GROUPS: NavGroup[] = [
  {
    color: "chart-1",
    entries: BROWSE_ENTRIES,
    icon: CompassIcon,
    label: "Browse",
    tagline: "Everything indexed from the shared Drive folders.",
    value: "browse",
  },
  {
    color: "chart-3",
    entries: PROGRAM_ENTRIES,
    icon: MapIcon,
    label: "Program",
    tagline: "The plan you follow and the math that goes with it.",
    value: "program",
  },
  {
    color: "chart-5",
    entries: SITE_ENTRIES,
    icon: InfoIcon,
    label: "About",
    tagline: "Who runs this index, and how to reach them.",
    value: "site",
  },
];

/** Past this many entries a group reads better as two columns than one long list. */
export const MEGA_MENU_TWO_COLUMN_THRESHOLD = 4;
