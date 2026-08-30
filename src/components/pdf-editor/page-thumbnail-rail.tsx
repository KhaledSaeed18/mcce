import type { PDFDocumentProxy } from "pdfjs-dist";
import { useMemo } from "react";
import { PageThumbnail } from "@/components/pdf-editor/page-thumbnail";
import type { EditorPage, PageSize } from "@/lib/pdf-editor/types";

interface PageEntry {
  page: EditorPage;
  position: number;
  size: PageSize;
}

interface PageThumbnailRailProps {
  activeIndex: number;
  doc: PDFDocumentProxy;
  layout: EditorPage[];
  onRemove: (id: string) => void;
  onSelect: (index: number) => void;
  sizes: PageSize[];
}

export function PageThumbnailRail({
  activeIndex,
  doc,
  layout,
  onRemove,
  onSelect,
  sizes,
}: PageThumbnailRailProps) {
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
    >
      {pages.map(({ page, position, size }) => (
        <PageThumbnail
          canRemove={layout.length > 1}
          doc={doc}
          isActive={position === activeIndex}
          key={page.id}
          onRemove={onRemove}
          onSelect={onSelect}
          page={page}
          position={position}
          size={size}
        />
      ))}
    </nav>
  );
}
