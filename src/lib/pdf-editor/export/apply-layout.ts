import { degrees, type PDFDocument } from "pdf-lib";
import type { EditorPage } from "../types";

/**
 * Rebuilds the page tree to match the pages the editor holds: a page taken out
 * is gone from the copy, and the rest come out in the order they were put in.
 * Pages are removed and re-inserted rather than copied, so everything else the
 * file carries stays with them, and each one is turned as far as the editor has
 * turned it.
 */
export function applyLayout(pdf: PDFDocument, layout: EditorPage[]): void {
  const original = pdf.getPages();
  const wanted = layout.flatMap((entry) => {
    const page = original[entry.sourceIndex];
    return page ? [{ entry, page }] : [];
  });

  for (let index = original.length - 1; index >= 0; index -= 1) {
    pdf.removePage(index);
  }
  for (const [position, { entry, page }] of wanted.entries()) {
    // Markup is drawn in the page's own space, so the turn rides on the page
    // rather than on every coordinate written into it.
    page.setRotation(degrees(page.getRotation().angle + entry.rotation));
    pdf.insertPage(position, page);
  }
}
