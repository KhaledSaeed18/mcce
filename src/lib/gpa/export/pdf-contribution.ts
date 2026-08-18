import type { jsPDF } from "jspdf";
import {
  PDF_CONTRIBUTION_BAR_HEIGHT,
  PDF_CONTRIBUTION_LABEL_WIDTH,
  PDF_CONTRIBUTION_ROW_HEIGHT,
  PDF_CONTRIBUTION_VALUE_WIDTH,
  PDF_DRAG_COLOR,
  PDF_LIFT_COLOR,
  PDF_MUTED_COLOR,
  PDF_TEXT_COLOR,
} from "@/config/gpa-export";
import { toContributionPercent } from "@/lib/gpa/chart";
import type { CourseContribution } from "@/lib/gpa/contribution";
import { formatContribution } from "@/lib/gpa/standing";

const PERCENT = 100;

interface ContributionBox {
  centre: number;
  half: number;
  left: number;
  width: number;
}

function drawRow(
  doc: jsPDF,
  contribution: CourseContribution,
  peak: number,
  box: ContributionBox,
  y: number
) {
  const isLift = contribution.contribution >= 0;
  const length =
    (toContributionPercent(contribution.contribution, peak) / PERCENT) *
    box.half;

  doc.setFontSize(7.5);
  doc.setTextColor(...PDF_TEXT_COLOR);
  doc.text(contribution.code, box.left, y);

  doc.setFillColor(...(isLift ? PDF_LIFT_COLOR : PDF_DRAG_COLOR));
  doc.rect(
    isLift ? box.centre : box.centre - length,
    y - PDF_CONTRIBUTION_BAR_HEIGHT + 1,
    length,
    PDF_CONTRIBUTION_BAR_HEIGHT,
    "F"
  );

  doc.setTextColor(...PDF_MUTED_COLOR);
  doc.text(
    formatContribution(contribution.contribution),
    box.left + box.width,
    y,
    { align: "right" }
  );
}

/**
 * Diverging bars around a centre line, matching the on-page chart. Callers must
 * reserve the full height first: 18 rows always fit on a fresh page, so this
 * never paginates mid-chart.
 */
export function drawContributionChart(
  doc: jsPDF,
  contributions: CourseContribution[],
  peak: number,
  left: number,
  top: number,
  width: number
): number {
  const trackLeft = left + PDF_CONTRIBUTION_LABEL_WIDTH;
  const trackWidth =
    width - PDF_CONTRIBUTION_LABEL_WIDTH - PDF_CONTRIBUTION_VALUE_WIDTH;
  const box: ContributionBox = {
    centre: trackLeft + trackWidth / 2,
    half: trackWidth / 2,
    left,
    width,
  };
  const height = contributions.length * PDF_CONTRIBUTION_ROW_HEIGHT;

  doc.setDrawColor(...PDF_MUTED_COLOR);
  doc.setLineWidth(0.5);
  doc.line(
    box.centre,
    top - PDF_CONTRIBUTION_BAR_HEIGHT,
    box.centre,
    top + height - PDF_CONTRIBUTION_ROW_HEIGHT + 2
  );

  for (const [index, contribution] of contributions.entries()) {
    drawRow(
      doc,
      contribution,
      peak,
      box,
      top + index * PDF_CONTRIBUTION_ROW_HEIGHT
    );
  }

  return top + height + 12;
}
