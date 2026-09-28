import { normalizeRect } from "../geometry";
import { getRotationTransform } from "../rotation";
import type { Box, PageSize, Point } from "../types";

function toRenderedPoint(
  point: Point,
  size: PageSize,
  rotation: number
): Point {
  const { angle, tx, ty } = getRotationTransform(size, rotation);
  const cos = Math.round(Math.cos(angle));
  const sin = Math.round(Math.sin(angle));
  return {
    x: cos * point.x - sin * point.y + tx,
    y: sin * point.x + cos * point.y + ty,
  };
}

/** A box on the upright page as it shows on the page turned as it is now,
 * at a zoom of one. */
export function toRenderedBox(box: Box, size: PageSize, rotation: number): Box {
  return normalizeRect(
    toRenderedPoint({ x: box.x, y: box.y }, size, rotation),
    toRenderedPoint(
      { x: box.x + box.width, y: box.y + box.height },
      size,
      rotation
    )
  );
}
