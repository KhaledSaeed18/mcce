import type { jsPDF } from "jspdf";
import {
  TUITION_PDF_BAR_ROW_HEIGHT,
  TUITION_PDF_CHART_CHROME_HEIGHT,
  TUITION_PDF_HEADER_HEIGHT,
  TUITION_PDF_MUTED_COLOR,
  TUITION_PDF_PAGE_MARGIN,
  TUITION_PDF_TABLE_CHROME_HEIGHT,
  TUITION_PDF_TABLE_ROW_HEIGHT,
  TUITION_PDF_TILE_HEIGHT,
} from "@/config/tuition-export";
import {
  drawCompositionChart,
  hasChartComparison,
} from "@/lib/tuition/export/pdf-chart";
import { buildChartSections } from "@/lib/tuition/export/pdf-chart-sections";
import {
  drawFooters,
  drawHeader,
  fillPageBackground,
  loadLogoDataUrl,
} from "@/lib/tuition/export/pdf-chrome";
import {
  buildPlanFacts,
  buildTotalTiles,
} from "@/lib/tuition/export/pdf-facts";
import {
  buildNotes,
  drawNotes,
  measureNotes,
} from "@/lib/tuition/export/pdf-notes";
import {
  drawFacts,
  drawHeading,
  drawTiles,
} from "@/lib/tuition/export/pdf-sections";
import { buildTables } from "@/lib/tuition/export/pdf-table-data";
import {
  drawTable,
  type JsPdfWithAutoTable,
} from "@/lib/tuition/export/pdf-tables";
import type { TuitionExportPayload } from "@/lib/tuition/types";

function drawSubtitle(
  doc: jsPDF,
  payload: TuitionExportPayload,
  cursorY: number
): number {
  const semesterCount = payload.semesters.length;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...TUITION_PDF_MUTED_COLOR);
  doc.text(
    `${payload.academicYear} · ${semesterCount} semester${semesterCount === 1 ? "" : "s"} · ${payload.annualProjection.credits} credits`,
    TUITION_PDF_PAGE_MARGIN,
    cursorY
  );

  return cursorY + 26;
}

export async function buildTuitionPdf(
  payload: TuitionExportPayload
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
  const contentWidth = pageWidth - TUITION_PDF_PAGE_MARGIN * 2;

  fillPageBackground(doc);
  drawHeader(doc, logoDataUrl);

  let cursorY = drawSubtitle(doc, payload, TUITION_PDF_HEADER_HEIGHT + 26);

  const ensureSpace = (height: number) => {
    if (cursorY + height > pageHeight - TUITION_PDF_PAGE_MARGIN) {
      doc.addPage();
      fillPageBackground(doc);
      cursorY = TUITION_PDF_PAGE_MARGIN;
    }
  };

  ensureSpace(TUITION_PDF_TILE_HEIGHT + 40);
  cursorY = drawHeading(doc, "What the year costs", cursorY);
  cursorY = drawTiles(doc, buildTotalTiles(payload), cursorY, contentWidth);

  cursorY = drawHeading(doc, "Your plan", cursorY);
  cursorY = drawFacts(doc, buildPlanFacts(payload), cursorY);

  for (const section of buildChartSections(payload)) {
    if (!hasChartComparison(section.rows)) {
      continue;
    }

    ensureSpace(
      payload.semesters.length * TUITION_PDF_BAR_ROW_HEIGHT +
        TUITION_PDF_CHART_CHROME_HEIGHT
    );
    cursorY = drawHeading(doc, section.title, cursorY);
    cursorY = drawCompositionChart(
      doc,
      {
        formatValue: section.formatValue,
        rows: section.rows,
        width: contentWidth,
      },
      cursorY
    );
  }

  for (const table of buildTables(payload)) {
    ensureSpace(
      payload.semesters.length * TUITION_PDF_TABLE_ROW_HEIGHT +
        TUITION_PDF_TABLE_CHROME_HEIGHT
    );
    cursorY = drawHeading(doc, table.title, cursorY);
    cursorY = drawTable(doc, autoTable, table, cursorY);
  }

  const notes = buildNotes(payload);

  ensureSpace(measureNotes(doc, notes, contentWidth) + 26);
  cursorY = drawHeading(doc, "Notes", cursorY);
  drawNotes(doc, notes, cursorY, contentWidth);

  drawFooters(doc, payload.generatedAt);

  return doc;
}
