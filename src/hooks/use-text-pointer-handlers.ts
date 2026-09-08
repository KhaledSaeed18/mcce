import { type PointerEvent, useCallback } from "react";
import type { TextDragResult } from "@/hooks/use-text-drag";
import { toPagePoint } from "@/lib/pdf-editor/pointer";
import type { PageSize, Point } from "@/lib/pdf-editor/types";

interface TextHover {
  clear: () => void;
  update: (point: Point) => void;
}

interface TextOpen {
  openAt: (event: PointerEvent<HTMLCanvasElement>) => void;
}

interface TextPointerHandlerOptions {
  end: () => TextDragResult | null;
  hover: TextHover;
  move: (point: Point) => void;
  onSelect: (id: string | null) => void;
  open: TextOpen;
  rotation: number;
  size: PageSize;
  start: (point: Point) => boolean;
  zoom: number;
}

/** Pointer event wiring for the text tool: down, move, and up handlers. */
export function useTextPointerHandlers({
  end,
  hover,
  move,
  onSelect,
  open,
  rotation,
  size,
  start,
  zoom,
}: TextPointerHandlerOptions) {
  const handleDown = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      if (start(toPagePoint(event, zoom, size, rotation))) {
        event.currentTarget.setPointerCapture(event.pointerId);
      }
    },
    [rotation, size, start, zoom]
  );

  const handleMove = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      const point = toPagePoint(event, zoom, size, rotation);
      move(point);
      hover.update(point);
    },
    [hover, move, rotation, size, zoom]
  );

  const handleUp = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      const pressed = end();
      if (pressed) {
        if (!pressed.moved) {
          onSelect(pressed.target.id);
        }
        return;
      }
      open.openAt(event);
    },
    [end, onSelect, open]
  );

  return { handleDown, handleMove, handleUp };
}
