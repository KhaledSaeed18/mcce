import type { PDFDocumentProxy } from "pdfjs-dist";
import { useEffect, useState } from "react";
import { flattenOutline } from "@/lib/pdf-editor/outline";
import { resolveDestination } from "@/lib/pdf-editor/resolve-destination";
import type { OutlineEntry } from "@/lib/pdf-editor/types";

interface ReadOutline {
  doc: PDFDocumentProxy | null;
  entries: OutlineEntry[];
}

const NO_OUTLINE: ReadOutline = { doc: null, entries: [] };

/** The file's own table of contents, read when the panel showing it opens. */
export function usePdfOutline(doc: PDFDocumentProxy | null) {
  const [outline, setOutline] = useState<ReadOutline>(NO_OUTLINE);

  useEffect(() => {
    if (!doc) {
      return;
    }
    let isCancelled = false;
    const finish = (entries: OutlineEntry[]) => {
      if (!isCancelled) {
        setOutline({ doc, entries });
      }
    };

    doc
      .getOutline()
      .then((nodes) =>
        flattenOutline(nodes ?? [], (dest) => resolveDestination(doc, dest))
      )
      .then(finish)
      .catch(() => finish([]));

    return () => {
      isCancelled = true;
    };
  }, [doc]);

  const isRead = outline.doc === doc;
  return {
    entries: isRead ? outline.entries : NO_OUTLINE.entries,
    isLoading: doc !== null && !isRead,
  };
}
