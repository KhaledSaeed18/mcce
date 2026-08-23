import { formatLbp, formatUsd } from "@/lib/tuition/calc";
import type { TuitionTable } from "@/lib/tuition/export/pdf-tables";
import type {
  TuitionBreakdown,
  TuitionExportPayload,
} from "@/lib/tuition/types";

const YEAR_LABEL = "Year total";
const NSSF_LABEL = "NSSF, yearly";

type RowBuilder = (label: string, breakdown: TuitionBreakdown) => string[];

function withAid(
  cells: string[],
  hasAid: boolean,
  aid: string,
  total: string
): string[] {
  return hasAid ? [...cells, aid, total] : [...cells, total];
}

function toUsdRow(hasAid: boolean): RowBuilder {
  return (label, breakdown) =>
    withAid(
      [
        label,
        String(breakdown.credits),
        formatUsd(breakdown.grossTuitionUsd),
        formatUsd(breakdown.registrationUsd),
      ],
      hasAid,
      `-${formatUsd(breakdown.financialAidUsd)}`,
      formatUsd(breakdown.totalUsd)
    );
}

function toConvertedRow(hasAid: boolean): RowBuilder {
  return (label, breakdown) =>
    withAid(
      [
        label,
        String(breakdown.credits),
        formatUsd(breakdown.grossTuitionUsd),
        formatUsd(breakdown.registrationUsd),
        formatUsd(breakdown.grossLbpAsUsd),
      ],
      hasAid,
      `-${formatUsd(breakdown.financialAidUsd + breakdown.financialAidLbpAsUsd)}`,
      formatUsd(breakdown.combinedUsd)
    );
}

function toLbpRow(hasAid: boolean): RowBuilder {
  return (label, breakdown) =>
    withAid(
      [
        label,
        String(breakdown.credits),
        formatLbp(breakdown.grossTuitionLbp),
        formatLbp(breakdown.nssfLbp),
      ],
      hasAid,
      `-${formatLbp(breakdown.financialAidLbp)}`,
      formatLbp(breakdown.totalLbp)
    );
}

function toTable(
  title: string,
  head: string[],
  payload: TuitionExportPayload,
  toRow: RowBuilder,
  showsNssf: boolean
): TuitionTable {
  const body = payload.semesters.map((semester) =>
    toRow(semester.label, semester)
  );

  /* NSSF is paid once for the year, so it gets its own row instead of hiding inside a semester. */
  if (showsNssf && payload.yearlyCharges.nssfLbp > 0) {
    body.push(toRow(NSSF_LABEL, payload.yearlyCharges));
  }

  return {
    body,
    foot: [toRow(YEAR_LABEL, payload.annualProjection)],
    head,
    title,
  };
}

export function buildTables(payload: TuitionExportPayload): TuitionTable[] {
  const { annualProjection: annual, plan } = payload;
  const hasUsdAid = annual.financialAidUsd > 0;
  const hasLbpAid = annual.financialAidLbp > 0;
  const toHead = (hasAid: boolean) => (hasAid ? ["Financial aid"] : []);

  if (plan.showAllInUsd) {
    const hasAid = hasUsdAid || hasLbpAid;

    return [
      toTable(
        "Semester by semester, everything in USD",
        [
          "Semester",
          "Credits",
          "Tuition",
          "Registration",
          "LBP converted",
          ...toHead(hasAid),
          "Total",
        ],
        payload,
        toConvertedRow(hasAid),
        true
      ),
    ];
  }

  return [
    toTable(
      "Semester by semester, billed in USD",
      [
        "Semester",
        "Credits",
        "Tuition",
        "Registration",
        ...toHead(hasUsdAid),
        "Total",
      ],
      payload,
      toUsdRow(hasUsdAid),
      false
    ),
    toTable(
      "Semester by semester, billed in LBP",
      ["Semester", "Credits", "Tuition", "NSSF", ...toHead(hasLbpAid), "Total"],
      payload,
      toLbpRow(hasLbpAid),
      true
    ),
  ];
}
