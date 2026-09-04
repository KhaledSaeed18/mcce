import { PAGE_INSET } from "@/config/pdf-editor";
import type { Box, PageSize, Point } from "./types";

/** Where a span of the given length has to start to sit inside the page. */
function clampSpan(start: number, extent: number, limit: number): number {
  const furthest = Math.max(PAGE_INSET, limit - PAGE_INSET - extent);
  return Math.min(Math.max(start, PAGE_INSET), furthest);
}

/** A pointer that has left the page still reports a point on it, so markup never escapes. */
export function clampPoint(point: Point, size: PageSize): Point {
  return {
    x: Math.min(Math.max(point.x, 0), size.width),
    y: Math.min(Math.max(point.y, 0), size.height),
  };
}

/** The same rectangle, slid onto the page without being resized. */
export function clampBox(box: Box, size: PageSize): Box {
  return {
    ...box,
    x: clampSpan(box.x, box.width, size.width),
    y: clampSpan(box.y, box.height, size.height),
  };
}

/**
 * Moves an anchor by whatever it takes to pull its box fully onto the page.
 * The box is passed already positioned, so the caller decides how it hangs off
 * the anchor: text sits above its baseline, the field it is typed in around it.
 */
export function clampTextAnchor(
  anchor: Point,
  box: Box,
  size: PageSize
): Point {
  const moved = clampBox(box, size);
  return { x: anchor.x + moved.x - box.x, y: anchor.y + moved.y - box.y };
}
