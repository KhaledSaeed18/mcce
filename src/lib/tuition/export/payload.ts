import { PROGRAM_NAME } from "@/config/site";
import {
  TUITION_ACADEMIC_YEAR_LABEL,
  TUITION_LBP_PER_CREDIT,
  TUITION_NSSF_LBP_YEARLY,
  TUITION_REGISTRATION_USD_PER_SEMESTER,
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

  return {
    academicYear: TUITION_ACADEMIC_YEAR_LABEL,
    annualProjection: calculation.annualProjection,
    generatedAt: new Date().toISOString(),
    plan,
    program: PROGRAM_NAME,
    rates: {
      lbpPerCredit: TUITION_LBP_PER_CREDIT,
      nssfLbpYearly: TUITION_NSSF_LBP_YEARLY,
      registrationUsdPerSemester: TUITION_REGISTRATION_USD_PER_SEMESTER,
      usdPerCredit: TUITION_USD_PER_CREDIT,
    },
    semesters: calculation.semesters,
    yearlyCharges: calculation.yearlyCharges,
  };
}
