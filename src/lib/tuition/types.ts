export interface TuitionBreakdown {
  combinedUsd: number;
  credits: number;
  financialAidLbp: number;
  financialAidLbpAsUsd: number;
  financialAidUsd: number;
  grossLbpAsUsd: number;
  grossTuitionLbp: number;
  grossTuitionUsd: number;
  lbpAsUsd: number;
  nssfLbp: number;
  registrationUsd: number;
  totalLbp: number;
  totalUsd: number;
  tuitionLbp: number;
  tuitionUsd: number;
}

export interface TuitionSemesterBreakdown extends TuitionBreakdown {
  label: string;
}

export interface TuitionCalculation {
  annualProjection: TuitionBreakdown;
  semesters: TuitionSemesterBreakdown[];
  yearlyCharges: TuitionBreakdown;
}

export interface TuitionPlan {
  creditsPerSemester: number[];
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
  registrationUsdPerSemester: number;
  usdPerCredit: number;
}

/** One snapshot every export format renders from, so PDF, CSV, and JSON cannot drift. */
export interface TuitionExportPayload {
  academicYear: string;
  annualProjection: TuitionBreakdown;
  generatedAt: string;
  plan: TuitionPlan;
  program: string;
  rates: TuitionRateReference;
  semesters: TuitionSemesterBreakdown[];
  yearlyCharges: TuitionBreakdown;
}
