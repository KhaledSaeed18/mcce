import type { jsPDF } from "jspdf";
import {
  TUITION_PDF_BAR_HEIGHT,
  TUITION_PDF_BAR_LABEL_WIDTH,
  TUITION_PDF_BAR_ROW_HEIGHT,
  TUITION_PDF_CARD_COLOR,
  TUITION_PDF_MUTED_COLOR,
  TUITION_PDF_PAGE_MARGIN,
  TUITION_PDF_TEXT_COLOR,
} from "@/config/tuition-export";

export interface TuitionChartSegment {
  color: readonly [number, number, number];
  label: string;
  value: number;
}

export interface TuitionChartRow {
  label: string;
  segments: TuitionChartSegment[];
}

interface CompositionChartInput {
  formatValue: (value: number) => string;
  rows: TuitionChartRow[];
  width: number;
}

const VALUE_WIDTH = 92;
const LEGEND_SWATCH = 7;
const LEGEND_GAP = 96;

/** A charge the plan excludes is zero everywhere, so it earns no bar and no legend entry. */
function toVisibleRows(rows: TuitionChartRow[]): TuitionChartRow[] {
  const usedLabels = new Set(
    rows.flatMap((row) =>
      row.segments.filter((segment) => segment.value > 0).map((s) => s.label)
    )
  );

  return rows.map((row) => ({
    ...row,
    segments: row.segments.filter((segment) => usedLabels.has(segment.label)),
  }));
}

function sumSegments(row: TuitionChartRow): number {
  return row.segments.reduce((total, segment) => total + segment.value, 0);
}

function drawLegend(
  doc: jsPDF,
  segments: TuitionChartSegment[],
  cursorY: number
): number {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);

  for (const [index, segment] of segments.entries()) {
    const left = TUITION_PDF_PAGE_MARGIN + index * LEGEND_GAP;

    doc.setFillColor(...segment.color);
    doc.rect(left, cursorY - LEGEND_SWATCH, LEGEND_SWATCH, LEGEND_SWATCH, "F");
    doc.setTextColor(...TUITION_PDF_MUTED_COLOR);
    doc.text(segment.label, left + LEGEND_SWATCH + 4, cursorY);
  }

  return cursorY + 16;
}

/** One bar of one color compares nothing, so the section is not worth the space. */
export function hasChartComparison(rows: TuitionChartRow[]): boolean {
  const visibleRows = toVisibleRows(rows);

  return (
    visibleRows.length > 1 || (visibleRows.at(0)?.segments.length ?? 0) > 1
  );
}

/** Bars share one scale so a heavier semester reads as a longer bar, not a fuller one. */
export function drawCompositionChart(
  doc: jsPDF,
  { formatValue, rows, width }: CompositionChartInput,
  cursorY: number
): number {
  const visibleRows = toVisibleRows(rows);
  const trackWidth = width - TUITION_PDF_BAR_LABEL_WIDTH - VALUE_WIDTH;
  const trackLeft = TUITION_PDF_PAGE_MARGIN + TUITION_PDF_BAR_LABEL_WIDTH;
  const peak = Math.max(...visibleRows.map(sumSegments), 1);
  let y = cursorY;

  for (const row of visibleRows) {
    const total = sumSegments(row);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...TUITION_PDF_TEXT_COLOR);
    doc.text(row.label, TUITION_PDF_PAGE_MARGIN, y + TUITION_PDF_BAR_HEIGHT);

    doc.setFillColor(...TUITION_PDF_CARD_COLOR);
    doc.rect(trackLeft, y, trackWidth, TUITION_PDF_BAR_HEIGHT, "F");

    let segmentLeft = trackLeft;
    for (const segment of row.segments) {
      const segmentWidth = (segment.value / peak) * trackWidth;

      doc.setFillColor(...segment.color);
      doc.rect(segmentLeft, y, segmentWidth, TUITION_PDF_BAR_HEIGHT, "F");
      segmentLeft += segmentWidth;
    }

    doc.setFont("helvetica", "bold");
    doc.setTextColor(...TUITION_PDF_TEXT_COLOR);
    doc.text(
      formatValue(total),
      TUITION_PDF_PAGE_MARGIN + width,
      y + TUITION_PDF_BAR_HEIGHT,
      { align: "right" }
    );

    y += TUITION_PDF_BAR_ROW_HEIGHT;
  }

  return drawLegend(doc, visibleRows.at(0)?.segments ?? [], y + 2);
}
