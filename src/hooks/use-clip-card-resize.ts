import { type PointerEvent, useCallback, useRef, useState } from "react";
import { CLIP_MARGIN, CLIP_MIN_WIDTH } from "@/config/pdf-editor";
import {
  findCardHeight,
  isBottomCorner,
  isRightCorner,
} from "@/lib/pdf-editor/clips/clip-card-box";
import { placeFromCorner } from "@/lib/pdf-editor/clips/clip-place";
import type { ClipPlace } from "@/lib/pdf-editor/clips/types";
import type { Box, PageSize } from "@/lib/pdf-editor/types";

interface ClipCardResizeOptions {
  area: PageSize;
  aspect: number;
  bottomInset: number;
  box: Box;
  onPlace: (place: ClipPlace) => void;
  place: ClipPlace;
}

/** Resizes a card from the corner across from the one it keeps to, so that
 * corner stays put and the picture keeps its shape. */
export function useClipCardResize({
  area,
  aspect,
  bottomInset,
  box,
  onPlace,
  place,
}: ClipCardResizeOptions) {
  const [live, setLive] = useState<Box | null>(null);
  const liveRef = useRef<Box | null>(null);
  const startRef = useRef<{ box: Box; x: number } | null>(null);
  const { corner } = place;

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      event.stopPropagation();
      event.currentTarget.setPointerCapture(event.pointerId);
      startRef.current = { box, x: event.clientX };
    },
    [box]
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const start = startRef.current;
      if (!start) {
        return;
      }
      const dx = event.clientX - start.x;
      const grown = start.box.width + (isRightCorner(corner) ? -dx : dx);
      const width = Math.max(
        CLIP_MIN_WIDTH,
        Math.min(grown, area.width - 2 * CLIP_MARGIN)
      );
      const height = findCardHeight(width, aspect);
      const next = {
        height,
        width,
        x: isRightCorner(corner)
          ? start.box.x + start.box.width - width
          : start.box.x,
        y: isBottomCorner(corner)
          ? start.box.y + start.box.height - height
          : start.box.y,
      };
      liveRef.current = next;
      setLive(next);
    },
    [area.width, aspect, corner]
  );

  const handlePointerUp = useCallback(() => {
    const resized = liveRef.current;
    startRef.current = null;
    liveRef.current = null;
    setLive(null);
    if (resized) {
      const room = { height: area.height - bottomInset, width: area.width };
      onPlace(placeFromCorner(resized, room, corner, false));
    }
  }, [area, bottomInset, corner, onPlace]);

  return {
    box: live,
    handlers: {
      onPointerCancel: handlePointerUp,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
    },
  };
}
