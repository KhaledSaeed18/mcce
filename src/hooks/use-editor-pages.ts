import type { PDFDocumentProxy } from "pdfjs-dist";
import type { RefObject } from "react";
import { useAnnotationFont } from "@/hooks/use-annotation-font";
import { usePdfPageSizes } from "@/hooks/use-pdf-page-sizes";
import { useVisiblePage } from "@/hooks/use-visible-page";
import type {
  EditorPage,
  PageNavigation,
  PageSize,
} from "@/lib/pdf-editor/types";

interface EditorPages {
  /** The page being read, which a fitted zoom is measured against. */
  activeSize: PageSize | null;
  /** False until both the file and the font it is measured with are ready. */
  isDocumentShown: boolean;
  navigation: PageNavigation;
  sizes: PageSize[];
}

/** What of the document is on screen, and where in it the reader is. */
export function useEditorPages(
  scrollRef: RefObject<HTMLElement | null>,
  doc: PDFDocumentProxy | null,
  layout: EditorPage[]
): EditorPages {
  const isFontReady = useAnnotationFont();
  const isDocumentShown = Boolean(doc) && isFontReady;
  const pageCount = isDocumentShown ? layout.length : 0;
  const { activeIndex, goToPage } = useVisiblePage(scrollRef, pageCount);
  const sizes = usePdfPageSizes(doc);
  const activePage = layout[activeIndex];

  return {
    activeSize: activePage ? (sizes[activePage.sourceIndex] ?? null) : null,
    isDocumentShown,
    navigation: { activeIndex, goToPage, pageCount },
    sizes,
  };
}
