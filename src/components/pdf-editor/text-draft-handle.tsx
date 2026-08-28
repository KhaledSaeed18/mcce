import { GripVerticalIcon } from "lucide-react";
import { useDragMove } from "@/hooks/use-drag-move";

interface TextDraftHandleProps {
  onMove: (dx: number, dy: number) => void;
  zoom: number;
}

export function TextDraftHandle({ onMove, zoom }: TextDraftHandleProps) {
  const { handlePointerDown, handlePointerMove, handlePointerUp } = useDragMove(
    zoom,
    onMove
  );

  return (
    <button
      aria-label="Move this text"
      className="flex h-9 cursor-grab touch-none items-center rounded-l border-2 border-r-0 bg-secondary px-1 text-secondary-foreground active:cursor-grabbing"
      onPointerCancel={handlePointerUp}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      type="button"
    >
      <GripVerticalIcon className="size-4" />
    </button>
  );
}
