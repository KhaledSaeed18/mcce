import type { PDFDocument, PDFPage } from "pdf-lib";
import { SHEET_GRID_COLOR, SHEET_GRID_LINE_WIDTH } from "@/config/pdf-editor";
import { getRenderedSize } from "../rotation";
import { getGridLines } from "../sheet-grid";
import type { PageSheet } from "../types";
import { hexToRgb } from "./hex-to-rgb";

/**
 * A new page for a sheet the reader put in, as big as the page it follows looks.
 * It is written upright, so the page it follows having its own turn does not
 * leave the sheet lying on its side.
 */
export function addSheetPage(
  pdf: PDFDocument,
  follows: PDFPage,
  sheet: PageSheet
): PDFPage {
  const { height, width } = getRenderedSize(
    { height: follows.getHeight(), width: follows.getWidth() },
    follows.getRotation().angle
  );
  const page = pdf.addPage([width, height]);
  if (sheet === "blank") {
    return page;
  }
  const color = hexToRgb(SHEET_GRID_COLOR);
  for (const x of getGridLines(width)) {
    page.drawLine({
      color,
      end: { x, y: height },
      start: { x, y: 0 },
      thickness: SHEET_GRID_LINE_WIDTH,
    });
  }
  for (const y of getGridLines(height)) {
    page.drawLine({
      color,
      end: { x: width, y },
      start: { x: 0, y },
      thickness: SHEET_GRID_LINE_WIDTH,
    });
  }
  return page;
}
