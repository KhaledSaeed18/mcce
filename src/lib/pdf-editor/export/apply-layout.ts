import { degrees, type PDFDocument } from "pdf-lib";
import type { EditorPage } from "../types";
import { resolveLayoutPages } from "./resolve-pages";

/**
 * Rebuilds the page tree to match the pages the editor holds: a page taken out
 * is gone from the copy, the rest come out in the order they were put in, and
 * each is turned as far as the editor has turned it.
 */
export async function applyLayout(
  pdf: PDFDocument,
  layout: EditorPage[]
): Promise<void> {
  const wanted = await resolveLayoutPages(pdf, layout);

  for (let index = pdf.getPageCount() - 1; index >= 0; index -= 1) {
    pdf.removePage(index);
  }
  for (const [position, { entry, page }] of wanted.entries()) {
    // Markup is drawn in the page's own space, so the turn rides on the page
    // rather than on every coordinate written into it.
    page.setRotation(degrees(page.getRotation().angle + entry.rotation));
    pdf.insertPage(position, page);
  }
}
