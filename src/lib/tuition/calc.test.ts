import { describe, expect, it } from "vitest";
import {
  TUITION_LBP_PER_CREDIT,
  TUITION_NSSF_LBP_YEARLY,
  TUITION_REGISTRATION_USD_PER_SEMESTER,
  TUITION_USD_PER_CREDIT,
} from "@/config/tuition";
import { buildTuitionCalculation } from "./calc";
import type { TuitionBreakdown, TuitionPlan } from "./types";

const RATE = 89_000;

function plan(overrides: Partial<TuitionPlan> = {}): TuitionPlan {
  return {
    creditsPerSemester: [12, 13],
    financialAidPercent: 40,
    includeFinancialAid: false,
    includeNssf: true,
    includeRegistration: true,
    showAllInUsd: false,
    usdToLbpRate: RATE,
    ...overrides,
  };
}

/** Every row the UI and the exports print has to add up to the totals beside them. */
function toRowSums(breakdown: TuitionBreakdown) {
  return {
    combinedUsd:
      breakdown.grossTuitionUsd +
      breakdown.registrationUsd +
      breakdown.grossLbpAsUsd -
      breakdown.financialAidUsd -
      breakdown.financialAidLbpAsUsd,
    totalLbp:
      breakdown.grossTuitionLbp + breakdown.nssfLbp - breakdown.financialAidLbp,
    totalUsd:
      breakdown.grossTuitionUsd +
      breakdown.registrationUsd -
      breakdown.financialAidUsd,
  };
}

describe("buildTuitionCalculation", () => {
  it("keeps every row additive across all aid settings", () => {
    for (const percent of [0, 25, 40, 60, 100]) {
      for (const includeFinancialAid of [false, true]) {
        const { annualProjection, semesters } = buildTuitionCalculation(
          plan({ financialAidPercent: percent, includeFinancialAid })
        );

        for (const breakdown of [...semesters, annualProjection]) {
          const sums = toRowSums(breakdown);

          expect(breakdown.totalUsd).toBeCloseTo(sums.totalUsd, 6);
          expect(breakdown.totalLbp).toBe(sums.totalLbp);
          expect(breakdown.combinedUsd).toBeCloseTo(sums.combinedUsd, 6);
        }
      }
    }
  });

  it("charges full price when aid is off", () => {
    const [fall, spring] = buildTuitionCalculation(plan()).semesters;

    expect(fall.totalUsd).toBe(
      12 * TUITION_USD_PER_CREDIT + TUITION_REGISTRATION_USD_PER_SEMESTER
    );
    expect(fall.totalLbp).toBe(12 * TUITION_LBP_PER_CREDIT);
    expect(spring.totalUsd).toBe(
      13 * TUITION_USD_PER_CREDIT + TUITION_REGISTRATION_USD_PER_SEMESTER
    );
    expect(spring.totalLbp).toBe(13 * TUITION_LBP_PER_CREDIT);
  });

  /** Fall 2025/2026 as the university billed it: 12 credits at 40% aid, no NSSF. */
  it("matches the official statement for 12 credits at 40%", () => {
    const [fall] = buildTuitionCalculation(
      plan({ includeFinancialAid: true, includeNssf: false })
    ).semesters;

    expect(fall.financialAidLbp).toBe(68_400_000);
    expect(fall.financialAidUsd).toBe(0);
    expect(fall.totalUsd).toBe(1770);
    expect(fall.totalLbp).toBe(21_600_000);
  });

  it("charges registration every semester and keeps NSSF outside them", () => {
    const { annualProjection, semesters, yearlyCharges } =
      buildTuitionCalculation(plan());

    for (const semester of semesters) {
      expect(semester.registrationUsd).toBe(
        TUITION_REGISTRATION_USD_PER_SEMESTER
      );
      expect(semester.nssfLbp).toBe(0);
    }
    expect(yearlyCharges.nssfLbp).toBe(TUITION_NSSF_LBP_YEARLY);
    expect(annualProjection.nssfLbp).toBe(TUITION_NSSF_LBP_YEARLY);
  });

  it("drops NSSF everywhere when it is turned off", () => {
    const { annualProjection, yearlyCharges } = buildTuitionCalculation(
      plan({ includeNssf: false })
    );

    expect(yearlyCharges.nssfLbp).toBe(0);
    expect(yearlyCharges.totalLbp).toBe(0);
    expect(annualProjection.nssfLbp).toBe(0);
  });

  it("charges the cash USD side in full while the LBP side absorbs the aid", () => {
    const [fall] = buildTuitionCalculation(
      plan({ includeFinancialAid: true })
    ).semesters;

    expect(fall.tuitionUsd).toBe(12 * TUITION_USD_PER_CREDIT);
    expect(fall.tuitionLbp).toBe(21_600_000);
  });

  it("spills the leftover onto the cash USD side once the LBP side is used up", () => {
    const [fall] = buildTuitionCalculation(
      plan({ financialAidPercent: 60, includeFinancialAid: true })
    ).semesters;

    expect(fall.financialAidLbp).toBe(12 * TUITION_LBP_PER_CREDIT);
    expect(fall.financialAidUsd).toBe(252);
    expect(fall.totalLbp).toBe(0);
    expect(fall.totalUsd).toBe(
      1620 - 252 + TUITION_REGISTRATION_USD_PER_SEMESTER
    );
  });

  it("keeps a typed out of range percent from over discounting", () => {
    const [fall] = buildTuitionCalculation(
      plan({ financialAidPercent: 500, includeFinancialAid: true })
    ).semesters;

    expect(fall.financialAidLbp).toBe(12 * TUITION_LBP_PER_CREDIT);
    expect(fall.financialAidUsd).toBe(12 * TUITION_USD_PER_CREDIT);
    expect(fall.totalUsd).toBe(TUITION_REGISTRATION_USD_PER_SEMESTER);
  });

  it("never discounts registration or NSSF", () => {
    const [fall] = buildTuitionCalculation(
      plan({ financialAidPercent: 100, includeFinancialAid: true })
    ).semesters;

    expect(fall.totalUsd).toBe(TUITION_REGISTRATION_USD_PER_SEMESTER);
    expect(fall.totalLbp).toBe(0);
  });

  it("adds the annual projection from the semesters and the yearly charges", () => {
    const { annualProjection, semesters, yearlyCharges } =
      buildTuitionCalculation(plan({ includeFinancialAid: true }));
    const parts = [...semesters, yearlyCharges];
    const sum = (pick: (breakdown: TuitionBreakdown) => number) =>
      parts.reduce((total, part) => total + pick(part), 0);

    expect(annualProjection.totalUsd).toBeCloseTo(
      sum((s) => s.totalUsd),
      6
    );
    expect(annualProjection.totalLbp).toBe(sum((s) => s.totalLbp));
    expect(annualProjection.combinedUsd).toBeCloseTo(
      sum((s) => s.combinedUsd),
      6
    );
    expect(annualProjection.financialAidLbp).toBe(
      sum((s) => s.financialAidLbp)
    );
  });

  it("leaves the LBP side out of the USD total when the rate is unusable", () => {
    const [fall] = buildTuitionCalculation(
      plan({ includeFinancialAid: true, usdToLbpRate: 0 })
    ).semesters;

    expect(fall.grossLbpAsUsd).toBe(0);
    expect(fall.financialAidLbpAsUsd).toBe(0);
    expect(fall.combinedUsd).toBe(fall.totalUsd);
  });

  it("converts the LBP charges at the given rate", () => {
    const [fall] = buildTuitionCalculation(
      plan({ includeFinancialAid: true })
    ).semesters;

    expect(fall.lbpAsUsd).toBe(
      Math.round(90_000_000 / RATE) - Math.round(68_400_000 / RATE)
    );
    expect(fall.combinedUsd).toBe(fall.totalUsd + fall.lbpAsUsd);
  });
});
