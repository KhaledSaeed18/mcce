import { useCallback } from "react";
import { useDragMove } from "@/hooks/use-drag-move";
import type { ArrowEnd, Point } from "@/lib/pdf-editor/types";

const ARROW_END_LABELS: Record<ArrowEnd, string> = {
  from: "Drag to move the start of the arrow",
  to: "Drag to move the tip of the arrow",
};

interface ArrowEndHandleProps {
  end: ArrowEnd;
  onEnd: () => void;
  onMove: (end: ArrowEnd, dx: number, dy: number) => void;
  point: Point;
  rotation: number;
  zoom: number;
}

/** A grab square on one end of a selected arrow. */
export function ArrowEndHandle({
  end,
  onEnd,
  onMove,
  point,
  rotation,
  zoom,
}: ArrowEndHandleProps) {
  const handleMove = useCallback(
    (dx: number, dy: number) => onMove(end, dx, dy),
    [end, onMove]
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
      aria-label={ARROW_END_LABELS[end]}
      className="border-primary bg-card pointer-events-auto absolute z-10 size-3 -translate-x-1/2 -translate-y-1/2 cursor-move touch-none rounded-full border-2"
      onPointerCancel={handleUp}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handleUp}
      style={{ left: point.x * zoom, top: point.y * zoom }}
      type="button"
    />
  );
}
