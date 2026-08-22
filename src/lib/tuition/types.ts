export type TuitionFinancialAidCoverage = "lbp-only" | "usd-only" | "both";

export interface TuitionBreakdown {
  combinedUsd: number;
  credits: number;
  financialAidLbp: number;
  financialAidLbpAsUsd: number;
  financialAidUsd: number;
  lbpAsUsd: number;
  nssfLbp: number;
  registrationUsd: number;
  totalLbp: number;
  totalUsd: number;
  tuitionLbp: number;
  tuitionUsd: number;
}

export interface TuitionSemesterBreakdown extends TuitionBreakdown {
  carriesYearlyCharges: boolean;
  label: string;
}

export interface TuitionCalculation {
  annualProjection: TuitionBreakdown;
  semesters: TuitionSemesterBreakdown[];
}

export interface TuitionPlan {
  chargeSemesterIndex: number;
  creditsPerSemester: number[];
  financialAidCoverage: TuitionFinancialAidCoverage;
  financialAidPercent: number;
  includeFinancialAid: boolean;
  includeNssf: boolean;
  includeRegistration: boolean;
  showAllInUsd: boolean;
  usdToLbpRate: number;
}

export interface TuitionScenario {
  calculation: TuitionCalculation;
  plan: TuitionPlan;
}

export interface TuitionRateReference {
  lbpPerCredit: number;
  nssfLbpYearly: number;
  registrationUsdYearly: number;
  usdPerCredit: number;
}

/** One snapshot every export format renders from, so PDF, CSV, and JSON cannot drift. */
export interface TuitionExportPayload {
  academicYear: string;
  annualProjection: TuitionBreakdown;
  chargeSemesterLabel: string;
  generatedAt: string;
  plan: TuitionPlan;
  program: string;
  rates: TuitionRateReference;
  semesters: TuitionSemesterBreakdown[];
}
