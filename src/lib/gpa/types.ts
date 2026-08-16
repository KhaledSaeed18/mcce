export type StandingTone = "distinguished" | "honors" | "good" | "probation";

export interface AcademicStanding {
  label: string;
  minGpa: number;
  tone: StandingTone;
}

export interface ScaleReference {
  average: string;
  qualityPoints: number;
}

/** A course row in the calculator. `average` is null until the user types one. */
export interface GradeEntry {
  average: number | null;
  code: string;
  credits: number;
  id: string;
  name: string;
}

export interface GpaTotals {
  credits: number;
  gpa: number | null;
  qualityPoints: number;
}

export interface Projection {
  bestCase: number;
  creditsRemaining: number;
  worstCasePassing: number;
}

export type TargetOutcomeKind = "achievable" | "guaranteed" | "impossible";

export interface TargetOutcome {
  kind: TargetOutcomeKind;
  /** The course average needed across every remaining credit. */
  requiredAverage: number;
  requiredAverageQpt: number;
}
