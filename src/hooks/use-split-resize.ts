import {
  type KeyboardEvent,
  type PointerEvent,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  DEFAULT_SPLIT_RATIO,
  SPLIT_DIVIDER_WIDTH,
  SPLIT_KEY_STEP,
  SPLIT_RATIO_STORAGE_KEY,
} from "@/config/pdf-editor";
import { useElementSize } from "@/hooks/use-element-size";
import {
  clampSplitRatio,
  parseSplitRatio,
  snapSplitRatio,
} from "@/lib/pdf-editor/split-ratio";
import { readJson, writeJson } from "@/lib/storage";

const KEY_STEPS: Record<string, number> = {
  ArrowLeft: -SPLIT_KEY_STEP,
  ArrowRight: SPLIT_KEY_STEP,
};

/** The share of the width the first pane takes, and the divider handlers
 * that change it: drag it, double-click it back to even, or step it with the
 * arrow keys. Where it was left is kept for the next split. */
export function useSplitResize(containerRef: RefObject<HTMLElement | null>) {
  const size = useElementSize(containerRef);
  const [ratio, setRatio] = useState(() =>
    parseSplitRatio(readJson<unknown>(SPLIT_RATIO_STORAGE_KEY, null))
  );
  const isDraggingRef = useRef<boolean>(false);
  // The panes share what the divider leaves.
  const width = Math.max((size?.width ?? 0) - SPLIT_DIVIDER_WIDTH, 0);
  const shown = width ? clampSplitRatio(ratio, width) : ratio;

  useEffect(() => {
    writeJson(SPLIT_RATIO_STORAGE_KEY, ratio);
  }, [ratio]);

  const move = useCallback(
    (next: number) => setRatio(snapSplitRatio(clampSplitRatio(next, width))),
    [width]
  );

  const onPointerDown = useCallback((event: PointerEvent<HTMLElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    isDraggingRef.current = true;
  }, []);

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const container = containerRef.current;
      if (!(isDraggingRef.current && container)) {
        return;
      }
      const { left } = container.getBoundingClientRect();
      move((event.clientX - left - SPLIT_DIVIDER_WIDTH / 2) / width);
    },
    [containerRef, move, width]
  );

  const onPointerUp = useCallback((event: PointerEvent<HTMLElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    isDraggingRef.current = false;
  }, []);

  const onDoubleClick = useCallback(() => setRatio(DEFAULT_SPLIT_RATIO), []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      const step = KEY_STEPS[event.key];
      if (step) {
        event.preventDefault();
        move(shown + step);
      }
    },
    [move, shown]
  );

  return {
    handlers: {
      onDoubleClick,
      onKeyDown,
      onPointerDown,
      onPointerMove,
      onPointerUp,
    },
    ratio: shown,
  };
}
