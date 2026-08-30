import { clampTextAnchor } from "./bounds";
import { getTextBox } from "./text-metrics";
import type { PageSize, Point, TextAnnotation } from "./types";

/** How far text can follow the pointer before its box would leave the page. */
export function boundedTextDelta(
  target: TextAnnotation,
  origin: Point,
  point: Point,
  size: PageSize
): Point {
  const moved = {
    x: target.x + point.x - origin.x,
    y: target.y + point.y - origin.y,
  };
  const anchor = clampTextAnchor(
    moved,
    getTextBox({ ...target, ...moved }),
    size
  );
  return { x: anchor.x - target.x, y: anchor.y - target.y };
}
