import {
  BookOpenTextIcon,
  CalculatorIcon,
  FilePenLineIcon,
  FileTextIcon,
  HomeIcon,
  LibraryIcon,
  type LucideIcon,
  MapIcon,
  SearchIcon,
} from "lucide-react";
import type { NavRoute } from "@/config/navigation";
import { EDITOR_PATH } from "@/config/pdf-editor";
import { SITE_URL } from "@/config/site";
import { THESIS_GUIDE_PATH } from "@/config/thesis";

export const LINKS_PATH = "/links";
export const LINKS_URL = `${SITE_URL}${LINKS_PATH}`;
/** The site host as people will read it, without the protocol. */
export const LINKS_DISPLAY_HOST = SITE_URL.replace(/^https?:\/\//u, "");

export const LINKS_NAV_LABEL = "Drive folders";
export const LINKS_META_TITLE = "MCCE Google Drive Folders by Semester";
export const LINKS_META_DESCRIPTION =
  "Open the LIU MCCE Google Drive folders for all four semesters: lecture files, videos, exercises, and past exams for both years of the M.S. program.";

export const LINKS_TITLE = "MCCE files,";
export const LINKS_TITLE_HIGHLIGHT = "by semester.";
export const LINKS_FOLDERS_HEADING = "Semester folders in Google Drive";
export const LINKS_FOLDER_ACTION = "Opens in Google Drive";
export const LINKS_SITE_HEADING = "On this site";
export const LINKS_COURSES_HEADING = "What is in each folder";
export const LINKS_COURSES_INTRO =
  "The shared Google Drive folders for MCCE, the two-year M.S. in Computer and Communication Engineering at Lebanese International University. They hold lecture materials, videos, exercises, and past exams.";

export const LINKS_SHARE_LABEL = "Share";
export const LINKS_SHARE_COPIED_LABEL = "Copied";
export const LINKS_SHARE_FAILED_LABEL = "Copy failed";
export const LINKS_SHARE_TITLE = "LIU MCCE course files";

/** The logo's four satellites, in order, each with a filing folder's own tab
 * position so the stack reads as one cabinet drawer. */
export const LINKS_FOLDER_STYLES = [
  { color: "chart-2", tabLeftPercent: 3 },
  { color: "chart-3", tabLeftPercent: 26 },
  { color: "chart-4", tabLeftPercent: 49 },
  { color: "chart-5", tabLeftPercent: 72 },
] as const;

export function getLinksFolderStyle(index: number) {
  return LINKS_FOLDER_STYLES[index % LINKS_FOLDER_STYLES.length];
}

export interface LinksSiteEntry {
  icon: LucideIcon;
  label: string;
  to: NavRoute;
}

export const LINKS_SITE_ENTRIES: LinksSiteEntry[] = [
  { icon: HomeIcon, label: "Home", to: "/" },
  { icon: SearchIcon, label: "Search files", to: "/search" },
  { icon: LibraryIcon, label: "All courses", to: "/course" },
  { icon: FileTextIcon, label: "Past exams", to: "/exams" },
  { icon: MapIcon, label: "Plan of study", to: "/plan-of-study" },
  { icon: CalculatorIcon, label: "GPA calculator", to: "/gpa-calculator" },
  { icon: BookOpenTextIcon, label: "Thesis guide", to: THESIS_GUIDE_PATH },
  { icon: FilePenLineIcon, label: "PDF editor", to: EDITOR_PATH },
];
