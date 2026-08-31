import type { PDFDocumentProxy } from "pdfjs-dist";
import type { RefObject } from "react";
import { usePdfPageSizes } from "@/hooks/use-pdf-page-sizes";
import { useVisiblePage } from "@/hooks/use-visible-page";
import { getRenderedSize } from "@/lib/pdf-editor/rotation";
import type {
  EditorPage,
  PageNavigation,
  PageSize,
} from "@/lib/pdf-editor/types";

interface EditorPages {
  /** The page being read, which a fitted zoom is measured against. */
  activeSize: PageSize | null;
  /** False until the file itself is ready to be shown. */
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
  const isDocumentShown = Boolean(doc);
  const pageCount = isDocumentShown ? layout.length : 0;
  const { activeIndex, goToPage } = useVisiblePage(scrollRef, pageCount);
  const sizes = usePdfPageSizes(doc);
  const activePage = layout[activeIndex];
  const activeSource = activePage ? sizes[activePage.sourceIndex] : undefined;

  return {
    // A turned page is fitted by the size it is shown at, not the one it was written at.
    activeSize:
      activePage && activeSource
        ? getRenderedSize(activeSource, activePage.rotation)
        : null,
    isDocumentShown,
    navigation: { activeIndex, goToPage, pageCount },
    sizes,
  };
}
