import { type PointerEvent, useCallback } from "react";
import { useTextDrag } from "@/hooks/use-text-drag";
import { toPagePoint } from "@/lib/pdf-editor/pointer";
import type { Annotation, TextDraft } from "@/lib/pdf-editor/types";

interface TextToolOptions {
  annotations: Annotation[];
  onMoveText: (id: string, dx: number, dy: number) => void;
  onTextRequest: (draft: TextDraft) => void;
  pageIndex: number;
  zoom: number;
}

/** Pressing text already on the page moves it; pressing anywhere else opens a new field. */
export function useTextTool({
  annotations,
  onMoveText,
  onTextRequest,
  pageIndex,
  zoom,
}: TextToolOptions) {
  const { drag, end, move, start } = useTextDrag({
    annotations,
    onMove: onMoveText,
    pageIndex,
  });

  const handleDown = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      if (start(toPagePoint(event, zoom))) {
        event.currentTarget.setPointerCapture(event.pointerId);
      }
    },
    [start, zoom]
  );

  const handleMove = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => move(toPagePoint(event, zoom)),
    [move, zoom]
  );

  const handleUp = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      // A press that moved text must not also leave a new field behind it.
      if (end()) {
        return;
      }
      const point = toPagePoint(event, zoom);
      onTextRequest({ pageIndex, x: point.x, y: point.y });
    },
    [end, onTextRequest, pageIndex, zoom]
  );

  return { drag, handleDown, handleMove, handleUp };
}
