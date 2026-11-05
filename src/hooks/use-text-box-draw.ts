import { useCallback, useRef, useState } from "react";
import { MIN_TEXT_BOX_WIDTH, TEXT_MOVE_TOLERANCE } from "@/config/pdf-editor";
import { normalizeRect } from "@/lib/pdf-editor/geometry";
import type { Box, Point } from "@/lib/pdf-editor/types";

/** What a press on bare page came to: no press at all, a click, or a drawn box. */
export type TextBoxDrawResult = Box | "click" | null;

/** Drawing a text box by dragging on bare page, the way to set its width up front. */
export function useTextBoxDraw() {
  const originRef = useRef<Point | null>(null);
  const boxRef = useRef<Box | null>(null);
  const [box, setBox] = useState<Box | null>(null);

  const update = useCallback((next: Box | null) => {
    boxRef.current = next;
    setBox(next);
  }, []);

  const begin = useCallback((point: Point) => {
    originRef.current = point;
  }, []);

  const move = useCallback(
    (point: Point) => {
      const { current: origin } = originRef;
      if (!origin) {
        return;
      }
      const isFar =
        Math.hypot(point.x - origin.x, point.y - origin.y) >
        TEXT_MOVE_TOLERANCE;
      if (isFar || boxRef.current) {
        update(normalizeRect(origin, point));
      }
    },
    [update]
  );

  const end = useCallback((): TextBoxDrawResult => {
    const { current: origin } = originRef;
    const { current: drawn } = boxRef;
    originRef.current = null;
    update(null);
    if (!origin) {
      return null;
    }
    return drawn && drawn.width >= MIN_TEXT_BOX_WIDTH ? drawn : "click";
  }, [update]);

  return { begin, box, end, move };
}
