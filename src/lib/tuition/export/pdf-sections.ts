import type { jsPDF } from "jspdf";
import {
  TUITION_PDF_CARD_COLOR,
  TUITION_PDF_MUTED_COLOR,
  TUITION_PDF_PAGE_MARGIN,
  TUITION_PDF_TEXT_COLOR,
  TUITION_PDF_TILE_HEIGHT,
} from "@/config/tuition-export";

export interface TuitionPdfTile {
  label: string;
  value: string;
}

const FACT_VALUE_X = TUITION_PDF_PAGE_MARGIN + 170;
const FACT_ROW_HEIGHT = 15;
const TILE_GAP = 12;

export function drawHeading(doc: jsPDF, text: string, cursorY: number): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...TUITION_PDF_TEXT_COLOR);
  doc.text(text, TUITION_PDF_PAGE_MARGIN, cursorY);

  return cursorY + 16;
}

export function drawFacts(
  doc: jsPDF,
  facts: [string, string][],
  cursorY: number
): number {
  let y = cursorY;

  for (const [label, value] of facts) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...TUITION_PDF_MUTED_COLOR);
    doc.text(label, TUITION_PDF_PAGE_MARGIN, y);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...TUITION_PDF_TEXT_COLOR);
    doc.text(value, FACT_VALUE_X, y);
    y += FACT_ROW_HEIGHT;
  }

  return y + 10;
}

/** The headline numbers, sized so the total is readable before anything else. */
export function drawTiles(
  doc: jsPDF,
  tiles: TuitionPdfTile[],
  cursorY: number,
  contentWidth: number
): number {
  const tileWidth =
    (contentWidth - TILE_GAP * (tiles.length - 1)) / tiles.length;

  for (const [index, tile] of tiles.entries()) {
    const left = TUITION_PDF_PAGE_MARGIN + index * (tileWidth + TILE_GAP);

    doc.setFillColor(...TUITION_PDF_CARD_COLOR);
    doc.roundedRect(
      left,
      cursorY,
      tileWidth,
      TUITION_PDF_TILE_HEIGHT,
      4,
      4,
      "F"
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...TUITION_PDF_MUTED_COLOR);
    doc.text(tile.label, left + 10, cursorY + 18);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.setTextColor(...TUITION_PDF_TEXT_COLOR);
    doc.text(tile.value, left + 10, cursorY + 40);
  }

  return cursorY + TUITION_PDF_TILE_HEIGHT + 22;
}
