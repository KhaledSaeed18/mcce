import {
  TUITION_PDF_LBP_COLOR,
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
  TuitionBreakdown,
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

/** NSSF is paid once for the year, so it gets its own bar instead of one inside a semester. */
function toYearlyRows(
  payload: TuitionExportPayload,
  toValue: (breakdown: TuitionBreakdown) => number
): TuitionChartRow[] {
  const value = toValue(payload.yearlyCharges);

  if (value <= 0) {
    return [];
  }

  return [
    {
      label: "NSSF",
      segments: [toSegment("NSSF", TUITION_PDF_NSSF_COLOR, value)],
    },
  ];
}

export function buildChartSections(
  payload: TuitionExportPayload
): TuitionChartSection[] {
  const { semesters } = payload;

  if (payload.plan.showAllInUsd) {
    return [
      {
        formatValue: formatUsd,
        rows: [
          ...toRows(semesters, (semester) => [
            toSegment(
              "Tuition",
              TUITION_PDF_TUITION_COLOR,
              semester.tuitionUsd
            ),
            toSegment(
              "Registration",
              TUITION_PDF_REGISTRATION_COLOR,
              semester.registrationUsd
            ),
            toSegment(
              "LBP converted",
              TUITION_PDF_LBP_COLOR,
              semester.lbpAsUsd
            ),
          ]),
          ...toYearlyRows(payload, (breakdown) => breakdown.lbpAsUsd),
        ],
        title: "Charges, everything in USD",
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
      title: "Charges billed in USD",
    },
    {
      formatValue: formatLbp,
      rows: [
        ...toRows(semesters, (semester) => [
          toSegment("Tuition", TUITION_PDF_TUITION_COLOR, semester.tuitionLbp),
        ]),
        ...toYearlyRows(payload, (breakdown) => breakdown.nssfLbp),
      ],
      title: "Charges billed in LBP",
    },
  ];
}
