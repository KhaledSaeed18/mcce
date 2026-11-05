import { useDragMove } from "@/hooks/use-drag-move";
import { cn } from "@/lib/utils";

interface TextMoveStripProps {
  edge: "bottom" | "top";
  onMove: (dx: number, dy: number) => void;
  rotation: number;
  zoom: number;
}

/** The frame's top or bottom line while typing, where the text inside is busy
 * taking the caret, as the place to pick the box up. */
export function TextMoveStrip({
  edge,
  onMove,
  rotation,
  zoom,
}: TextMoveStripProps) {
  const { handlePointerDown, handlePointerMove, handlePointerUp } = useDragMove(
    zoom,
    onMove,
    rotation
  );

  return (
    <button
      aria-label="Drag to move this text"
      className={cn(
        "pointer-events-auto absolute inset-x-0 h-2.5 cursor-move touch-none",
        edge === "top" ? "-top-2.5" : "-bottom-2.5"
      )}
      onPointerCancel={handlePointerUp}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      type="button"
    />
  );
}
