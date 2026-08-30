import { type PointerEvent, useCallback } from "react";
import { useTextDrag } from "@/hooks/use-text-drag";
import { useTextHover } from "@/hooks/use-text-hover";
import { toPagePoint } from "@/lib/pdf-editor/pointer";
import type { Annotation, PageSize, TextDraft } from "@/lib/pdf-editor/types";

interface TextToolOptions {
  annotations: Annotation[];
  onMoveText: (id: string, dx: number, dy: number) => void;
  onTextRequest: (draft: TextDraft) => void;
  pageIndex: number;
  size: PageSize;
  zoom: number;
}

/** Pressing text already on the page moves it; pressing anywhere else opens a new field. */
export function useTextTool({
  annotations,
  onMoveText,
  onTextRequest,
  pageIndex,
  size,
  zoom,
}: TextToolOptions) {
  const { drag, end, move, start } = useTextDrag({
    annotations,
    onMove: onMoveText,
    pageIndex,
    size,
  });
  const hover = useTextHover(annotations, pageIndex);

  const handleDown = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      if (start(toPagePoint(event, zoom, size))) {
        event.currentTarget.setPointerCapture(event.pointerId);
      }
    },
    [size, start, zoom]
  );

  const handleMove = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      const point = toPagePoint(event, zoom, size);
      move(point);
      hover.update(point);
    },
    [hover, move, size, zoom]
  );

  const handleUp = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      // A press that moved text must not also leave a new field behind it.
      if (end()) {
        return;
      }
      const point = toPagePoint(event, zoom, size);
      onTextRequest({ pageIndex, x: point.x, y: point.y });
    },
    [end, onTextRequest, pageIndex, size, zoom]
  );

  return {
    drag,
    handleDown,
    handleLeave: hover.clear,
    handleMove,
    handleUp,
    hoveredId: hover.hoveredId,
  };
}
