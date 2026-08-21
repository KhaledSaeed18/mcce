import type { jsPDF } from "jspdf";
import {
  TUITION_OFFICIAL_PAGE_URL,
  TUITION_PRICE_CHANGE_NOTE,
  TUITION_RATE_NOTE,
  TUITION_WARNING_NOTE,
  TUITION_YEARLY_CHARGE_NOTE,
} from "@/config/tuition";
import {
  TUITION_PDF_MUTED_COLOR,
  TUITION_PDF_PAGE_MARGIN,
} from "@/config/tuition-export";
import type { TuitionExportPayload } from "@/lib/tuition/types";

const LINE_HEIGHT = 12;

export function buildNotes(payload: TuitionExportPayload): string[] {
  return [
    TUITION_YEARLY_CHARGE_NOTE,
    ...(payload.plan.showAllInUsd ? [TUITION_RATE_NOTE] : []),
    TUITION_PRICE_CHANGE_NOTE,
    TUITION_WARNING_NOTE,
    `Official tuition page: ${TUITION_OFFICIAL_PAGE_URL}`,
  ];
}

export function measureNotes(
  doc: jsPDF,
  notes: string[],
  contentWidth: number
): number {
  return notes.reduce(
    (height, note) =>
      height + doc.splitTextToSize(note, contentWidth).length * LINE_HEIGHT + 2,
    0
  );
}

export function drawNotes(
  doc: jsPDF,
  notes: string[],
  cursorY: number,
  contentWidth: number
): number {
  let y = cursorY;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...TUITION_PDF_MUTED_COLOR);

  for (const note of notes) {
    const lines = doc.splitTextToSize(`· ${note}`, contentWidth);
    doc.text(lines, TUITION_PDF_PAGE_MARGIN, y);
    y += lines.length * LINE_HEIGHT + 2;
  }

  return y;
}
