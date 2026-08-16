import type { jsPDF } from "jspdf";
import { GRADUATION_MIN_GPA, MAX_COURSE_AVERAGE } from "@/config/gpa";
import {
  PDF_MUTED_COLOR,
  PDF_PAGE_MARGIN,
  PDF_TEXT_COLOR,
} from "@/config/gpa-export";
import { formatGpa } from "@/lib/gpa/standing";
import type { GpaExportPayload } from "./types";

export function drawHeading(doc: jsPDF, text: string, cursorY: number): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...PDF_TEXT_COLOR);
  doc.text(text, PDF_PAGE_MARGIN, cursorY);

  return cursorY + 16;
}

function drawPairs(
  doc: jsPDF,
  pairs: [string, string][],
  cursorY: number
): number {
  let y = cursorY;

  for (const [label, value] of pairs) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...PDF_MUTED_COLOR);
    doc.text(label, PDF_PAGE_MARGIN, y);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...PDF_TEXT_COLOR);
    doc.text(value, PDF_PAGE_MARGIN + 170, y);
    y += 14;
  }

  return y + 10;
}

export function drawSummary(
  doc: jsPDF,
  payload: GpaExportPayload,
  cursorY: number
): number {
  const { cumulative, degreeCredits, standing } = payload;

  return drawPairs(
    doc,
    [
      [
        "Cumulative GPA",
        cumulative.gpa === null ? "Not graded yet" : formatGpa(cumulative.gpa),
      ],
      ["Credits graded", `${cumulative.credits} of ${degreeCredits}`],
      ["Quality points", cumulative.qualityPoints.toFixed(2)],
      ["Standing", standing ?? "Not graded yet"],
      ["Needed to graduate", formatGpa(GRADUATION_MIN_GPA)],
    ],
    cursorY
  );
}

export function drawProjection(
  doc: jsPDF,
  payload: GpaExportPayload,
  cursorY: number
): number {
  const { projection } = payload;

  if (!projection) {
    return cursorY;
  }

  return drawPairs(
    doc,
    [
      ["Credits left to grade", String(projection.creditsRemaining)],
      ["Highest reachable GPA", formatGpa(projection.bestCase)],
      ["Lowest passing GPA", formatGpa(projection.worstCasePassing)],
    ],
    cursorY
  );
}

function describeTarget(payload: GpaExportPayload): string {
  const { target } = payload;

  if (!target) {
    return "Every credit is graded, so there is nothing left to solve for.";
  }

  if (target.kind === "impossible") {
    return `Out of reach. It would need an average of ${target.requiredAverage.toFixed(1)}, above the ${MAX_COURSE_AVERAGE} maximum.`;
  }

  if (target.kind === "guaranteed") {
    return "Already locked in by passing every remaining course.";
  }

  return `Average ${target.requiredAverage.toFixed(1)} across every remaining credit, which is ${formatGpa(target.requiredAverageQpt)} quality points per credit.`;
}

export function drawTarget(
  doc: jsPDF,
  payload: GpaExportPayload,
  cursorY: number
): number {
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...PDF_MUTED_COLOR);
  doc.text(
    `Target GPA: ${formatGpa(payload.targetGpa)}`,
    PDF_PAGE_MARGIN,
    cursorY
  );

  const lines = doc.splitTextToSize(
    describeTarget(payload),
    pageWidth - PDF_PAGE_MARGIN * 2
  );
  doc.setTextColor(...PDF_TEXT_COLOR);
  doc.text(lines, PDF_PAGE_MARGIN, cursorY + 14);

  return cursorY + 14 + lines.length * 12 + 12;
}
