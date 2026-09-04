import type { PointerEvent } from "react";
import { clampPoint } from "./bounds";
import { toBasePoint } from "./rotation";
import type { PageSize, Point } from "./types";

/**
 * Pointer position in the page's upright space, which is the unit annotations are
 * stored in whatever the zoom or the turn. A drag holds the pointer capture past
 * the page edge, so the result is clamped to the page rather than left outside it
 * where nothing renders.
 */
export function toPagePoint(
  event: PointerEvent<HTMLCanvasElement>,
  zoom: number,
  size: PageSize,
  rotation = 0
): Point {
  const rect = event.currentTarget.getBoundingClientRect();
  const rendered = {
    x: (event.clientX - rect.left) / zoom,
    y: (event.clientY - rect.top) / zoom,
  };
  return clampPoint(toBasePoint(rendered, size, rotation), size);
}

export function createAnnotationId(): string {
  return crypto.randomUUID();
}
