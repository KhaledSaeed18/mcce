import {
  AudioWaveformIcon,
  BookOpenIcon,
  BrainCircuitIcon,
  ClapperboardIcon,
  CpuIcon,
  DatabaseIcon,
  FlaskConicalIcon,
  GraduationCapIcon,
  ImageIcon,
  type LucideIcon,
  NetworkIcon,
  RadioIcon,
  SatelliteIcon,
  ShieldIcon,
  SigmaIcon,
  SmartphoneIcon,
  WifiIcon,
} from "lucide-react";
import type {
  CurriculumCourseKind,
  CurriculumRequirementCategory,
} from "@/lib/curriculum/types";

export const DEFAULT_COURSE_ICON: LucideIcon = BookOpenIcon;

/** Exact course-code overrides, for courses whose subject a keyword match can't disambiguate. */
export const COURSE_ICON_BY_CODE: Record<string, LucideIcon> = {
  CENG507: CpuIcon,
  CENG557: NetworkIcon,
  CENG566: BrainCircuitIcon,
  CENG566L: FlaskConicalIcon,
  CENG675: ClapperboardIcon,
  EENG527: AudioWaveformIcon,
  EENG537: RadioIcon,
  EENG587: WifiIcon,
  ENGG515: SigmaIcon,
};

/**
 * Fallback for course codes not in COURSE_ICON_BY_CODE: first keyword whose
 * pattern matches the course name wins, so new courses get a relevant icon
 * without a code edit. Ordered most specific first.
 */
export const COURSE_ICON_KEYWORDS: Array<{
  icon: LucideIcon;
  pattern: RegExp;
}> = [
  { icon: GraduationCapIcon, pattern: /thesis|capstone/i },
  { icon: FlaskConicalIcon, pattern: /laboratory|\blab\b/i },
  {
    icon: BrainCircuitIcon,
    pattern: /machine learning|artificial intelligence|\bai\b/i,
  },
  { icon: ClapperboardIcon, pattern: /multimedia/i },
  { icon: ImageIcon, pattern: /image processing|computer vision/i },
  { icon: SatelliteIcon, pattern: /satellite|space/i },
  { icon: ShieldIcon, pattern: /security|cryptograph/i },
  { icon: SmartphoneIcon, pattern: /mobile/i },
  { icon: DatabaseIcon, pattern: /data mining|database/i },
  { icon: AudioWaveformIcon, pattern: /signal processing/i },
  { icon: WifiIcon, pattern: /wireless/i },
  { icon: RadioIcon, pattern: /communication/i },
  { icon: NetworkIcon, pattern: /network/i },
  { icon: SigmaIcon, pattern: /mathematic/i },
  { icon: CpuIcon, pattern: /embedded/i },
];

export const COURSE_CARD_COLORS = [
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
] as const;

/** Badge text for course kinds worth calling out; plain "course" gets no badge. */
export const COURSE_KIND_BADGE_LABEL: Partial<
  Record<CurriculumCourseKind, string>
> = {
  lab: "Lab",
  thesis: "Thesis",
};

/** Badge text for each degree-requirement category. */
export const COURSE_REQUIREMENT_CATEGORY_LABEL: Record<
  CurriculumRequirementCategory,
  string
> = {
  core: "Core Requirement",
  "major-elective": "Major Elective",
  "major-requirement": "Major Requirement",
};
