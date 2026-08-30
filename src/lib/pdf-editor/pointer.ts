import type { PointerEvent } from "react";
import { clampPoint } from "./bounds";
import type { PageSize, Point } from "./types";

/**
 * Pointer position in page space, which is the zoom-independent unit annotations
 * are stored in. A drag holds the pointer capture past the page edge, so the
 * result is clamped to the page rather than left outside it where nothing renders.
 */
export function toPagePoint(
  event: PointerEvent<HTMLCanvasElement>,
  zoom: number,
  size: PageSize
): Point {
  const rect = event.currentTarget.getBoundingClientRect();
  return clampPoint(
    {
      x: (event.clientX - rect.left) / zoom,
      y: (event.clientY - rect.top) / zoom,
    },
    size
  );
}

export function createAnnotationId(): string {
  return crypto.randomUUID();
}
