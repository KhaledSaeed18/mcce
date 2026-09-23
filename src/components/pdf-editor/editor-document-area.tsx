import type { PDFDocumentProxy } from "pdfjs-dist";
import type { ReactNode, RefObject } from "react";
import { useEffect } from "react";
import { EditorSidePanel } from "@/components/pdf-editor/editor-side-panel";
import { PageThumbnailRail } from "@/components/pdf-editor/page-thumbnail-rail";
import { PageThumbnailRailPlaceholder } from "@/components/pdf-editor/page-thumbnail-rail-placeholder";
import { setScrollContainer } from "@/hooks/use-hand-tool";
import type {
  EditorPage,
  PageNavigation,
  PageSize,
} from "@/lib/pdf-editor/types";

interface EditorDocumentAreaProps {
  children: ReactNode;
  doc: PDFDocumentProxy | null;
  /** True while the next file is on its way, which keeps an open rail open. */
  isLoading: boolean;
  isPanelAnimated: boolean;
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
  isLoading,
  isPanelAnimated,
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
  useEffect(() => {
    setScrollContainer(scrollRef.current);
    return () => setScrollContainer(null);
  }, [scrollRef]);

  return (
    <div className="flex min-h-0 flex-1">
      <EditorSidePanel
        isAnimated={isPanelAnimated}
        isOpen={isRailOpen && (doc !== null || isLoading)}
      >
        {doc ? (
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
        ) : (
          <PageThumbnailRailPlaceholder />
        )}
      </EditorSidePanel>
      <div
        className="flex min-h-0 flex-1 flex-col overflow-auto bg-muted"
        ref={scrollRef}
      >
        {children}
      </div>
    </div>
  );
}
