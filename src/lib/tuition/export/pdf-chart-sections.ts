import {
  TUITION_PDF_NSSF_COLOR,
  TUITION_PDF_REGISTRATION_COLOR,
  TUITION_PDF_TUITION_COLOR,
} from "@/config/tuition-export";
import { formatLbp, formatUsd } from "@/lib/tuition/calc";
import type {
  TuitionChartRow,
  TuitionChartSegment,
} from "@/lib/tuition/export/pdf-chart";
import type {
  TuitionExportPayload,
  TuitionSemesterBreakdown,
} from "@/lib/tuition/types";

export interface TuitionChartSection {
  formatValue: (value: number) => string;
  rows: TuitionChartRow[];
  title: string;
}

function toSegment(
  label: string,
  color: readonly [number, number, number],
  value: number
): TuitionChartSegment {
  return { color, label, value };
}

function toRows(
  semesters: TuitionSemesterBreakdown[],
  toSegments: (semester: TuitionSemesterBreakdown) => TuitionChartSegment[]
): TuitionChartRow[] {
  return semesters.map((semester) => ({
    label: semester.label,
    segments: toSegments(semester),
  }));
}

export function buildChartSections(
  payload: TuitionExportPayload
): TuitionChartSection[] {
  const { semesters } = payload;

  if (payload.plan.showAllInUsd) {
    return [
      {
        formatValue: formatUsd,
        rows: toRows(semesters, (semester) => [
          toSegment("Tuition", TUITION_PDF_TUITION_COLOR, semester.tuitionUsd),
          toSegment(
            "Registration",
            TUITION_PDF_REGISTRATION_COLOR,
            semester.registrationUsd
          ),
          toSegment("LBP converted", TUITION_PDF_NSSF_COLOR, semester.lbpAsUsd),
        ]),
        title: "Cost per semester, in USD",
      },
    ];
  }

  return [
    {
      formatValue: formatUsd,
      rows: toRows(semesters, (semester) => [
        toSegment("Tuition", TUITION_PDF_TUITION_COLOR, semester.tuitionUsd),
        toSegment(
          "Registration",
          TUITION_PDF_REGISTRATION_COLOR,
          semester.registrationUsd
        ),
      ]),
      title: "Cost per semester, billed in USD",
    },
    {
      formatValue: formatLbp,
      rows: toRows(semesters, (semester) => [
        toSegment("Tuition", TUITION_PDF_TUITION_COLOR, semester.tuitionLbp),
        toSegment("NSSF", TUITION_PDF_NSSF_COLOR, semester.nssfLbp),
      ]),
      title: "Cost per semester, billed in LBP",
    },
  ];
}
