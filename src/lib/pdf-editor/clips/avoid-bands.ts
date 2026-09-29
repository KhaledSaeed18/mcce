import type { Box } from "../types";

/** A strip of the pages, left to right, that cards stay out of. */
export interface Band {
  left: number;
  right: number;
}

/** Moves a card sideways out of any band it overlaps, to whichever side is
 * nearer and still has room for it. */
export function avoidBands(
  box: Box,
  bands: readonly Band[],
  areaWidth: number
): Box {
  let { x } = box;
  for (const band of bands) {
    const overlaps = x < band.right && x + box.width > band.left;
    if (!overlaps) {
      continue;
    }
    const toRight = band.right;
    const toLeft = band.left - box.width;
    const fitsRight = toRight + box.width <= areaWidth;
    const fitsLeft = toLeft >= 0;
    const isRightNearer = Math.abs(toRight - x) <= Math.abs(x - toLeft);
    if (fitsRight && (isRightNearer || !fitsLeft)) {
      x = toRight;
    } else if (fitsLeft) {
      x = toLeft;
    }
  }
  return { ...box, x };
}
