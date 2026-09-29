import { type KeyboardEvent, useCallback } from "react";
import { CLIP_MOVE_STEP, CLIP_MOVE_STEP_LARGE } from "@/config/pdf-editor";
import type { ClipCardMoveOptions } from "@/hooks/use-clip-card-move";
import { clampCard } from "@/lib/pdf-editor/clips/clamp-card";
import { placeCardAt } from "@/lib/pdf-editor/clips/clip-place";
import type { Point } from "@/lib/pdf-editor/types";

const ARROWS: Record<string, Point> = {
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  ArrowUp: { x: 0, y: -1 },
};
const CLOSE_KEYS = new Set(["Backspace", "Delete"]);

/** With a card's header focused, the arrow keys move it, further with
 * Shift held, and Delete closes it. */
export function useClipCardKeys({
  area,
  bottomInset,
  box,
  keepClear,
  onClose,
  onPlace,
}: ClipCardMoveOptions) {
  return useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      const arrow = ARROWS[event.key];
      if (!(arrow || CLOSE_KEYS.has(event.key))) {
        return;
      }
      // The page's own arrow and Delete keys would act on the file too.
      event.preventDefault();
      event.stopPropagation();
      if (!arrow) {
        onClose();
        return;
      }
      const step = event.shiftKey ? CLIP_MOVE_STEP_LARGE : CLIP_MOVE_STEP;
      const moved = clampCard(
        { ...box, x: box.x + arrow.x * step, y: box.y + arrow.y * step },
        area,
        bottomInset
      );
      onPlace(placeCardAt(keepClear(moved), area, bottomInset, false));
    },
    [area, bottomInset, box, keepClear, onClose, onPlace]
  );
}
