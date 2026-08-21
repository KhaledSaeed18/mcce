import {
  TUITION_LBP_PER_CREDIT,
  TUITION_NSSF_LBP_YEARLY,
  TUITION_REGISTRATION_USD_YEARLY,
  TUITION_SEMESTER_LABELS,
  TUITION_USD_PER_CREDIT,
} from "@/config/tuition";
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
  credits: 0,
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
      credits: total.credits + item.credits,
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

function buildSemester(
  rawCredits: number,
  index: number,
  plan: TuitionPlan
): TuitionSemesterBreakdown {
  const credits = toCleanCredits(rawCredits);
  const carriesYearlyCharges = index === plan.chargeSemesterIndex;

  const tuitionUsd = credits * TUITION_USD_PER_CREDIT;
  const tuitionLbp = credits * TUITION_LBP_PER_CREDIT;
  const registrationUsd =
    carriesYearlyCharges && plan.includeRegistration
      ? TUITION_REGISTRATION_USD_YEARLY
      : 0;
  const nssfLbp =
    carriesYearlyCharges && plan.includeNssf ? TUITION_NSSF_LBP_YEARLY : 0;

  return {
    carriesYearlyCharges,
    credits,
    label: TUITION_SEMESTER_LABELS[index] ?? `Semester ${index + 1}`,
    nssfLbp,
    registrationUsd,
    totalLbp: tuitionLbp + nssfLbp,
    totalUsd: tuitionUsd + registrationUsd,
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
