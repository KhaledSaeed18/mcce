import { MIN_SHAPE_SIZE } from "@/config/pdf-editor";
import type { Box, FrameCorner, PageSize } from "./types";

/** One edge of a box moved by a drag, stopping short of the opposite edge and
 * of the page's own edge. */
function moveEdge(
  start: number,
  extent: number,
  delta: number,
  isFar: boolean,
  limit: number
): [number, number] {
  if (isFar) {
    const end = Math.min(start + extent + delta, limit);
    return [start, Math.max(end - start, MIN_SHAPE_SIZE)];
  }
  const near = Math.max(
    Math.min(start + delta, start + extent - MIN_SHAPE_SIZE),
    0
  );
  return [near, start + extent - near];
}

/** A frame with one corner dragged and the opposite corner held still. */
export function resizeBox(
  box: Box,
  corner: FrameCorner,
  dx: number,
  dy: number,
  size: PageSize
): Box {
  const [x, width] = moveEdge(
    box.x,
    box.width,
    dx,
    corner.endsWith("right"),
    size.width
  );
  const [y, height] = moveEdge(
    box.y,
    box.height,
    dy,
    corner.startsWith("bottom"),
    size.height
  );
  return { height, width, x, y };
}
