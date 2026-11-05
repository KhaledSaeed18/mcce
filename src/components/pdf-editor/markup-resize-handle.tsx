import { useCallback } from "react";
import { useDragMove } from "@/hooks/use-drag-move";
import type { FrameCorner } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

const CORNER_CLASSES: Record<FrameCorner, string> = {
  "bottom-left": "-bottom-2 -left-2",
  "bottom-right": "-right-2 -bottom-2",
  "top-left": "-top-2 -left-2",
  "top-right": "-top-2 -right-2",
};

const FALLING_CORNERS: ReadonlySet<FrameCorner> = new Set([
  "bottom-right",
  "top-left",
]);

/** A page on its side turns the frame with it, which swaps the two diagonals. */
const SIDEWAYS_TURN = 180;

function getCornerCursor(corner: FrameCorner, rotation: number): string {
  const isFalling =
    FALLING_CORNERS.has(corner) === (rotation % SIDEWAYS_TURN === 0);
  return isFalling ? "cursor-nwse-resize" : "cursor-nesw-resize";
}

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
        "border-primary bg-card pointer-events-auto absolute size-3 touch-none rounded-sm border-2",
        CORNER_CLASSES[corner],
        getCornerCursor(corner, rotation)
      )}
      onPointerCancel={handleUp}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handleUp}
      type="button"
    />
  );
}
