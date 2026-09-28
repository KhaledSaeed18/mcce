import { SEARCH_TEXT_BATCH_PAGES } from "@/config/pdf-editor";
import { borrowDocument } from "../borrow-document";
import { joinPageItems } from "../page-text";
import { readPageItems } from "../read-page-items";
import type { EditorFileRef } from "../types";

/** Every page's text as printed, by the page's place in the file. The file
 * is let go as soon as it has been read. */
export async function readDocumentText(file: EditorFileRef): Promise<string[]> {
  const lease = borrowDocument(file);
  try {
    const { doc } = await lease.opening;
    const pages: string[] = [];
    for (let from = 0; from < doc.numPages; from += SEARCH_TEXT_BATCH_PAGES) {
      const to = Math.min(from + SEARCH_TEXT_BATCH_PAGES, doc.numPages);
      const batch = Array.from({ length: to - from }, (_, i) => from + i);
      // biome-ignore lint/performance/noAwaitInLoops: one batch at a time keeps a long file from queueing every page on the pdf.js worker at once
      const items = await Promise.all(
        batch.map((index) => readPageItems(doc, index))
      );
      pages.push(...items.map((pageItems) => joinPageItems(pageItems).text));
    }
    return pages;
  } finally {
    lease.release();
  }
}
