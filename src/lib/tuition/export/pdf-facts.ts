import { formatLbp, formatUsd } from "@/lib/tuition/calc";
import type { TuitionPdfTile } from "@/lib/tuition/export/pdf-sections";
import type { TuitionExportPayload } from "@/lib/tuition/types";

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
    ["Yearly charges billed in", payload.chargeSemesterLabel],
    [
      "Yearly registration",
      plan.includeRegistration
        ? `Included, ${formatUsd(rates.registrationUsdYearly)} per year`
        : "Not included",
    ],
    [
      "NSSF",
      plan.includeNssf
        ? `Included, ${formatLbp(rates.nssfLbpYearly)} per year`
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
