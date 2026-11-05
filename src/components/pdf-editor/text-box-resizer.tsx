import { useCallback } from "react";
import { useDragMove } from "@/hooks/use-drag-move";
import type { TextBoxEdge } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

const RESIZER_LABEL =
  "Drag to set where the text wraps, double click to fit it";

/** A page on its side turns the frame with it, so its sides run across the screen. */
const SIDEWAYS_TURN = 180;

interface TextBoxResizerProps {
  edge: TextBoxEdge;
  onEnd: () => void;
  /** A double click lets the box hug its text again. */
  onFit: () => void;
  onResize: (edge: TextBoxEdge, dx: number) => void;
  rotation: number;
  zoom: number;
}

/** The grab strip down a box's side: pulling it rewraps the text to the new width. */
export function TextBoxResizer({
  edge,
  onEnd,
  onFit,
  onResize,
  rotation,
  zoom,
}: TextBoxResizerProps) {
  const handleMove = useCallback(
    (dx: number) => onResize(edge, dx),
    [edge, onResize]
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
      aria-label={RESIZER_LABEL}
      className={cn(
        "pointer-events-auto absolute -inset-y-1 flex w-3 touch-none items-center justify-center",
        edge === "left" ? "-left-2.5" : "-right-2.5",
        rotation % SIDEWAYS_TURN === 0 ? "cursor-ew-resize" : "cursor-ns-resize"
      )}
      onDoubleClick={onFit}
      onPointerCancel={handleUp}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handleUp}
      type="button"
    >
      <span className="border-primary bg-card h-4 w-1.5 rounded-full border" />
    </button>
  );
}
