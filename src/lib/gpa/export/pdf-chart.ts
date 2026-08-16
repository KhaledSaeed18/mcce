import type { jsPDF } from "jspdf";
import { GPA_AXIS_TICKS, MAX_QUALITY_POINTS } from "@/config/gpa";
import {
  PDF_CHART_BAR_WIDTH,
  PDF_CHART_HEIGHT,
  PDF_CHART_WIDTH_PER_POINT,
  PDF_CUMULATIVE_COLOR,
  PDF_MUTED_COLOR,
  PDF_SEMESTER_COLOR,
  PDF_TEXT_COLOR,
} from "@/config/gpa-export";
import type { GpaTrendPoint } from "@/lib/gpa/chart";
import { formatGpa } from "@/lib/gpa/standing";

const AXIS_LABEL_WIDTH = 24;
const DOT_RADIUS = 2.6;
const LEGEND_HEIGHT = 14;

interface ChartBox {
  height: number;
  left: number;
  top: number;
  width: number;
}

function toY(box: ChartBox, gpa: number): number {
  return box.top + box.height - (gpa / MAX_QUALITY_POINTS) * box.height;
}

function toX(box: ChartBox, index: number, total: number): number {
  return box.left + ((index + 0.5) / total) * box.width;
}

function drawGrid(doc: jsPDF, box: ChartBox) {
  doc.setLineWidth(0.5);
  doc.setFontSize(7);

  for (const tick of GPA_AXIS_TICKS) {
    const y = toY(box, tick);
    doc.setDrawColor(...PDF_MUTED_COLOR);
    doc.line(box.left, y, box.left + box.width, y);
    doc.setTextColor(...PDF_MUTED_COLOR);
    doc.text(tick.toFixed(1), box.left - 4, y + 2.5, { align: "right" });
  }
}

function drawBars(doc: jsPDF, box: ChartBox, points: GpaTrendPoint[]) {
  doc.setFillColor(...PDF_SEMESTER_COLOR);

  for (const [index, point] of points.entries()) {
    const y = toY(box, point.semesterGpa);
    doc.rect(
      toX(box, index, points.length) - PDF_CHART_BAR_WIDTH / 2,
      y,
      PDF_CHART_BAR_WIDTH,
      box.top + box.height - y,
      "F"
    );
  }
}

function drawCumulativeLine(
  doc: jsPDF,
  box: ChartBox,
  points: GpaTrendPoint[]
) {
  doc.setDrawColor(...PDF_CUMULATIVE_COLOR);
  doc.setFillColor(...PDF_CUMULATIVE_COLOR);
  doc.setLineWidth(1.4);

  for (const [index, point] of points.entries()) {
    const x = toX(box, index, points.length);
    const y = toY(box, point.cumulativeGpa);

    if (index > 0) {
      const previous = points[index - 1];
      doc.line(
        toX(box, index - 1, points.length),
        toY(box, previous.cumulativeGpa),
        x,
        y
      );
    }
    doc.circle(x, y, DOT_RADIUS, "F");
  }
}

function drawAxisLabels(doc: jsPDF, box: ChartBox, points: GpaTrendPoint[]) {
  doc.setFontSize(7);
  doc.setTextColor(...PDF_MUTED_COLOR);

  for (const [index, point] of points.entries()) {
    doc.text(
      point.label,
      toX(box, index, points.length),
      box.top + box.height + 12,
      {
        align: "center",
      }
    );
  }
}

function drawLegend(doc: jsPDF, box: ChartBox) {
  const y = box.top - 8;

  doc.setFontSize(7);
  doc.setFillColor(...PDF_SEMESTER_COLOR);
  doc.rect(box.left, y - 4, 6, 6, "F");
  doc.setTextColor(...PDF_MUTED_COLOR);
  doc.text("Semester GPA", box.left + 10, y + 1);

  doc.setDrawColor(...PDF_CUMULATIVE_COLOR);
  doc.setLineWidth(1.4);
  doc.line(box.left + 72, y - 1, box.left + 84, y - 1);
  doc.text("Cumulative GPA", box.left + 88, y + 1);
}

/** Labels only the last point, so the numbers stay readable. */
function drawEndLabel(doc: jsPDF, box: ChartBox, points: GpaTrendPoint[]) {
  const last = points.at(-1);

  if (!last) {
    return;
  }

  doc.setFontSize(7.5);
  doc.setTextColor(...PDF_TEXT_COLOR);
  doc.text(
    formatGpa(last.cumulativeGpa),
    toX(box, points.length - 1, points.length),
    toY(box, last.cumulativeGpa) - 7,
    { align: "center" }
  );
}

/** Draws the trend chart as vectors and returns the y cursor below it. */
export function drawTrendChart(
  doc: jsPDF,
  points: GpaTrendPoint[],
  left: number,
  top: number,
  width: number
): number {
  const plotWidth = Math.min(
    width - AXIS_LABEL_WIDTH,
    points.length * PDF_CHART_WIDTH_PER_POINT
  );
  const box: ChartBox = {
    height: PDF_CHART_HEIGHT,
    left: left + AXIS_LABEL_WIDTH,
    // Leaves room for the legend, which sits just above the plot.
    top: top + LEGEND_HEIGHT,
    width: plotWidth,
  };

  drawGrid(doc, box);
  drawBars(doc, box, points);
  drawCumulativeLine(doc, box, points);
  drawAxisLabels(doc, box, points);
  drawLegend(doc, box);
  drawEndLabel(doc, box, points);

  return box.top + box.height + 28;
}
