import type { LucideIcon } from "lucide-react";

export interface HeroLeafNode {
  color: string;
  icon: LucideIcon;
  label: string;
  labelClassName: string;
  x: number;
  y: number;
}

/** The outer tier of the hero graphic: the tools built on top of the index,
 * drawn as unlabelled satellites of the same hub the material nodes hang off. */
export interface HeroToolNode {
  icon: LucideIcon;
  label: string;
  x: number;
  y: number;
}

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
