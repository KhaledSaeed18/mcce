import { useCallback } from "react";
import { useDragMove } from "@/hooks/use-drag-move";
import type { FrameCorner } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

const CORNER_CLASSES: Record<FrameCorner, string> = {
  "bottom-left": "-bottom-2 -left-2 cursor-nesw-resize",
  "bottom-right": "-right-2 -bottom-2 cursor-nwse-resize",
  "top-left": "-top-2 -left-2 cursor-nwse-resize",
  "top-right": "-top-2 -right-2 cursor-nesw-resize",
};

interface MarkupResizeHandleProps {
  corner: FrameCorner;
  onEnd: () => void;
  onResize: (corner: FrameCorner, dx: number, dy: number) => void;
  rotation: number;
  zoom: number;
}

/** A grab square on a corner of the selected markup's frame. */
export function MarkupResizeHandle({
  corner,
  onEnd,
  onResize,
  rotation,
  zoom,
}: MarkupResizeHandleProps) {
  const handleMove = useCallback(
    (dx: number, dy: number) => onResize(corner, dx, dy),
    [corner, onResize]
  );
  const { handlePointerDown, handlePointerMove, handlePointerUp } = useDragMove(
    zoom,
    handleMove,
    rotation
  );

  const handleUp = useCallback(() => {
    handlePointerUp();
    onEnd();
  }, [handlePointerUp, onEnd]);

  return (
    <button
      aria-label={`Drag to resize from the ${corner.replace("-", " ")} corner`}
      className={cn(
        "pointer-events-auto absolute size-3 touch-none rounded-sm border-2 border-primary bg-card",
        CORNER_CLASSES[corner]
      )}
      onPointerCancel={handleUp}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handleUp}
      type="button"
    />
  );
}
