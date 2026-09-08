import type { PointerEvent } from "react";
import { useCallback, useRef } from "react";

let scrollContainer: HTMLDivElement | null = null;

export function setScrollContainer(element: HTMLDivElement | null) {
  scrollContainer = element;
}

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
  const dragRef = useRef<HandToolState | null>(null);

  const handleDown = useCallback((event: PointerEvent<HTMLCanvasElement>) => {
    if (!scrollContainer) {
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      scrollLeft: scrollContainer.scrollLeft,
      scrollTop: scrollContainer.scrollTop,
      startX: event.clientX,
      startY: event.clientY,
    };
  }, []);

  const handleMove = useCallback((event: PointerEvent<HTMLCanvasElement>) => {
    const drag = dragRef.current;
    // biome-ignore lint/suspicious/noUnnecessaryConditions: set by the press handler, a sibling callback the analyzer cannot see across
    if (!drag) {
      return;
    }
    if (!scrollContainer) {
      return;
    }
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    scrollContainer.scrollLeft = drag.scrollLeft - dx;
    scrollContainer.scrollTop = drag.scrollTop - dy;
  }, []);

  const handleUp = useCallback((event: PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    dragRef.current = null;
  }, []);

  return { handleDown, handleMove, handleUp };
}
