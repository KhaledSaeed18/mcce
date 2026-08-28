import type { PointerEvent } from "react";
import type { Point } from "./types";

/** Pointer position in page space, which is the zoom-independent unit annotations are stored in. */
export function toPagePoint(
  event: PointerEvent<HTMLCanvasElement>,
  zoom: number
): Point {
  const rect = event.currentTarget.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) / zoom,
    y: (event.clientY - rect.top) / zoom,
  };
}

export function createAnnotationId(): string {
  return crypto.randomUUID();
}
