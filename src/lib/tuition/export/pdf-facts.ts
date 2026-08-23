import {
  TUITION_INTERNAL_LBP_RATE,
  TUITION_UNITS_PER_CREDIT,
  TUITION_USD_PER_CREDIT,
} from "@/config/tuition";
import { formatLbp, formatUsd } from "@/lib/tuition/calc";
import type { TuitionPdfTile } from "@/lib/tuition/export/pdf-sections";
import type { TuitionExportPayload } from "@/lib/tuition/types";

/** The rates every number in the report was built from, stated once under the title. */
export function buildRateSummary(payload: TuitionExportPayload): string {
  const { plan, rates } = payload;
  const parts = [
    `${formatUsd(rates.usdPerCredit)} and ${formatLbp(rates.lbpPerCredit)} per credit`,
    `registration ${formatUsd(rates.registrationUsdPerSemester)} per semester`,
    `NSSF ${formatLbp(rates.nssfLbpYearly)} per year`,
    ...(plan.includeFinancialAid && plan.financialAidPercent > 0
      ? [`financial aid ${plan.financialAidPercent}%`]
      : []),
    ...(plan.showAllInUsd ? [`1 USD = ${formatLbp(plan.usdToLbpRate)}`] : []),
  ];

  return `Rates: ${parts.join(" · ")}`;
}

/** Empty when no aid applies, so the section is skipped rather than printed blank. */
export function buildAidFacts(
  payload: TuitionExportPayload
): [string, string][] {
  const { plan } = payload;

  if (!(plan.includeFinancialAid && plan.financialAidPercent > 0)) {
    return [];
  }

  const lbpUnits = TUITION_UNITS_PER_CREDIT - TUITION_USD_PER_CREDIT;

  return [
    [
      "Credit price",
      `${TUITION_UNITS_PER_CREDIT} per credit: ${formatUsd(TUITION_USD_PER_CREDIT)} in cash USD, plus ${lbpUnits} billed as ${formatLbp(payload.rates.lbpPerCredit)} at ${TUITION_INTERNAL_LBP_RATE.toLocaleString("en-US")}`,
    ],
    [
      "Aid basis",
      `${plan.financialAidPercent}% of the full credit price, not of each currency`,
    ],
    ["Taken from", "The LBP charges first, then the cash USD tuition"],
    ["Not covered", "Registration and NSSF"],
  ];
}

export function buildPlanFacts(
  payload: TuitionExportPayload
): [string, string][] {
  const { plan, rates } = payload;

  return [
    ["Semesters this year", String(payload.semesters.length)],
    [
      "Credits per semester",
      payload.semesters
        .map((semester) => `${semester.label} ${semester.credits}`)
        .join(" · "),
    ],
    ["Credits for the year", String(payload.annualProjection.credits)],
    [
      "Registration",
      plan.includeRegistration
        ? `Included, ${formatUsd(rates.registrationUsdPerSemester)} per semester`
        : "Not included",
    ],
    [
      "NSSF",
      plan.includeNssf
        ? `Included, ${formatLbp(rates.nssfLbpYearly)} per year`
        : "Not included",
    ],
    [
      "Financial aid",
      plan.includeFinancialAid && plan.financialAidPercent > 0
        ? `${plan.financialAidPercent}% of tuition, taken off the LBP charges first`
        : "Not included",
    ],
    [
      "Tuition per credit",
      `${formatUsd(rates.usdPerCredit)} and ${formatLbp(rates.lbpPerCredit)}`,
    ],
    ...(plan.showAllInUsd
      ? ([["Exchange rate", `1 USD = ${formatLbp(plan.usdToLbpRate)}`]] as [
          string,
          string,
        ][])
      : []),
  ];
}

export function buildTotalTiles(
  payload: TuitionExportPayload
): TuitionPdfTile[] {
  const annual = payload.annualProjection;

  if (payload.plan.showAllInUsd) {
    return [
      { label: "Total for the year", value: formatUsd(annual.combinedUsd) },
      { label: "Charges billed in USD", value: formatUsd(annual.totalUsd) },
      {
        label: "LBP charges converted",
        value: formatUsd(annual.lbpAsUsd),
      },
    ];
  }

  return [
    { label: "Total billed in USD", value: formatUsd(annual.totalUsd) },
    { label: "Total billed in LBP", value: formatLbp(annual.totalLbp) },
    { label: "Credits for the year", value: String(annual.credits) },
  ];
}
