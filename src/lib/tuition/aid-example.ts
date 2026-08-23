import {
  TUITION_AID_EXAMPLE_CREDITS,
  TUITION_AID_EXAMPLE_PERCENT,
  TUITION_DEFAULT_USD_TO_LBP_RATE,
  TUITION_UNITS_PER_CREDIT,
} from "@/config/tuition";
import { buildTuitionCalculation } from "@/lib/tuition/calc";
import type { TuitionSemesterBreakdown } from "@/lib/tuition/types";

export interface TuitionAidExample {
  aidUnits: number;
  breakdown: TuitionSemesterBreakdown;
  credits: number;
  grossUnits: number;
  percent: number;
}

/** Built from the calculator itself, so the worked example cannot drift from what the tool computes. */
export function buildAidExample(): TuitionAidExample {
  const credits = TUITION_AID_EXAMPLE_CREDITS;
  const percent = TUITION_AID_EXAMPLE_PERCENT;
  const grossUnits = credits * TUITION_UNITS_PER_CREDIT;
  const [breakdown] = buildTuitionCalculation({
    creditsPerSemester: [credits],
    financialAidPercent: percent,
    includeFinancialAid: true,
    includeNssf: false,
    includeRegistration: true,
    showAllInUsd: false,
    usdToLbpRate: TUITION_DEFAULT_USD_TO_LBP_RATE,
  }).semesters;

  return {
    aidUnits: (grossUnits * percent) / 100,
    breakdown,
    credits,
    grossUnits,
    percent,
  };
}
