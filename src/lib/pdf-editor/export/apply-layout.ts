import { degrees, type PDFDocument, type PDFPage } from "pdf-lib";
import type { EditorPage } from "../types";
import { resolveLayoutPages } from "./resolve-pages";

export interface PlacedPage {
  /** The turn the page carried on its own, before the editor's was added to it. */
  baseRotation: number;
  entry: EditorPage;
  page: PDFPage;
}

/**
 * Rebuilds the page tree to match the pages the editor holds: a page taken out
 * is gone from the copy, the rest come out in the order they were put in, and
 * each is turned as far as the editor has turned it. Reports where every page
 * ended up, and how it was turned to begin with, for the markup to be drawn on.
 */
export async function applyLayout(
  pdf: PDFDocument,
  layout: EditorPage[]
): Promise<PlacedPage[]> {
  const wanted = await resolveLayoutPages(pdf, layout);
  const placed: PlacedPage[] = [];

  for (let index = pdf.getPageCount() - 1; index >= 0; index -= 1) {
    pdf.removePage(index);
  }
  for (const [position, { entry, page }] of wanted.entries()) {
    // Markup is drawn in the page's own space, so the turn rides on the page
    // rather than on every coordinate written into it.
    const baseRotation = page.getRotation().angle;
    page.setRotation(degrees(baseRotation + entry.rotation));
    pdf.insertPage(position, page);
    placed.push({ baseRotation, entry, page });
  }

  return placed;
}
