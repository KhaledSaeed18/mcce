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
  buildAidFacts,
  buildPlanFacts,
  buildRateSummary,
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
  cursorY: number,
  contentWidth: number
): number {
  const semesterCount = payload.semesters.length;
  const generated = new Date(payload.generatedAt).toLocaleDateString();

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...TUITION_PDF_MUTED_COLOR);
  doc.text(
    `Generated ${generated} · ${semesterCount} semester${semesterCount === 1 ? "" : "s"} · ${payload.annualProjection.credits} credits`,
    TUITION_PDF_PAGE_MARGIN,
    cursorY
  );

  doc.setFontSize(8);
  const rateLines = doc.splitTextToSize(
    buildRateSummary(payload),
    contentWidth
  );
  doc.text(rateLines, TUITION_PDF_PAGE_MARGIN, cursorY + 14);

  return cursorY + 14 + rateLines.length * 11;
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

  let cursorY = drawSubtitle(
    doc,
    payload,
    TUITION_PDF_HEADER_HEIGHT + 26,
    contentWidth
  );

  const ensureSpace = (height: number) => {
    if (cursorY + height > pageHeight - TUITION_PDF_PAGE_MARGIN) {
      doc.addPage();
      fillPageBackground(doc);
      cursorY = TUITION_PDF_PAGE_MARGIN;
    }
  };

  ensureSpace(TUITION_PDF_TILE_HEIGHT + 40);
  cursorY = drawHeading(doc, "What the year costs", cursorY, contentWidth);
  cursorY = drawTiles(doc, buildTotalTiles(payload), cursorY, contentWidth);

  cursorY = drawHeading(doc, "Your plan", cursorY, contentWidth);
  cursorY = drawFacts(doc, buildPlanFacts(payload), cursorY);

  for (const section of buildChartSections(payload)) {
    if (!hasChartComparison(section.rows)) {
      continue;
    }

    ensureSpace(
      payload.semesters.length * TUITION_PDF_BAR_ROW_HEIGHT +
        TUITION_PDF_CHART_CHROME_HEIGHT
    );
    cursorY = drawHeading(doc, section.title, cursorY, contentWidth);
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
    cursorY = drawHeading(doc, table.title, cursorY, contentWidth);
    cursorY = drawTable(doc, autoTable, table, cursorY);
  }

  const aidFacts = buildAidFacts(payload);

  if (aidFacts.length > 0) {
    ensureSpace(aidFacts.length * TUITION_PDF_TABLE_ROW_HEIGHT + 60);
    cursorY = drawHeading(
      doc,
      "How financial aid is billed",
      cursorY,
      contentWidth
    );
    cursorY = drawFacts(doc, aidFacts, cursorY);
  }

  const notes = buildNotes(payload);

  ensureSpace(measureNotes(doc, notes, contentWidth) + 46);
  cursorY = drawHeading(doc, "Notes", cursorY, contentWidth);
  drawNotes(doc, notes, cursorY, contentWidth);

  drawFooters(doc);

  return doc;
}
