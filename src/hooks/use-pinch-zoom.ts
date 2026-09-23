import { type RefObject, useEffect, useRef } from "react";
import {
  GESTURE_ZOOM_STEP_SCALE,
  WHEEL_ZOOM_STEP_DELTA,
} from "@/config/pdf-editor";

interface PinchZoomOptions {
  onZoomIn: () => void;
  onZoomOut: () => void;
}

/** Safari's pinch event, which the DOM typings do not include. */
interface GestureEvent extends Event {
  scale: number;
}

/**
 * Ctrl/Cmd+wheel and trackpad pinches zoom the pages instead of the browser.
 * Chrome and Firefox report a pinch as ctrl+wheel; Safari sends gesture events.
 * Both are gathered into whole zoom steps, since every step redraws each page.
 */
export function usePinchZoom(
  scrollRef: RefObject<HTMLElement | null>,
  { onZoomIn, onZoomOut }: PinchZoomOptions
) {
  const wheelRef = useRef(0);
  const scaleRef = useRef(1);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller) {
      return;
    }

    const handleWheel = (event: WheelEvent) => {
      if (!(event.ctrlKey || event.metaKey)) {
        return;
      }
      event.preventDefault();
      // A change of direction starts a new step rather than cancelling the old one.
      if (Math.sign(event.deltaY) !== Math.sign(wheelRef.current)) {
        wheelRef.current = 0;
      }
      wheelRef.current += event.deltaY;
      if (Math.abs(wheelRef.current) < WHEEL_ZOOM_STEP_DELTA) {
        return;
      }
      (wheelRef.current < 0 ? onZoomIn : onZoomOut)();
      wheelRef.current = 0;
    };

    const handleGestureStart = (event: Event) => {
      event.preventDefault();
      scaleRef.current = 1;
    };

    const handleGestureChange = (event: Event) => {
      event.preventDefault();
      const { scale } = event as GestureEvent;
      const ratio = scale / scaleRef.current;
      if (ratio >= GESTURE_ZOOM_STEP_SCALE) {
        onZoomIn();
        scaleRef.current = scale;
      } else if (ratio <= 1 / GESTURE_ZOOM_STEP_SCALE) {
        onZoomOut();
        scaleRef.current = scale;
      }
    };

    scroller.addEventListener("wheel", handleWheel, { passive: false });
    scroller.addEventListener("gesturestart", handleGestureStart);
    scroller.addEventListener("gesturechange", handleGestureChange);
    return () => {
      scroller.removeEventListener("wheel", handleWheel);
      scroller.removeEventListener("gesturestart", handleGestureStart);
      scroller.removeEventListener("gesturechange", handleGestureChange);
    };
  }, [onZoomIn, onZoomOut, scrollRef]);
}
