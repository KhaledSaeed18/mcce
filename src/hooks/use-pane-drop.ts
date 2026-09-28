import {
  type DragEvent,
  type RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import { TAB_DRAG_TYPE } from "@/config/pdf-editor";
import { readTabDragData } from "@/lib/pdf-editor/tab-drag-data";
import type { EditorPaneSide, OpenFile } from "@/lib/pdf-editor/types";

function isTabDrag(event: DragEvent): boolean {
  return event.dataTransfer.types.includes(TAB_DRAG_TYPE);
}

/** A tab dragged over the pages lands on the half it is dropped on. Which
 * half it is over is tracked, so that half can light up. */
export function usePaneDrop(
  containerRef: RefObject<HTMLElement | null>,
  onPlace: (file: Pick<OpenFile, "id" | "source">, side: EditorPaneSide) => void
) {
  const [target, setTarget] = useState<EditorPaneSide | null>(null);

  // A drag that ends anywhere else, or is called off, must not leave the
  // halves lit.
  useEffect(() => {
    const clear = () => setTarget(null);
    document.addEventListener("dragend", clear);
    document.addEventListener("drop", clear);
    return () => {
      document.removeEventListener("dragend", clear);
      document.removeEventListener("drop", clear);
    };
  }, []);

  const sideAt = useCallback(
    (clientX: number): EditorPaneSide => {
      const bounds = containerRef.current?.getBoundingClientRect();
      const middle = bounds ? bounds.left + bounds.width / 2 : 0;
      return clientX < middle ? "primary" : "beside";
    },
    [containerRef]
  );

  const onDragOver = useCallback(
    (event: DragEvent) => {
      if (!isTabDrag(event)) {
        return;
      }
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      setTarget(sideAt(event.clientX));
    },
    [sideAt]
  );

  const onDragLeave = useCallback((event: DragEvent) => {
    const next = event.relatedTarget;
    if (!(next instanceof Node && event.currentTarget.contains(next))) {
      setTarget(null);
    }
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      if (!isTabDrag(event)) {
        return;
      }
      event.preventDefault();
      setTarget(null);
      const file = readTabDragData(event.dataTransfer.getData(TAB_DRAG_TYPE));
      if (file) {
        onPlace(file, sideAt(event.clientX));
      }
    },
    [onPlace, sideAt]
  );

  return { handlers: { onDragLeave, onDragOver, onDrop }, target };
}
