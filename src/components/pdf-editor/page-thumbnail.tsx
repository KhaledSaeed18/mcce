import { Trash2Icon } from "lucide-react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { THUMBNAIL_WIDTH } from "@/config/pdf-editor";
import { useInViewport } from "@/hooks/use-in-viewport";
import { usePdfPageRender } from "@/hooks/use-pdf-page-render";
import { useScrollIntoView } from "@/hooks/use-scroll-into-view";
import type { EditorPage, PageSize } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

interface PageThumbnailProps {
  /** False for the last page left, which a document cannot do without. */
  canRemove: boolean;
  doc: PDFDocumentProxy;
  isActive: boolean;
  onRemove: (id: string) => void;
  onSelect: (position: number) => void;
  page: EditorPage;
  /** Where the page sits now, which is what it is labelled and jumped to by. */
  position: number;
  size: PageSize;
}

export function PageThumbnail({
  canRemove,
  doc,
  isActive,
  onRemove,
  onSelect,
  page,
  position,
  size,
}: PageThumbnailProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isVisible = useInViewport(wrapperRef);
  const zoom = THUMBNAIL_WIDTH / size.width;
  const { canvasRef } = usePdfPageRender(
    doc,
    page.sourceIndex,
    zoom,
    isVisible
  );
  useScrollIntoView(wrapperRef, isActive);

  const handleSelect = useCallback(
    () => onSelect(position),
    [onSelect, position]
  );

  const handleRemove = useCallback(
    () => onRemove(page.id),
    [onRemove, page.id]
  );

  return (
    <div
      className="group relative flex flex-col items-center gap-1"
      ref={wrapperRef}
    >
      <button
        aria-current={isActive ? "page" : undefined}
        aria-label={`Go to page ${position + 1}`}
        className="cursor-pointer"
        onClick={handleSelect}
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
      </button>
      {canRemove ? (
        <Button
          aria-label={`Remove page ${position + 1}`}
          className={cn(
            "absolute -top-2 -right-2 size-7 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100",
            isActive && "opacity-100"
          )}
          onClick={handleRemove}
          size="icon"
          variant="outline"
        >
          <Trash2Icon />
        </Button>
      ) : null}
      <span
        className={cn(
          "font-head text-xs tabular-nums",
          isActive ? "text-foreground" : "text-muted-foreground"
        )}
      >
        {position + 1}
      </span>
    </div>
  );
}
