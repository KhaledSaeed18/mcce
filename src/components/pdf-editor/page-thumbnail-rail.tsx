import type { PDFDocumentProxy } from "pdfjs-dist";
import { useMemo } from "react";
import { PageThumbnail } from "@/components/pdf-editor/page-thumbnail";
import { usePdfPageSizes } from "@/hooks/use-pdf-page-sizes";
import type { PageSize } from "@/lib/pdf-editor/types";

interface PageEntry {
  pageIndex: number;
  size: PageSize;
}

interface PageThumbnailRailProps {
  activeIndex: number;
  doc: PDFDocumentProxy;
  onSelect: (index: number) => void;
}

export function PageThumbnailRail({
  activeIndex,
  doc,
  onSelect,
}: PageThumbnailRailProps) {
  const sizes = usePdfPageSizes(doc);
  const pages = useMemo<PageEntry[]>(
    () => sizes.map((size, pageIndex) => ({ pageIndex, size })),
    [sizes]
  );

  return (
    <nav
      aria-label="Pages"
      className="flex w-40 shrink-0 flex-col gap-4 overflow-y-auto border-r-2 bg-card p-4"
    >
      {pages.map(({ pageIndex, size }) => (
        <PageThumbnail
          doc={doc}
          isActive={pageIndex === activeIndex}
          key={pageIndex}
          onSelect={onSelect}
          pageIndex={pageIndex}
          size={size}
        />
      ))}
    </nav>
  );
}
