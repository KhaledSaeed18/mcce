import { type PointerEvent, useCallback, useRef } from "react";
import { toBaseDelta } from "@/lib/pdf-editor/rotation";

/** Drag handlers reporting movement in page units, whatever the zoom or the turn. */
export function useDragMove(
  zoom: number,
  onMove: (dx: number, dy: number) => void,
  rotation = 0
) {
  const lastRef = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = useCallback((event: PointerEvent<HTMLElement>) => {
    // Keeps the press from moving focus, so a field being typed into stays open.
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    lastRef.current = { x: event.clientX, y: event.clientY };
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      const { current: last } = lastRef;
      // biome-ignore lint/suspicious/noUnnecessaryConditions: filled by the press handler, which the analyzer cannot see across
      if (!last) {
        return;
      }
      lastRef.current = { x: event.clientX, y: event.clientY };
      const delta = toBaseDelta(
        {
          x: (event.clientX - last.x) / zoom,
          y: (event.clientY - last.y) / zoom,
        },
        rotation
      );
      onMove(delta.x, delta.y);
    },
    [onMove, rotation, zoom]
  );

  const handlePointerUp = useCallback(() => {
    lastRef.current = null;
  }, []);

  return { handlePointerDown, handlePointerMove, handlePointerUp };
}
