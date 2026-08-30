import type { PDFDocumentProxy } from "pdfjs-dist";
import type { ReactNode, RefObject } from "react";
import { PageThumbnailRail } from "@/components/pdf-editor/page-thumbnail-rail";
import type { PageNavigation, PageSize } from "@/lib/pdf-editor/types";

interface EditorDocumentAreaProps {
  children: ReactNode;
  doc: PDFDocumentProxy | null;
  isRailOpen: boolean;
  pages: PageNavigation;
  scrollRef: RefObject<HTMLDivElement | null>;
  sizes: PageSize[];
}

/** The rail and the scroller it moves, with the pages themselves passed in. */
export function EditorDocumentArea({
  children,
  doc,
  isRailOpen,
  pages,
  scrollRef,
  sizes,
}: EditorDocumentAreaProps) {
  return (
    <div className="flex min-h-0 flex-1">
      {isRailOpen && doc ? (
        <PageThumbnailRail
          activeIndex={pages.activeIndex}
          doc={doc}
          onSelect={pages.goToPage}
          sizes={sizes}
        />
      ) : null}
      <div
        className="flex min-h-0 flex-1 flex-col overflow-auto bg-muted"
        ref={scrollRef}
      >
        {children}
      </div>
    </div>
  );
}
