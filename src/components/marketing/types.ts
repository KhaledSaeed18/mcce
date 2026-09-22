import type { LucideIcon } from "lucide-react";

export type HeroQuickLinkRoute =
  | "/course"
  | "/exams"
  | "/plan-of-study"
  | "/gpa-calculator"
  | "/admissions"
  | "/tuition-fees"
  | "/recent"
  | "/search"
  | "/editor";

export interface HeroQuickLink {
  icon: LucideIcon;
  label: string;
  to: HeroQuickLinkRoute;
}

export interface HeroStationMaterial {
  count: number;
  type: string;
}

/** A course on the hero radio dial. Its frequency is read from the course code. */
export interface HeroStation {
  code: string;
  fileCount: number;
  frequency: number;
  /** The course number as the dial prints it, "537" or "566L". */
  label: string;
  /** The largest material types first, with the long tail folded into "other". */
  materials: HeroStationMaterial[];
  name: string;
  semester: string;
}
