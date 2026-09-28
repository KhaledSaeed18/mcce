import type { ScrollAnchor } from "./types";

/** A place in a file counted in pages from its start, so page 3 a quarter
 * of the way down is 2.25. Pages of any size count as one. */
export function toPagePosition(
  anchor: Pick<ScrollAnchor, "fraction" | "index">
): number {
  return anchor.index + anchor.fraction;
}

/** The page and the spot on it a position falls on, kept inside the file. */
export function fromPagePosition(
  position: number,
  pageCount: number
): Pick<ScrollAnchor, "fraction" | "index"> {
  if (position <= 0 || pageCount === 0) {
    return { fraction: 0, index: 0 };
  }
  if (position >= pageCount) {
    return { fraction: 1, index: pageCount - 1 };
  }
  const index = Math.floor(position);
  return { fraction: position - index, index };
}
