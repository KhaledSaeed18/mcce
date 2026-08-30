import type { PDFDocument } from "pdf-lib";
import type { EditorPage } from "../types";

/**
 * Rebuilds the page tree to match the pages the editor holds: a page taken out
 * is gone from the copy, and the rest come out in the order they were put in.
 * Pages are removed and re-inserted rather than copied, so everything else the
 * file carries stays with them.
 */
export function applyLayout(pdf: PDFDocument, layout: EditorPage[]): void {
  const original = pdf.getPages();
  const wanted = layout.flatMap((page) => original[page.sourceIndex] ?? []);

  for (let index = original.length - 1; index >= 0; index -= 1) {
    pdf.removePage(index);
  }
  for (const [position, page] of wanted.entries()) {
    pdf.insertPage(position, page);
  }
}
