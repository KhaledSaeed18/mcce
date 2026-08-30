import { useCallback } from "react";
import { useDragMove } from "@/hooks/use-drag-move";
import type { TextBoxEdge } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

const EDGE_LABELS: Record<TextBoxEdge, string> = {
  left: "Drag to set the text width from the left",
  right: "Drag to set the text width from the right",
};

interface TextBoxResizerProps {
  edge: TextBoxEdge;
  /** Called on release, for a caller that turns a whole drag into one change. */
  onEnd?: () => void;
  onResize: (edge: TextBoxEdge, dx: number) => void;
  rotation: number;
  zoom: number;
}

/** The grab strip on a box's side: pulling it in rewraps the text to the new width. */
export function TextBoxResizer({
  edge,
  onEnd,
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
    onEnd?.();
  }, [handlePointerUp, onEnd]);

  return (
    <button
      aria-label={EDGE_LABELS[edge]}
      className={cn(
        "pointer-events-auto absolute inset-y-0 flex w-2 cursor-ew-resize touch-none items-center justify-center",
        edge === "left" ? "-left-1" : "-right-1"
      )}
      onPointerCancel={handleUp}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handleUp}
      type="button"
    >
      <span className="h-full w-[3px] rounded-full bg-foreground" />
    </button>
  );
}
