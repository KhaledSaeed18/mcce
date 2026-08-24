export type CceRequirementCategory =
  | "core"
  | "general-education"
  | "general-education-elective"
  | "major-elective"
  | "major-requirement";

export type CceProgramId = "ceng" | "teng";

export type CceTerm = "fall" | "spring" | "summer";

export interface CceCourse {
  code: string;
  corequisites: string[];
  credits: number;
  /** Null when the department publishes no English description for the course. */
  description: string | null;
  name: string;
  prerequisites: string[];
}

/** A filled course slot, or an elective the student picks from a list. */
export type CcePlanEntry =
  | { code: string; kind: "course" }
  | { credits: number; kind: "elective"; label: string };

export interface CcePlanSemester {
  entries: CcePlanEntry[];
  id: string;
  label: string;
  term: CceTerm;
}

export interface CcePlanYear {
  id: string;
  label: string;
  semesters: CcePlanSemester[];
  year: number;
}

export interface CceRequirementBlock {
  category: CceRequirementCategory;
  /** Course codes in the block. Empty for blocks the contract sheet leaves open. */
  codes: string[];
  credits: number;
  label: string;
  /** What the contract sheet leaves unsaid, such as which options actually run. */
  note?: string;
}

export interface CceProgramLinks {
  contractSheet: string;
  courseDescriptions: string;
  planOfStudy: string;
}

export interface CceProgram {
  /** The abbreviation students use, such as CENG. */
  abbreviation: string;
  credits: number;
  degree: string;
  /**
   * The major electives students actually end up taking, which is narrower than
   * the published option list when an option never opens in a term.
   */
  effectiveMajorElectiveCodes: string[];
  id: CceProgramId;
  links: CceProgramLinks;
  /** The registrar's major code, which differs from the abbreviation for TENG. */
  majorCode: string;
  plan: CcePlanYear[];
  requirements: CceRequirementBlock[];
  shortLabel: string;
  summary: string;
  years: number;
}
