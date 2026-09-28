import { type RefObject, useEffect, useRef, useState } from "react";
import { CLIP_CARD_ATTRIBUTE } from "@/config/pdf-editor";
import type { Box } from "@/lib/pdf-editor/types";

const NONE: ReadonlySet<string> = new Set();

function isInside(box: Box, x: number, y: number): boolean {
  return (
    x >= box.x &&
    x <= box.x + box.width &&
    y >= box.y &&
    y <= box.y + box.height
  );
}

/** The cards a stroke or drag on the pages has passed under, which turn
 * see-through until it ends, so no card hides what is being drawn. */
export function useClipSeeThrough(
  layerRef: RefObject<HTMLElement | null>,
  boxes: ReadonlyMap<string, Box>
): ReadonlySet<string> {
  const [passed, setPassed] = useState<ReadonlySet<string>>(NONE);
  const boxesRef = useRef(boxes);

  useEffect(() => {
    boxesRef.current = boxes;
  }, [boxes]);

  useEffect(() => {
    const layer = layerRef.current;
    const pages = layer?.parentElement;
    if (!(layer && pages)) {
      return;
    }
    let isPressed = false;
    let ids = new Set<string>();

    const handleDown = (event: PointerEvent) => {
      const target = event.target as Element;
      isPressed =
        pages.contains(target) && !target.closest(`[${CLIP_CARD_ATTRIBUTE}]`);
      ids = new Set();
    };
    const handleMove = (event: PointerEvent) => {
      if (!isPressed) {
        return;
      }
      const rect = layer.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      for (const [id, box] of boxesRef.current) {
        if (!ids.has(id) && isInside(box, x, y)) {
          ids.add(id);
          setPassed(new Set(ids));
        }
      }
    };
    const handleUp = () => {
      if (isPressed && ids.size > 0) {
        setPassed(NONE);
      }
      isPressed = false;
    };

    document.addEventListener("pointerdown", handleDown, true);
    document.addEventListener("pointermove", handleMove, true);
    document.addEventListener("pointerup", handleUp, true);
    document.addEventListener("pointercancel", handleUp, true);
    return () => {
      document.removeEventListener("pointerdown", handleDown, true);
      document.removeEventListener("pointermove", handleMove, true);
      document.removeEventListener("pointerup", handleUp, true);
      document.removeEventListener("pointercancel", handleUp, true);
    };
  }, [layerRef]);

  return passed;
}
