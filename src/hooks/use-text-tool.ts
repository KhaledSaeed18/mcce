import { type PointerEvent, useCallback } from "react";
import { useTextDrag } from "@/hooks/use-text-drag";
import { useTextHover } from "@/hooks/use-text-hover";
import { buildDraft, toDraft } from "@/lib/pdf-editor/build-draft";
import { toPagePoint } from "@/lib/pdf-editor/pointer";
import type {
  Annotation,
  PageSize,
  TextDraft,
  ToolSettings,
} from "@/lib/pdf-editor/types";

interface TextToolOptions {
  annotations: Annotation[];
  onDraft: (draft: TextDraft) => void;
  onMoveText: (id: string, dx: number, dy: number) => void;
  pageIndex: number;
  settings: ToolSettings;
  size: PageSize;
  zoom: number;
}

/**
 * Pressing text already on the page picks it up: drag to move it, release
 * without moving to open it for editing. Pressing anywhere else writes new text.
 *
 * Every field opens on the release, because the click that follows a press would
 * move focus to the canvas and blur the new field away as it appeared.
 */
export function useTextTool({
  annotations,
  onDraft,
  onMoveText,
  pageIndex,
  settings,
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
      const pressed = end();
      if (pressed) {
        if (!pressed.moved) {
          onDraft(toDraft(pressed.target));
        }
        return;
      }
      onDraft(buildDraft(toPagePoint(event, zoom, size), pageIndex, settings));
    },
    [end, onDraft, pageIndex, settings, size, zoom]
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
