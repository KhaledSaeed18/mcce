import {
  TUITION_LBP_PER_CREDIT,
  TUITION_NSSF_LBP_YEARLY,
  TUITION_REGISTRATION_USD_YEARLY,
  TUITION_SEMESTER_LABELS,
  TUITION_USD_PER_CREDIT,
} from "@/config/tuition";
import { buildFinancialAid } from "@/lib/tuition/financial-aid";
import type {
  TuitionBreakdown,
  TuitionCalculation,
  TuitionPlan,
  TuitionSemesterBreakdown,
} from "@/lib/tuition/types";

function toCleanCredits(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, value);
}

const EMPTY_BREAKDOWN: TuitionBreakdown = {
  combinedUsd: 0,
  credits: 0,
  financialAidLbp: 0,
  financialAidLbpAsUsd: 0,
  financialAidUsd: 0,
  grossLbpAsUsd: 0,
  grossTuitionLbp: 0,
  grossTuitionUsd: 0,
  lbpAsUsd: 0,
  nssfLbp: 0,
  registrationUsd: 0,
  totalLbp: 0,
  totalUsd: 0,
  tuitionLbp: 0,
  tuitionUsd: 0,
};

function sumBreakdowns(items: TuitionBreakdown[]): TuitionBreakdown {
  return items.reduce<TuitionBreakdown>(
    (total, item) => ({
      combinedUsd: total.combinedUsd + item.combinedUsd,
      credits: total.credits + item.credits,
      financialAidLbp: total.financialAidLbp + item.financialAidLbp,
      financialAidLbpAsUsd:
        total.financialAidLbpAsUsd + item.financialAidLbpAsUsd,
      financialAidUsd: total.financialAidUsd + item.financialAidUsd,
      grossLbpAsUsd: total.grossLbpAsUsd + item.grossLbpAsUsd,
      grossTuitionLbp: total.grossTuitionLbp + item.grossTuitionLbp,
      grossTuitionUsd: total.grossTuitionUsd + item.grossTuitionUsd,
      lbpAsUsd: total.lbpAsUsd + item.lbpAsUsd,
      nssfLbp: total.nssfLbp + item.nssfLbp,
      registrationUsd: total.registrationUsd + item.registrationUsd,
      totalLbp: total.totalLbp + item.totalLbp,
      totalUsd: total.totalUsd + item.totalUsd,
      tuitionLbp: total.tuitionLbp + item.tuitionLbp,
      tuitionUsd: total.tuitionUsd + item.tuitionUsd,
    }),
    EMPTY_BREAKDOWN
  );
}

/**
 * A rate of zero or less cannot convert anything, so the LBP side stays out of the USD total.
 * Every USD figure is printed without cents, so converting to whole dollars keeps the printed
 * rows adding up to the printed total.
 */
export function convertLbpToUsd(lbp: number, usdToLbpRate: number): number {
  if (!(Number.isFinite(usdToLbpRate) && usdToLbpRate > 0)) {
    return 0;
  }

  return Math.round(lbp / usdToLbpRate);
}

function buildSemester(
  rawCredits: number,
  index: number,
  plan: TuitionPlan
): TuitionSemesterBreakdown {
  const credits = toCleanCredits(rawCredits);
  const carriesYearlyCharges = index === plan.chargeSemesterIndex;

  const grossTuitionUsd = credits * TUITION_USD_PER_CREDIT;
  const grossTuitionLbp = credits * TUITION_LBP_PER_CREDIT;
  const registrationUsd =
    carriesYearlyCharges && plan.includeRegistration
      ? TUITION_REGISTRATION_USD_YEARLY
      : 0;
  const nssfLbp =
    carriesYearlyCharges && plan.includeNssf ? TUITION_NSSF_LBP_YEARLY : 0;

  const { financialAidLbp, financialAidUsd } = buildFinancialAid(
    plan,
    credits,
    grossTuitionUsd,
    grossTuitionLbp
  );

  const tuitionUsd = grossTuitionUsd - financialAidUsd;
  const tuitionLbp = grossTuitionLbp - financialAidLbp;
  const totalLbp = tuitionLbp + nssfLbp;
  const totalUsd = tuitionUsd + registrationUsd;

  /* Each converted figure comes from the same parts the rows show, so the USD rows still add up to the USD total. */
  const grossLbpAsUsd =
    convertLbpToUsd(grossTuitionLbp, plan.usdToLbpRate) +
    convertLbpToUsd(nssfLbp, plan.usdToLbpRate);
  const financialAidLbpAsUsd = convertLbpToUsd(
    financialAidLbp,
    plan.usdToLbpRate
  );
  const lbpAsUsd = grossLbpAsUsd - financialAidLbpAsUsd;

  return {
    carriesYearlyCharges,
    combinedUsd: totalUsd + lbpAsUsd,
    credits,
    financialAidLbp,
    financialAidLbpAsUsd,
    financialAidUsd,
    grossLbpAsUsd,
    grossTuitionLbp,
    grossTuitionUsd,
    label: TUITION_SEMESTER_LABELS[index] ?? `Semester ${index + 1}`,
    lbpAsUsd,
    nssfLbp,
    registrationUsd,
    totalLbp,
    totalUsd,
    tuitionLbp,
    tuitionUsd,
  };
}

export function buildTuitionCalculation(plan: TuitionPlan): TuitionCalculation {
  const semesters = plan.creditsPerSemester.map((credits, index) =>
    buildSemester(credits, index, plan)
  );

  return { annualProjection: sumBreakdowns(semesters), semesters };
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(value);
}

export function formatLbp(value: number): string {
  return `${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value)} LBP`;
}
