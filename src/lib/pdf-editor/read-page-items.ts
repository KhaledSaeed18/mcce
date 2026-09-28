import type { PDFDocumentProxy } from "pdfjs-dist";
import type { PageTextItem } from "./types";

/** The text items of the page at `index` in the file. Marked content items
 * carry no text and are left out. */
export async function readPageItems(
  doc: PDFDocumentProxy,
  index: number
): Promise<PageTextItem[]> {
  const page = await doc.getPage(index + 1);
  const content = await page.getTextContent();
  return content.items.filter(
    (item): item is PageTextItem & typeof item => "str" in item
  );
}
