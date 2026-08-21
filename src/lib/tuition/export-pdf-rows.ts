import type { jsPDF } from "jspdf";
import { formatLbp, formatUsd } from "@/lib/tuition/calc";
import {
  LBP_COLUMN_X,
  PAGE_MARGIN,
  ROW_HEIGHT,
  TEXT_COLOR,
  USD_COLUMN_X,
} from "@/lib/tuition/pdf-theme";
import type { TuitionBreakdown } from "@/lib/tuition/types";

export function drawRow(
  doc: jsPDF,
  label: string,
  usd: string,
  lbp: string,
  y: number
) {
  doc.setFontSize(11);
  doc.setTextColor(...TEXT_COLOR);
  doc.text(label, PAGE_MARGIN, y);
  doc.text(usd, USD_COLUMN_X, y, { align: "right" });
  doc.text(lbp, LBP_COLUMN_X, y, { align: "right" });
}

export function drawBreakdown(
  doc: jsPDF,
  label: string,
  breakdown: TuitionBreakdown,
  startY: number
): number {
  let y = startY;

  doc.setFont("helvetica", "bold");
  drawRow(doc, `${label} (${breakdown.credits} credits)`, "", "", y);
  y += ROW_HEIGHT;

  doc.setFont("helvetica", "normal");
  drawRow(
    doc,
    "Tuition",
    formatUsd(breakdown.tuitionUsd),
    formatLbp(breakdown.tuitionLbp),
    y
  );
  y += ROW_HEIGHT;
  drawRow(doc, "Registration", formatUsd(breakdown.registrationUsd), "-", y);
  y += ROW_HEIGHT;
  drawRow(doc, "NSSF", "-", formatLbp(breakdown.nssfLbp), y);
  y += ROW_HEIGHT;

  doc.setFont("helvetica", "bold");
  drawRow(
    doc,
    "Total",
    formatUsd(breakdown.totalUsd),
    formatLbp(breakdown.totalLbp),
    y
  );
  doc.setFont("helvetica", "normal");

  return y + ROW_HEIGHT + 14;
}
