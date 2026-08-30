import type { PDFDocumentProxy } from "pdfjs-dist";
import { type RefObject, useMemo } from "react";
import { useAnnotationFont } from "@/hooks/use-annotation-font";
import { usePdfPageSizes } from "@/hooks/use-pdf-page-sizes";
import { useVisiblePage } from "@/hooks/use-visible-page";
import { buildPages } from "@/lib/pdf-editor/pages";
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
  /** The pages as the editor holds them, which markup points at by identity. */
  layout: EditorPage[];
  navigation: PageNavigation;
  sizes: PageSize[];
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
  const sizes = usePdfPageSizes(doc);
  const layout = useMemo(() => buildPages(pageCount), [pageCount]);

  return {
    activeSize: sizes[activeIndex] ?? null,
    isDocumentShown,
    layout,
    navigation: { activeIndex, goToPage, pageCount },
    sizes,
  };
}
