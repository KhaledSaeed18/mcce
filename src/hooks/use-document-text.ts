import type { PDFDocumentProxy } from "pdfjs-dist";
import { useEffect, useRef, useState } from "react";
import { SEARCH_TEXT_BATCH_PAGES } from "@/config/pdf-editor";
import { buildPageText } from "@/lib/pdf-editor/page-text";
import type { PageText, PageTextItem } from "@/lib/pdf-editor/types";

interface DocumentText {
  doc: PDFDocumentProxy | null;
  isComplete: boolean;
  /** By the page's place in the file, which is how pdf.js numbers them. */
  pages: (PageText | undefined)[];
}

const EMPTY: DocumentText = { doc: null, isComplete: false, pages: [] };

/** Reads every page's text once search is first opened, and keeps it for as
 * long as the same file is open. Pages arrive a batch at a time. */
export function useDocumentText(
  doc: PDFDocumentProxy | null,
  isEnabled: boolean
) {
  const [state, setState] = useState<DocumentText>(EMPTY);
  // Held in a ref rather than read from state: the read starts by setting
  // state, and depending on that would tear the effect down mid-read.
  const readDocRef = useRef<PDFDocumentProxy | null>(null);

  useEffect(() => {
    if (!(doc && isEnabled) || readDocRef.current === doc) {
      return;
    }
    readDocRef.current = doc;
    let isCancelled = false;
    let isDone = false;
    const pages: (PageText | undefined)[] = [];
    setState({ doc, isComplete: false, pages: [] });

    const readPage = async (index: number) => {
      const page = await doc.getPage(index + 1);
      const content = await page.getTextContent();
      const items = content.items.filter(
        (item): item is PageTextItem & typeof item => "str" in item
      );
      pages[index] = buildPageText(items);
    };

    const read = async () => {
      for (let from = 0; from < doc.numPages; from += SEARCH_TEXT_BATCH_PAGES) {
        const to = Math.min(from + SEARCH_TEXT_BATCH_PAGES, doc.numPages);
        const batch = Array.from({ length: to - from }, (_, i) => from + i);
        // biome-ignore lint/performance/noAwaitInLoops: one batch at a time keeps a long file from queueing every page on the pdf.js worker at once
        await Promise.all(batch.map(readPage));
        if (isCancelled) {
          return;
        }
        setState({ doc, isComplete: to === doc.numPages, pages: [...pages] });
      }
      isDone = true;
    };
    read().catch(() => {
      // A file closed mid-read rejects; search just finds what was read.
    });

    return () => {
      isCancelled = true;
      // A read cut short starts over the next time search opens on this file.
      if (!isDone) {
        readDocRef.current = null;
      }
    };
  }, [doc, isEnabled]);

  return state.doc === doc ? state : EMPTY;
}
