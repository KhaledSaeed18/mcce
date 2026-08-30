import type { PDFDocumentProxy } from "pdfjs-dist";
import { useCallback, useRef } from "react";
import { THUMBNAIL_WIDTH } from "@/config/pdf-editor";
import { useInViewport } from "@/hooks/use-in-viewport";
import { usePdfPageRender } from "@/hooks/use-pdf-page-render";
import { useScrollIntoView } from "@/hooks/use-scroll-into-view";
import type { PageSize } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

interface PageThumbnailProps {
  doc: PDFDocumentProxy;
  isActive: boolean;
  onSelect: (index: number) => void;
  pageIndex: number;
  size: PageSize;
}

export function PageThumbnail({
  doc,
  isActive,
  onSelect,
  pageIndex,
  size,
}: PageThumbnailProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isVisible = useInViewport(buttonRef);
  const zoom = THUMBNAIL_WIDTH / size.width;
  const { canvasRef } = usePdfPageRender(doc, pageIndex, zoom, isVisible);
  useScrollIntoView(buttonRef, isActive);

  const handleClick = useCallback(
    () => onSelect(pageIndex),
    [onSelect, pageIndex]
  );

  return (
    <button
      aria-current={isActive ? "page" : undefined}
      className="flex cursor-pointer flex-col items-center gap-1"
      onClick={handleClick}
      ref={buttonRef}
      type="button"
    >
      <canvas
        className={cn(
          "block border-2 bg-card transition-shadow",
          isActive ? "border-primary shadow-md" : "shadow-xs"
        )}
        ref={canvasRef}
        style={{ height: size.height * zoom, width: THUMBNAIL_WIDTH }}
      />
      <span
        className={cn(
          "font-head text-xs tabular-nums",
          isActive ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {pageIndex + 1}
      </span>
    </button>
  );
}
