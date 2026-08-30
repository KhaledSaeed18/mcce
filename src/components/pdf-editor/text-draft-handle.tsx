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
      className="absolute bottom-full left-0 mb-1 flex size-5 cursor-grab touch-none items-center justify-center rounded-sm border-2 bg-secondary text-secondary-foreground active:cursor-grabbing"
      onPointerCancel={handlePointerUp}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      type="button"
    >
      <GripVerticalIcon className="size-3" />
    </button>
  );
}
