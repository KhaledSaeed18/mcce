import type { PDFDocumentProxy } from "pdfjs-dist";
import { Fragment, useMemo, useRef } from "react";
import { PageDropLine } from "@/components/pdf-editor/page-drop-line";
import { PageThumbnail } from "@/components/pdf-editor/page-thumbnail";
import { usePageDrag } from "@/hooks/use-page-drag";
import type { EditorPage, PageDrag, PageSize } from "@/lib/pdf-editor/types";

/** A gap either side of the page being carried would put it back where it was. */
function isDropShown(drag: PageDrag | null, gap: number): boolean {
  if (!drag || drag.insertAt !== gap) {
    return false;
  }
  return gap !== drag.from && gap !== drag.from + 1;
}

interface PageEntry {
  page: EditorPage;
  position: number;
  size: PageSize;
}

interface PageThumbnailRailProps {
  activeIndex: number;
  doc: PDFDocumentProxy;
  layout: EditorPage[];
  onMove: (from: number, to: number) => void;
  onRemove: (id: string) => void;
  onRotate: (id: string) => void;
  onSelect: (index: number) => void;
  sizes: PageSize[];
}

export function PageThumbnailRail({
  activeIndex,
  doc,
  layout,
  onMove,
  onRemove,
  onRotate,
  onSelect,
  sizes,
}: PageThumbnailRailProps) {
  const railRef = useRef<HTMLElement>(null);
  const { drag, handlers } = usePageDrag({ onMove, rootRef: railRef });
  const pages = useMemo<PageEntry[]>(
    () =>
      layout.flatMap((page, position) => {
        const size = sizes[page.sourceIndex];
        return size ? [{ page, position, size }] : [];
      }),
    [layout, sizes]
  );

  return (
    <nav
      aria-label="Pages"
      className="flex w-40 shrink-0 flex-col gap-4 overflow-y-auto border-r-2 bg-card p-4"
      ref={railRef}
    >
      {pages.map(({ page, position, size }) => (
        <Fragment key={page.id}>
          {isDropShown(drag, position) ? <PageDropLine /> : null}
          <PageThumbnail
            canRemove={layout.length > 1}
            doc={doc}
            dragHandlers={handlers}
            isActive={position === activeIndex}
            isDragging={drag?.from === position}
            onRemove={onRemove}
            onRotate={onRotate}
            onSelect={onSelect}
            page={page}
            position={position}
            size={size}
          />
        </Fragment>
      ))}
      {isDropShown(drag, pages.length) ? <PageDropLine /> : null}
    </nav>
  );
}
