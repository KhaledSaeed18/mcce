import type { PointerEvent } from "react";
import { useCallback, useRef } from "react";
import { usePageScroller } from "@/hooks/use-page-scroller";

interface HandToolState {
  scrollLeft: number;
  scrollTop: number;
  startX: number;
  startY: number;
}

interface PointerHandlers {
  handleDown: (event: PointerEvent<HTMLCanvasElement>) => void;
  handleMove: (event: PointerEvent<HTMLCanvasElement>) => void;
  handleUp: (event: PointerEvent<HTMLCanvasElement>) => void;
}

export function useHandTool(): PointerHandlers {
  const scrollerRef = usePageScroller();
  const dragRef = useRef<HandToolState | null>(null);

  const handleDown = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      const scroller = scrollerRef.current;
      if (!scroller) {
        return;
      }
      event.currentTarget.setPointerCapture(event.pointerId);
      dragRef.current = {
        scrollLeft: scroller.scrollLeft,
        scrollTop: scroller.scrollTop,
        startX: event.clientX,
        startY: event.clientY,
      };
    },
    [scrollerRef]
  );

  const handleMove = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      const drag = dragRef.current;
      const scroller = scrollerRef.current;
      if (!(drag && scroller)) {
        return;
      }
      scroller.scrollLeft = drag.scrollLeft - (event.clientX - drag.startX);
      scroller.scrollTop = drag.scrollTop - (event.clientY - drag.startY);
    },
    [scrollerRef]
  );

  const handleUp = useCallback((event: PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current = null;
  }, []);

  return { handleDown, handleMove, handleUp };
}
