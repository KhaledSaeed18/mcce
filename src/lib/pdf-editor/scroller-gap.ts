import { toPagePosition } from "./page-position";
import { readScrollAnchor } from "./scroll-anchor";

/** How many pages, and part pages, the second scroller is ahead of the
 * first, or null while either has no pages to measure. */
export function measureScrollerGap(
  first: HTMLElement | null,
  second: HTMLElement | null
): number | null {
  const anchorA = first ? readScrollAnchor(first) : null;
  const anchorB = second ? readScrollAnchor(second) : null;
  return anchorA && anchorB
    ? toPagePosition(anchorB) - toPagePosition(anchorA)
    : null;
}
