import {
  CSV_BLANK_ROW,
  type CsvValue,
  toCsvFile,
  toCsvRow,
  toYesNo,
} from "@/lib/tuition/export/csv-rows";
import type {
  TuitionBreakdown,
  TuitionExportPayload,
} from "@/lib/tuition/types";

function buildSettingRows(payload: TuitionExportPayload): string[] {
  const { plan } = payload;

  return [
    toCsvRow(["Setting", "Value"]),
    toCsvRow(["Academic year", payload.academicYear]),
    toCsvRow(["Program", payload.program]),
    toCsvRow(["Generated", payload.generatedAt]),
    toCsvRow(["Semesters this year", payload.semesters.length]),
    toCsvRow(["Yearly charges billed in", payload.chargeSemesterLabel]),
    toCsvRow([
      "Include yearly registration",
      toYesNo(plan.includeRegistration),
    ]),
    toCsvRow(["Include NSSF", toYesNo(plan.includeNssf)]),
    toCsvRow(["Financial aid", toYesNo(plan.includeFinancialAid)]),
    ...(plan.includeFinancialAid
      ? [toCsvRow(["Financial aid percent", plan.financialAidPercent])]
      : []),
    toCsvRow(["Show everything in USD", toYesNo(plan.showAllInUsd)]),
    ...(plan.showAllInUsd
      ? [toCsvRow(["USD to LBP rate", plan.usdToLbpRate])]
      : []),
  ];
}

function buildReferenceRows(payload: TuitionExportPayload): string[] {
  const { rates } = payload;

  return [
    toCsvRow(["Reference rate", "Value"]),
    toCsvRow(["Tuition per credit (USD)", rates.usdPerCredit]),
    toCsvRow(["Tuition per credit (LBP)", rates.lbpPerCredit]),
    toCsvRow(["Registration per year (USD)", rates.registrationUsdYearly]),
    toCsvRow(["NSSF per year (LBP)", rates.nssfLbpYearly]),
  ];
}

function buildTableHeader(showAllInUsd: boolean): string {
  return toCsvRow([
    "Period",
    "Credits",
    "Carries yearly charges",
    "Tuition USD",
    "Registration USD",
    "Financial aid USD",
    "Total USD",
    "Tuition LBP",
    "NSSF LBP",
    "Financial aid LBP",
    "Total LBP",
    ...(showAllInUsd ? ["LBP charges converted to USD", "Total in USD"] : []),
  ]);
}

function buildBreakdownRow(
  label: string,
  breakdown: TuitionBreakdown,
  carriesYearlyCharges: CsvValue,
  showAllInUsd: boolean
): string {
  return toCsvRow([
    label,
    breakdown.credits,
    carriesYearlyCharges,
    breakdown.grossTuitionUsd,
    breakdown.registrationUsd,
    -breakdown.financialAidUsd,
    breakdown.totalUsd,
    breakdown.grossTuitionLbp,
    breakdown.nssfLbp,
    -breakdown.financialAidLbp,
    breakdown.totalLbp,
    ...(showAllInUsd ? [breakdown.grossLbpAsUsd, breakdown.combinedUsd] : []),
  ]);
}

export function buildTuitionCsv(payload: TuitionExportPayload): string {
  const { showAllInUsd } = payload.plan;

  return toCsvFile([
    ...buildSettingRows(payload),
    CSV_BLANK_ROW,
    ...buildReferenceRows(payload),
    CSV_BLANK_ROW,
    buildTableHeader(showAllInUsd),
    ...payload.semesters.map((semester) =>
      buildBreakdownRow(
        semester.label,
        semester,
        toYesNo(semester.carriesYearlyCharges),
        showAllInUsd
      )
    ),
    buildBreakdownRow("Year total", payload.annualProjection, "", showAllInUsd),
  ]);
}
