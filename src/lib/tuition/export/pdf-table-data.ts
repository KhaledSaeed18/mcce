import { formatLbp, formatUsd } from "@/lib/tuition/calc";
import type { TuitionTable } from "@/lib/tuition/export/pdf-tables";
import type {
  TuitionBreakdown,
  TuitionExportPayload,
} from "@/lib/tuition/types";

const YEAR_LABEL = "Year total";
const NSSF_LABEL = "NSSF, yearly";

type RowBuilder = (label: string, breakdown: TuitionBreakdown) => string[];

/** The yearly NSSF row belongs to no semester, so its credits cell stays blank. */
function toCredits(breakdown: TuitionBreakdown): string {
  return breakdown.credits > 0 ? String(breakdown.credits) : "";
}

/** A zero discount is printed as a plain zero, so no row ever reads "-$0". */
function toDeduction(
  value: number,
  format: (amount: number) => string
): string {
  return value > 0 ? `-${format(value)}` : format(0);
}

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
        toCredits(breakdown),
        formatUsd(breakdown.grossTuitionUsd),
        formatUsd(breakdown.registrationUsd),
      ],
      hasAid,
      toDeduction(breakdown.financialAidUsd, formatUsd),
      formatUsd(breakdown.totalUsd)
    );
}

function toConvertedRow(hasAid: boolean): RowBuilder {
  return (label, breakdown) =>
    withAid(
      [
        label,
        toCredits(breakdown),
        formatUsd(breakdown.grossTuitionUsd),
        formatUsd(breakdown.registrationUsd),
        formatUsd(breakdown.grossLbpAsUsd),
      ],
      hasAid,
      toDeduction(
        breakdown.financialAidUsd + breakdown.financialAidLbpAsUsd,
        formatUsd
      ),
      formatUsd(breakdown.combinedUsd)
    );
}

function toLbpRow(hasAid: boolean): RowBuilder {
  return (label, breakdown) =>
    withAid(
      [
        label,
        toCredits(breakdown),
        formatLbp(breakdown.grossTuitionLbp),
        formatLbp(breakdown.nssfLbp),
      ],
      hasAid,
      toDeduction(breakdown.financialAidLbp, formatLbp),
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
        "Breakdown, everything in USD",
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
      "Breakdown billed in USD",
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
      "Breakdown billed in LBP",
      ["Semester", "Credits", "Tuition", "NSSF", ...toHead(hasLbpAid), "Total"],
      payload,
      toLbpRow(hasLbpAid),
      true
    ),
  ];
}
