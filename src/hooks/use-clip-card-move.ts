import { type PointerEvent, useCallback, useRef, useState } from "react";
import { useClipCardKeys } from "@/hooks/use-clip-card-keys";
import { clampCard } from "@/lib/pdf-editor/clips/clamp-card";
import { placeCardAt } from "@/lib/pdf-editor/clips/clip-place";
import type { ClipPlace } from "@/lib/pdf-editor/clips/types";
import type { Box, PageSize } from "@/lib/pdf-editor/types";

export interface ClipCardMoveOptions {
  area: PageSize;
  bottomInset: number;
  box: Box;
  onClose: () => void;
  onPlace: (place: ClipPlace) => void;
}

/** Moves a card by its header: dragged, it follows the pointer and settles
 * at the nearest corner when let go; focused, the arrow keys move it and
 * Delete closes it. */
export function useClipCardMove({
  area,
  bottomInset,
  box,
  onClose,
  onPlace,
}: ClipCardMoveOptions) {
  const [live, setLive] = useState<Box | null>(null);
  const liveRef = useRef<Box | null>(null);
  const startRef = useRef<{ box: Box; x: number; y: number } | null>(null);

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (event.button !== 0) {
        return;
      }
      event.currentTarget.setPointerCapture(event.pointerId);
      startRef.current = { box, x: event.clientX, y: event.clientY };
    },
    [box]
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const start = startRef.current;
      if (!start) {
        return;
      }
      const next = clampCard(
        {
          ...start.box,
          x: start.box.x + event.clientX - start.x,
          y: start.box.y + event.clientY - start.y,
        },
        area,
        bottomInset
      );
      liveRef.current = next;
      setLive(next);
    },
    [area, bottomInset]
  );

  const handlePointerUp = useCallback(() => {
    const moved = liveRef.current;
    startRef.current = null;
    liveRef.current = null;
    setLive(null);
    if (moved) {
      onPlace(placeCardAt(moved, area, bottomInset));
    }
  }, [area, bottomInset, onPlace]);

  const handleKeyDown = useClipCardKeys({
    area,
    bottomInset,
    box,
    onClose,
    onPlace,
  });

  return {
    box: live ?? box,
    handlers: {
      onKeyDown: handleKeyDown,
      onPointerCancel: handlePointerUp,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
    },
    isMoving: live !== null,
  };
}
