import type { PDFDocumentProxy } from "pdfjs-dist";
import type { ReactNode, RefObject } from "react";
import { PageThumbnailRail } from "@/components/pdf-editor/page-thumbnail-rail";
import type {
  EditorPage,
  PageNavigation,
  PageSize,
} from "@/lib/pdf-editor/types";

interface EditorDocumentAreaProps {
  children: ReactNode;
  doc: PDFDocumentProxy | null;
  isRailOpen: boolean;
  layout: EditorPage[];
  navigation: PageNavigation;
  onCopyPage: (id: string) => void;
  onRemovePage: (id: string) => void;
  onReorderPage: (from: number, to: number) => void;
  onRotatePage: (id: string) => void;
  scrollRef: RefObject<HTMLDivElement | null>;
  sizes: PageSize[];
}

/** The rail and the scroller it moves, with the pages themselves passed in. */
export function EditorDocumentArea({
  children,
  doc,
  isRailOpen,
  layout,
  navigation,
  onCopyPage,
  onRemovePage,
  onReorderPage,
  onRotatePage,
  scrollRef,
  sizes,
}: EditorDocumentAreaProps) {
  return (
    <div className="flex min-h-0 flex-1">
      {isRailOpen && doc ? (
        <PageThumbnailRail
          activeIndex={navigation.activeIndex}
          doc={doc}
          layout={layout}
          onCopy={onCopyPage}
          onMove={onReorderPage}
          onRemove={onRemovePage}
          onRotate={onRotatePage}
          onSelect={navigation.goToPage}
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
