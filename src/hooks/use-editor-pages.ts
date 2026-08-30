import type { PDFDocumentProxy } from "pdfjs-dist";
import type { RefObject } from "react";
import { useAnnotationFont } from "@/hooks/use-annotation-font";
import { useVisiblePage } from "@/hooks/use-visible-page";
import type { PageNavigation } from "@/lib/pdf-editor/types";

interface EditorPages {
  /** False until both the file and the font it is measured with are ready. */
  isDocumentShown: boolean;
  pages: PageNavigation;
}

/** What of the document is on screen, and where in it the reader is. */
export function useEditorPages(
  scrollRef: RefObject<HTMLElement | null>,
  doc: PDFDocumentProxy | null
): EditorPages {
  const isFontReady = useAnnotationFont();
  const isDocumentShown = Boolean(doc) && isFontReady;
  const pageCount = doc && isDocumentShown ? doc.numPages : 0;
  const { activeIndex, goToPage } = useVisiblePage(scrollRef, pageCount);

  return { isDocumentShown, pages: { activeIndex, goToPage, pageCount } };
}
