import type { LucideIcon } from "lucide-react";
import type { DriveNodeKind } from "@/lib/drive/types";

export type HeroQuickLinkRoute =
  | "/course"
  | "/exams"
  | "/plan-of-study"
  | "/gpa-calculator"
  | "/admissions"
  | "/tuition-fees"
  | "/recent"
  | "/search";

export interface HeroQuickLink {
  icon: LucideIcon;
  label: string;
  to: HeroQuickLinkRoute;
}

export interface HeroSearchResult {
  courseCode: string;
  kind: DriveNodeKind;
  materialType: string;
  name: string;
}

export interface HeroSearchQuery {
  results: HeroSearchResult[];
  term: string;
  /** How many files in the index actually match the term, not just the rows shown. */
  total: number;
}
