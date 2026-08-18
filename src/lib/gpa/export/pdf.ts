import type { jsPDF } from "jspdf";
import {
  PDF_BRAND_COLOR,
  PDF_CHART_HEIGHT,
  PDF_CONTRIBUTION_ROW_HEIGHT,
  PDF_HEADER_HEIGHT,
  PDF_MUTED_COLOR,
  PDF_PAGE_MARGIN,
  PDF_PAPER_COLOR,
  PDF_TEXT_COLOR,
} from "@/config/gpa-export";
import { getPeakContribution } from "@/lib/gpa/chart";
import { formatGpa } from "@/lib/gpa/standing";
import { drawTrendChart } from "./pdf-chart";
import {
  drawFooters,
  drawHeader,
  fillPageBackground,
  loadLogoDataUrl,
} from "./pdf-chrome";
import { drawContributionChart } from "./pdf-contribution";
import {
  drawHeading,
  drawProjection,
  drawSummary,
  drawTarget,
} from "./pdf-sections";
import type {
  GpaExportPayload,
  GpaExportSections,
  GpaExportSemester,
} from "./types";

interface JsPdfWithAutoTable extends jsPDF {
  lastAutoTable?: { finalY: number };
}

type AutoTable = typeof import("jspdf-autotable").default;

function buildCourseRows(semester: GpaExportSemester): string[][] {
  return semester.courses.map((course) => [
    course.code,
    course.name,
    String(course.credits),
    course.average === null ? "--" : String(course.average),
    course.qualityPoints === null ? "--" : course.qualityPoints.toFixed(2),
  ]);
}

function drawSemesterTable(
  doc: JsPdfWithAutoTable,
  autoTable: AutoTable,
  semester: GpaExportSemester,
  cursorY: number
): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...PDF_MUTED_COLOR);
  doc.text(
    `${semester.label} · ${semester.credits} credits · GPA ${semester.gpa === null ? "--" : formatGpa(semester.gpa)}`,
    PDF_PAGE_MARGIN,
    cursorY
  );

  autoTable(doc, {
    body: buildCourseRows(semester),
    columnStyles: {
      2: { cellWidth: 45, halign: "center" },
      3: { cellWidth: 55, halign: "right" },
      4: { cellWidth: 70, halign: "right" },
    },
    head: [["Code", "Course", "Credits", "Average", "Quality points"]],
    headStyles: {
      fillColor: [...PDF_BRAND_COLOR],
      fontStyle: "bold",
      textColor: [...PDF_TEXT_COLOR],
    },
    margin: { left: PDF_PAGE_MARGIN, right: PDF_PAGE_MARGIN },
    startY: cursorY + 10,
    styles: {
      fillColor: [...PDF_PAPER_COLOR],
      fontSize: 9,
      textColor: [...PDF_TEXT_COLOR],
    },
    theme: "grid",
  });

  // lastAutoTable is assigned imperatively by the plugin at runtime.
  // biome-ignore lint/suspicious/noUnnecessaryConditions: see comment above
  return (doc.lastAutoTable?.finalY ?? cursorY) + 22;
}

export async function buildGpaPdf(
  payload: GpaExportPayload,
  sections: GpaExportSections
): Promise<jsPDF> {
  const [{ jsPDF: JsPdf }, { default: autoTable }, logoDataUrl] =
    await Promise.all([
      import("jspdf"),
      import("jspdf-autotable"),
      loadLogoDataUrl(),
    ]);

  const doc = new JsPdf({ format: "letter", unit: "pt" }) as JsPdfWithAutoTable;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - PDF_PAGE_MARGIN * 2;

  fillPageBackground(doc);
  drawHeader(doc, logoDataUrl);
  let cursorY = PDF_HEADER_HEIGHT + 30;

  const ensureSpace = (height: number) => {
    if (cursorY + height > pageHeight - PDF_PAGE_MARGIN) {
      doc.addPage();
      fillPageBackground(doc);
      cursorY = PDF_PAGE_MARGIN;
    }
  };

  if (sections.summary) {
    cursorY = drawHeading(doc, "Summary", cursorY);
    cursorY = drawSummary(doc, payload, cursorY);
  }

  if (sections.chart && payload.trend.length > 0) {
    ensureSpace(PDF_CHART_HEIGHT + 60);
    cursorY = drawHeading(doc, "How your GPA has moved", cursorY);
    cursorY = drawTrendChart(
      doc,
      payload.trend,
      PDF_PAGE_MARGIN,
      cursorY,
      contentWidth
    );
  }

  if (sections.contribution && payload.contributions.length > 0) {
    const peak = getPeakContribution(payload.contributions);

    ensureSpace(
      payload.contributions.length * PDF_CONTRIBUTION_ROW_HEIGHT + 40
    );
    cursorY = drawHeading(doc, "What is moving your GPA", cursorY);
    cursorY = drawContributionChart(
      doc,
      payload.contributions,
      peak,
      PDF_PAGE_MARGIN,
      cursorY,
      contentWidth
    );
  }

  if (sections.courses) {
    ensureSpace(60);
    cursorY = drawHeading(doc, "Course grades", cursorY);

    for (const semester of payload.semesters) {
      ensureSpace(90);
      cursorY = drawSemesterTable(doc, autoTable, semester, cursorY);
    }
  }

  if (sections.projection && payload.projection) {
    ensureSpace(90);
    cursorY = drawHeading(doc, "Where you can still finish", cursorY);
    cursorY = drawProjection(doc, payload, cursorY);
  }

  if (sections.target) {
    ensureSpace(80);
    cursorY = drawHeading(doc, "What it takes to hit a target", cursorY);
    drawTarget(doc, payload, cursorY);
  }

  drawFooters(doc, payload.generatedAt);

  return doc;
}
