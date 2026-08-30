import type { PDFDocumentProxy } from "pdfjs-dist";
import { useEffect, useState } from "react";
import type { PageSize } from "@/lib/pdf-editor/types";

/** Every page's own size, so a rail of them can be laid out before any is drawn. */
export function usePdfPageSizes(doc: PDFDocumentProxy | null): PageSize[] {
  const [sizes, setSizes] = useState<PageSize[]>([]);

  useEffect(() => {
    if (!doc) {
      setSizes([]);
      return;
    }

    let cancelled = false;
    const pages = Array.from({ length: doc.numPages }, async (_, index) => {
      const page = await doc.getPage(index + 1);
      const { height, width } = page.getViewport({ scale: 1 });
      return { height, width };
    });

    Promise.all(pages)
      .then((next) => {
        if (!cancelled) {
          setSizes(next);
        }
      })
      .catch(() => {
        // A document that cannot be measured simply shows no thumbnails.
      });

    return () => {
      cancelled = true;
    };
  }, [doc]);

  return sizes;
}
