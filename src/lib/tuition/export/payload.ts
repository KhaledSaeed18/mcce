import { PROGRAM_NAME } from "@/config/site";
import {
  TUITION_ACADEMIC_YEAR_LABEL,
  TUITION_LBP_PER_CREDIT,
  TUITION_NSSF_LBP_YEARLY,
  TUITION_REGISTRATION_USD_YEARLY,
  TUITION_USD_PER_CREDIT,
} from "@/config/tuition";
import type {
  TuitionExportPayload,
  TuitionScenario,
} from "@/lib/tuition/types";

export function buildTuitionExportPayload(
  scenario: TuitionScenario
): TuitionExportPayload {
  const { calculation, plan } = scenario;
  const chargeSemester = calculation.semesters[plan.chargeSemesterIndex];

  return {
    academicYear: TUITION_ACADEMIC_YEAR_LABEL,
    annualProjection: calculation.annualProjection,
    chargeSemesterLabel: chargeSemester?.label ?? "",
    generatedAt: new Date().toISOString(),
    plan,
    program: PROGRAM_NAME,
    rates: {
      lbpPerCredit: TUITION_LBP_PER_CREDIT,
      nssfLbpYearly: TUITION_NSSF_LBP_YEARLY,
      registrationUsdYearly: TUITION_REGISTRATION_USD_YEARLY,
      usdPerCredit: TUITION_USD_PER_CREDIT,
    },
    semesters: calculation.semesters,
  };
}
