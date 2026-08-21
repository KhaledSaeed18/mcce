import { formatLbp, formatUsd } from "@/lib/tuition/calc";
import type { TuitionTable } from "@/lib/tuition/export/pdf-tables";
import type {
  TuitionBreakdown,
  TuitionExportPayload,
} from "@/lib/tuition/types";

const YEAR_LABEL = "Year total";

function toUsdRow(label: string, breakdown: TuitionBreakdown): string[] {
  return [
    label,
    String(breakdown.credits),
    formatUsd(breakdown.tuitionUsd),
    formatUsd(breakdown.registrationUsd),
    formatUsd(breakdown.totalUsd),
  ];
}

function toConvertedRow(label: string, breakdown: TuitionBreakdown): string[] {
  return [
    ...toUsdRow(label, breakdown).slice(0, 4),
    formatUsd(breakdown.lbpAsUsd),
    formatUsd(breakdown.combinedUsd),
  ];
}

function toLbpRow(label: string, breakdown: TuitionBreakdown): string[] {
  return [
    label,
    String(breakdown.credits),
    formatLbp(breakdown.tuitionLbp),
    formatLbp(breakdown.nssfLbp),
    formatLbp(breakdown.totalLbp),
  ];
}

function toTable(
  title: string,
  head: string[],
  payload: TuitionExportPayload,
  toRow: (label: string, breakdown: TuitionBreakdown) => string[]
): TuitionTable {
  return {
    body: payload.semesters.map((semester) => toRow(semester.label, semester)),
    foot: [toRow(YEAR_LABEL, payload.annualProjection)],
    head,
    title,
  };
}

export function buildTables(payload: TuitionExportPayload): TuitionTable[] {
  if (payload.plan.showAllInUsd) {
    return [
      toTable(
        "Semester by semester, everything in USD",
        [
          "Semester",
          "Credits",
          "Tuition",
          "Registration",
          "LBP converted",
          "Total",
        ],
        payload,
        toConvertedRow
      ),
    ];
  }

  return [
    toTable(
      "Semester by semester, billed in USD",
      ["Semester", "Credits", "Tuition", "Registration", "Total"],
      payload,
      toUsdRow
    ),
    toTable(
      "Semester by semester, billed in LBP",
      ["Semester", "Credits", "Tuition", "NSSF", "Total"],
      payload,
      toLbpRow
    ),
  ];
}
