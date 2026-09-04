import { CopyIcon, RotateCwIcon, Trash2Icon } from "lucide-react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { type ComponentProps, useCallback, useRef } from "react";
import { PageThumbnailAction } from "@/components/pdf-editor/page-thumbnail-action";
import { RAIL_POSITION_ATTRIBUTE, THUMBNAIL_WIDTH } from "@/config/pdf-editor";
import { useInViewport } from "@/hooks/use-in-viewport";
import { usePdfPageRender } from "@/hooks/use-pdf-page-render";
import { useScrollIntoView } from "@/hooks/use-scroll-into-view";
import { getRenderedSize } from "@/lib/pdf-editor/rotation";
import type { EditorPage, PageSize } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

interface PageThumbnailProps {
  /** False for the last page left, which a document cannot do without. */
  canRemove: boolean;
  doc: PDFDocumentProxy;
  /** Pointer and keyboard handlers that carry this page to another place. */
  dragHandlers: ComponentProps<"button">;
  isActive: boolean;
  isDragging: boolean;
  onCopy: (id: string) => void;
  onRemove: (id: string) => void;
  onRotate: (id: string) => void;
  onSelect: (position: number) => void;
  page: EditorPage;
  /** Where the page sits now, which is what it is labelled and jumped to by. */
  position: number;
  size: PageSize;
}

export function PageThumbnail({
  canRemove,
  doc,
  dragHandlers,
  isActive,
  isDragging,
  onCopy,
  onRemove,
  onRotate,
  onSelect,
  page,
  position,
  size,
}: PageThumbnailProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isVisible = useInViewport(wrapperRef);
  const rendered = getRenderedSize(size, page.rotation);
  const zoom = THUMBNAIL_WIDTH / rendered.width;
  const { canvasRef } = usePdfPageRender(
    doc,
    page.sourceIndex,
    zoom,
    isVisible,
    page.rotation
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

  const handleRotate = useCallback(
    () => onRotate(page.id),
    [onRotate, page.id]
  );

  const handleCopy = useCallback(() => onCopy(page.id), [onCopy, page.id]);

  return (
    <div
      {...{ [RAIL_POSITION_ATTRIBUTE]: position }}
      className={cn(
        "group relative flex shrink-0 flex-col items-center gap-1",
        isDragging && "opacity-40"
      )}
      ref={wrapperRef}
    >
      <button
        {...dragHandlers}
        aria-current={isActive ? "page" : undefined}
        aria-label={`Go to page ${position + 1}`}
        className="cursor-grab touch-none active:cursor-grabbing"
        onClick={handleSelect}
        type="button"
      >
        <canvas
          className={cn(
            "block border-2 bg-card transition-shadow",
            isActive ? "border-primary shadow-md" : "shadow-xs"
          )}
          ref={canvasRef}
          style={{ height: rendered.height * zoom, width: THUMBNAIL_WIDTH }}
        />
      </button>
      <PageThumbnailAction
        corner="top-left"
        isActive={isActive}
        label={`Turn page ${position + 1}`}
        onClick={handleRotate}
      >
        <RotateCwIcon className="size-3.5" />
      </PageThumbnailAction>
      {canRemove ? (
        <PageThumbnailAction
          corner="top-right"
          isActive={isActive}
          label={`Remove page ${position + 1}`}
          onClick={handleRemove}
          variant="destructive"
        >
          <Trash2Icon className="size-3.5" />
        </PageThumbnailAction>
      ) : null}
      <PageThumbnailAction
        corner="bottom-left"
        isActive={isActive}
        label={`Duplicate page ${position + 1}`}
        onClick={handleCopy}
      >
        <CopyIcon className="size-3.5" />
      </PageThumbnailAction>
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
