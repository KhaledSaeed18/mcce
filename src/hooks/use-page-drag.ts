import {
  type MouseEvent,
  type PointerEvent,
  type RefObject,
  useCallback,
  useRef,
  useState,
} from "react";
import { PAGE_DRAG_TOLERANCE } from "@/config/pdf-editor";
import { usePageReorderKeys } from "@/hooks/use-page-reorder-keys";
import { readInsertAt, readRailPosition } from "@/lib/pdf-editor/rail-position";
import type { PageDrag } from "@/lib/pdf-editor/types";

interface PageDragOptions {
  onMove: (from: number, to: number) => void;
  rootRef: RefObject<HTMLElement | null>;
}

/** Dragging a thumbnail to another place in the document. */
export function usePageDrag({ onMove, rootRef }: PageDragOptions) {
  const [drag, setDrag] = useState<PageDrag | null>(null);
  const handleKeyDown = usePageReorderKeys(onMove);
  const startRef = useRef<{ from: number; y: number } | null>(null);
  // A press that turned into a drag must not also count as a click to that page.
  const hasDraggedRef = useRef(false);

  const handlePointerDown = useCallback((event: PointerEvent<HTMLElement>) => {
    const from = readRailPosition(event.target);
    if (from === null) {
      return;
    }
    startRef.current = { from, y: event.clientY };
    // A drag that ends over another thumbnail fires no click to clear this, so
    // every press starts it afresh rather than leaving it set for the next one.
    hasDraggedRef.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const start = startRef.current;
      const root = rootRef.current;
      // biome-ignore lint/suspicious/noUnnecessaryConditions: filled by the press handler, a sibling callback the analyzer cannot see across
      if (!(start && root)) {
        return;
      }
      if (Math.abs(event.clientY - start.y) > PAGE_DRAG_TOLERANCE) {
        hasDraggedRef.current = true;
      }
      // biome-ignore lint/suspicious/noUnnecessaryConditions: set just above and by earlier moves, which the analyzer does not follow
      if (hasDraggedRef.current) {
        setDrag({
          from: start.from,
          insertAt: readInsertAt(root, event.clientY),
        });
      }
    },
    [rootRef]
  );

  const handlePointerUp = useCallback(() => {
    const start = startRef.current;
    startRef.current = null;
    setDrag(null);
    // biome-ignore lint/suspicious/noUnnecessaryConditions: filled by the press and move handlers, sibling callbacks the analyzer cannot see across
    if (!(start && drag && hasDraggedRef.current)) {
      return;
    }
    const to = drag.insertAt > start.from ? drag.insertAt - 1 : drag.insertAt;
    onMove(start.from, to);
  }, [drag, onMove]);

  const handleClickCapture = useCallback((event: MouseEvent<HTMLElement>) => {
    // biome-ignore lint/suspicious/noUnnecessaryConditions: set by the move handler, a sibling callback the analyzer cannot see across
    if (hasDraggedRef.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, []);

  return {
    drag,
    /** Spread onto the thumbnail that starts the drag, which is what a page is carried by. */
    handlers: {
      onClickCapture: handleClickCapture,
      onKeyDown: handleKeyDown,
      onPointerCancel: handlePointerUp,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
    },
  };
}
