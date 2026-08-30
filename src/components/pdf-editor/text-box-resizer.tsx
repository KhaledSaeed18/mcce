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
  onResize: (edge: TextBoxEdge, dx: number) => void;
  zoom: number;
}

/** The grab strip on a box's side: pulling it in rewraps the text to the new width. */
export function TextBoxResizer({ edge, onResize, zoom }: TextBoxResizerProps) {
  const handleMove = useCallback(
    (dx: number) => onResize(edge, dx),
    [edge, onResize]
  );
  const { handlePointerDown, handlePointerMove, handlePointerUp } = useDragMove(
    zoom,
    handleMove
  );

  return (
    <button
      aria-label={EDGE_LABELS[edge]}
      className={cn(
        "absolute inset-y-0 flex w-2 cursor-ew-resize touch-none items-center justify-center",
        edge === "left" ? "-left-1" : "-right-1"
      )}
      onPointerCancel={handlePointerUp}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      type="button"
    >
      <span className="h-full w-[3px] rounded-full bg-foreground" />
    </button>
  );
}
