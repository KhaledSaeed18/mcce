import {
  type MouseEvent,
  type PointerEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import { getAnnotationBox } from "@/lib/pdf-editor/annotation-box";
import { clampDelta } from "@/lib/pdf-editor/bounds";
import { type AnnotationDrag, findAnnotationAt } from "@/lib/pdf-editor/move";
import { toPagePoint } from "@/lib/pdf-editor/pointer";
import type { Annotation, Box, PageSize, Point } from "@/lib/pdf-editor/types";

/** Marks the page while the pointer is over markup, which the page's styles
 * turn into a move cursor over the text layer's own text cursor. */
export const OVER_MARKUP_ATTRIBUTE = "data-over-markup";

interface MarkupDragOptions {
  annotations: Annotation[];
  isEnabled: boolean;
  onMove: (id: string, dx: number, dy: number) => void;
  onSelect: (id: string | null) => void;
  pageId: string;
  rotation: number;
  size: PageSize;
  zoom: number;
}

interface Press {
  box: Box;
  id: string;
  origin: Point;
}

/** Picking up any markup with the select tool: a press on it selects it and
 * starts a move that lands as one undo step. A press anywhere else is left
 * to the text layer, so text can still be selected. */
export function useMarkupDrag({
  annotations,
  isEnabled,
  onMove,
  onSelect,
  pageId,
  rotation,
  size,
  zoom,
}: MarkupDragOptions) {
  const [drag, setDrag] = useState<AnnotationDrag | null>(null);
  const pressRef = useRef<Press | null>(null);
  const dragRef = useRef<AnnotationDrag | null>(null);

  const update = useCallback((next: AnnotationDrag | null) => {
    dragRef.current = next;
    setDrag(next);
  }, []);

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      // Handles on the selected markup are buttons with drags of their own.
      const isHandle = (event.target as Element).closest("button");
      if (!isEnabled || event.button !== 0 || isHandle) {
        return;
      }
      const point = toPagePoint(event, zoom, size, rotation);
      const target = findAnnotationAt(annotations, pageId, point);
      onSelect(target ? target.id : null);
      if (!target) {
        return;
      }
      event.preventDefault();
      event.currentTarget.setPointerCapture(event.pointerId);
      pressRef.current = {
        box: getAnnotationBox(target),
        id: target.id,
        origin: point,
      };
      update({ dx: 0, dy: 0, id: target.id });
    },
    [annotations, isEnabled, onSelect, pageId, rotation, size, update, zoom]
  );

  // Browsers start a text selection on the mouse press that follows, so a
  // press that picked up markup cancels that one too.
  const handleMouseDown = useCallback((event: MouseEvent) => {
    if (pressRef.current) {
      event.preventDefault();
    }
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!isEnabled) {
        return;
      }
      const point = toPagePoint(event, zoom, size, rotation);
      const { current: press } = pressRef;
      if (!press) {
        const isOver = findAnnotationAt(annotations, pageId, point) !== null;
        event.currentTarget.setAttribute(OVER_MARKUP_ATTRIBUTE, String(isOver));
        return;
      }
      const delta = clampDelta(
        press.box,
        { x: point.x - press.origin.x, y: point.y - press.origin.y },
        size
      );
      update({ dx: delta.x, dy: delta.y, id: press.id });
    },
    [annotations, isEnabled, pageId, rotation, size, update, zoom]
  );

  const handlePointerUp = useCallback(() => {
    const { current } = dragRef;
    pressRef.current = null;
    update(null);
    if (current && (current.dx !== 0 || current.dy !== 0)) {
      onMove(current.id, current.dx, current.dy);
    }
  }, [onMove, update]);

  return {
    drag,
    handlers: {
      onMouseDownCapture: handleMouseDown,
      onPointerCancel: handlePointerUp,
      onPointerDownCapture: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
    },
  };
}
