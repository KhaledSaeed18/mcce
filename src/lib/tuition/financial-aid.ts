import {
  TUITION_INTERNAL_LBP_RATE,
  TUITION_UNITS_PER_CREDIT,
} from "@/config/tuition";
import type { TuitionPlan } from "@/lib/tuition/types";

export interface TuitionFinancialAid {
  financialAidLbp: number;
  financialAidUsd: number;
}

const NO_AID: TuitionFinancialAid = { financialAidLbp: 0, financialAidUsd: 0 };

/**
 * Aid is a percent of the whole tuition, both currencies together, and the university takes the
 * discount off the LBP charges before it touches the cash USD side.
 */
export function buildFinancialAid(
  plan: TuitionPlan,
  credits: number,
  grossTuitionUsd: number,
  grossTuitionLbp: number
): TuitionFinancialAid {
  if (!plan.includeFinancialAid || plan.financialAidPercent <= 0) {
    return NO_AID;
  }

  const rate = Math.min(plan.financialAidPercent, 100) / 100;
  const aidUnits = credits * TUITION_UNITS_PER_CREDIT * rate;
  const financialAidLbp = Math.min(
    grossTuitionLbp,
    Math.round(aidUnits * TUITION_INTERNAL_LBP_RATE)
  );
  const spilloverUnits = aidUnits - financialAidLbp / TUITION_INTERNAL_LBP_RATE;

  return {
    financialAidLbp,
    financialAidUsd: Math.min(grossTuitionUsd, Math.round(spilloverUnits)),
  };
}
