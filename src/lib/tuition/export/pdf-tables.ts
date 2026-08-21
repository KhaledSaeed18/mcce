import type { jsPDF } from "jspdf";
import {
  TUITION_PDF_BRAND_COLOR,
  TUITION_PDF_CARD_COLOR,
  TUITION_PDF_PAGE_MARGIN,
  TUITION_PDF_PAPER_COLOR,
  TUITION_PDF_TEXT_COLOR,
} from "@/config/tuition-export";

type AutoTable = typeof import("jspdf-autotable").default;

export interface JsPdfWithAutoTable extends jsPDF {
  lastAutoTable?: { finalY: number };
}

export interface TuitionTable {
  body: string[][];
  foot: string[][];
  head: string[];
  title: string;
}

export function drawTable(
  doc: JsPdfWithAutoTable,
  autoTable: AutoTable,
  table: TuitionTable,
  cursorY: number
): number {
  autoTable(doc, {
    body: table.body,
    columnStyles: { 0: { fontStyle: "bold" } },
    // The label column reads left to right; every number column is right aligned.
    didParseCell: (data) => {
      if (data.column.index === 0) {
        data.cell.styles.halign = "left";
      }
    },
    foot: table.foot,
    footStyles: {
      fillColor: [...TUITION_PDF_CARD_COLOR],
      fontStyle: "bold",
      textColor: [...TUITION_PDF_TEXT_COLOR],
    },
    head: [table.head],
    headStyles: {
      fillColor: [...TUITION_PDF_BRAND_COLOR],
      fontStyle: "bold",
      textColor: [...TUITION_PDF_TEXT_COLOR],
    },
    margin: { left: TUITION_PDF_PAGE_MARGIN, right: TUITION_PDF_PAGE_MARGIN },
    startY: cursorY,
    styles: {
      fillColor: [...TUITION_PDF_PAPER_COLOR],
      fontSize: 9,
      halign: "right",
      textColor: [...TUITION_PDF_TEXT_COLOR],
    },
    theme: "grid",
  });

  // lastAutoTable is assigned imperatively by the plugin at runtime.
  // biome-ignore lint/suspicious/noUnnecessaryConditions: see comment above
  return (doc.lastAutoTable?.finalY ?? cursorY) + 24;
}
