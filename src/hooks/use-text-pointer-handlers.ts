import { type PointerEvent, useCallback } from "react";
import type { TextBoxDrawResult } from "@/hooks/use-text-box-draw";
import type { TextDragResult } from "@/hooks/use-text-drag";
import { isPressConsumed } from "@/lib/pdf-editor/consumed-press";
import { toPagePoint } from "@/lib/pdf-editor/pointer";
import type { Box, PageSize, Point } from "@/lib/pdf-editor/types";

export interface TextPointerActions {
  beginBox: (point: Point) => void;
  endBox: () => TextBoxDrawResult;
  endDrag: () => TextDragResult | null;
  moveBox: (point: Point) => void;
  moveDrag: (point: Point) => void;
  onHover: (point: Point) => void;
  onOpenAt: (point: Point) => void;
  onOpenBox: (box: Box) => void;
  onOpenOn: (result: TextDragResult, point: Point) => void;
  onSelect: (id: string) => void;
  startDrag: (point: Point) => boolean;
}

interface TextPointerHandlerOptions {
  actions: TextPointerActions;
  rotation: number;
  size: PageSize;
  zoom: number;
}

/**
 * The text tool's press. On text, a drag moves it and a click edits it. On bare
 * page, a drag draws a box and a click opens one, unless the same press just
 * finished the text being typed.
 *
 * Every field opens on the release, because the mouse press that comes with
 * the pointer press would otherwise take the focus straight back from it.
 */
export function useTextPointerHandlers({
  actions,
  rotation,
  size,
  zoom,
}: TextPointerHandlerOptions) {
  const handleDown = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      const point = toPagePoint(event, zoom, size, rotation);
      if (actions.startDrag(point)) {
        event.currentTarget.setPointerCapture(event.pointerId);
        return;
      }
      if (!isPressConsumed(event.nativeEvent)) {
        event.currentTarget.setPointerCapture(event.pointerId);
        actions.beginBox(point);
      }
    },
    [actions, rotation, size, zoom]
  );

  const handleMove = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      const point = toPagePoint(event, zoom, size, rotation);
      actions.moveDrag(point);
      actions.moveBox(point);
      actions.onHover(point);
    },
    [actions, rotation, size, zoom]
  );

  const handleUp = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      const point = toPagePoint(event, zoom, size, rotation);
      const pressed = actions.endDrag();
      if (pressed) {
        if (pressed.moved) {
          actions.onSelect(pressed.target.id);
        } else {
          actions.onOpenOn(pressed, point);
        }
        return;
      }
      const drawn = actions.endBox();
      if (drawn === "click") {
        actions.onOpenAt(point);
      } else if (drawn) {
        actions.onOpenBox(drawn);
      }
    },
    [actions, rotation, size, zoom]
  );

  return { handleDown, handleMove, handleUp };
}
