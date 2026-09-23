import { normalizeRect } from "./geometry";
import { toBasePoint } from "./rotation";
import type { Box, PageSize } from "./types";

/** A box measured on screen over a page, in pixels from its corner, as the
 * box it covers on the upright page, which is how markup is stored. */
export function toPageBox(
  box: Box,
  zoom: number,
  size: PageSize,
  rotation: number
): Box {
  const start = toBasePoint(
    { x: box.x / zoom, y: box.y / zoom },
    size,
    rotation
  );
  const end = toBasePoint(
    { x: (box.x + box.width) / zoom, y: (box.y + box.height) / zoom },
    size,
    rotation
  );
  return normalizeRect(start, end);
}
