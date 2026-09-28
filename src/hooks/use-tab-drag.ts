import { type DragEvent, useCallback, useRef, useState } from "react";
import { TAB_DRAG_TYPE } from "@/config/pdf-editor";
import { writeTabDragData } from "@/lib/pdf-editor/tab-drag-data";
import type { OpenFile } from "@/lib/pdf-editor/types";

/** Only past the middle of the tab it is over does a dragged tab take its
 * place. Swapping on first touch would put a narrower tab back under the
 * pointer, and the two would trade places on every move. */
function isPastMiddle(event: DragEvent<HTMLElement>, isMovingRight: boolean) {
  const { left, width } = event.currentTarget.getBoundingClientRect();
  const middle = left + width / 2;
  return isMovingRight ? event.clientX > middle : event.clientX < middle;
}

/** Drag a tab along the strip to reorder it. The tabs move as it passes
 * them, so where it lands is always on show. The drag carries the file too,
 * for dropping it on the pages. */
export function useTabDrag(onMove: (from: number, to: number) => void) {
  const fromRef = useRef<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const end = useCallback(() => {
    fromRef.current = null;
    setDraggingIndex(null);
  }, []);

  const handlersFor = useCallback(
    (index: number, file: OpenFile) => ({
      draggable: true,
      onDragEnd: end,
      onDragOver: (event: DragEvent<HTMLElement>) => {
        const from = fromRef.current;
        // A file dragged in from the computer is the drop zone's to handle.
        if (from === null) {
          return;
        }
        event.preventDefault();
        if (from !== index && isPastMiddle(event, index > from)) {
          onMove(from, index);
          fromRef.current = index;
          setDraggingIndex(index);
        }
      },
      onDragStart: (event: DragEvent<HTMLElement>) => {
        fromRef.current = index;
        setDraggingIndex(index);
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData(TAB_DRAG_TYPE, writeTabDragData(file));
      },
      onDrop: (event: DragEvent<HTMLElement>) => {
        if (fromRef.current !== null) {
          event.preventDefault();
        }
      },
    }),
    [end, onMove]
  );

  return { draggingIndex, handlersFor };
}

export type TabDragHandlers = ReturnType<
  ReturnType<typeof useTabDrag>["handlersFor"]
>;
