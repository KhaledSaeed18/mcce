export interface TuitionBreakdown {
  combinedUsd: number;
  credits: number;
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
  includeNssf: boolean;
  includeRegistration: boolean;
  showAllInUsd: boolean;
  usdToLbpRate: number;
}

export interface TuitionScenario {
  calculation: TuitionCalculation;
  plan: TuitionPlan;
}
