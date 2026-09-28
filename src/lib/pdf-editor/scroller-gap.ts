import { PAGE_INDEX_ATTRIBUTE } from "@/config/pdf-editor";
import { fromPagePosition, toPagePosition } from "./page-position";
import { readScrollAnchor, scrollToPageSpot } from "./scroll-anchor";

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

/** Moves the target to the same page, and the same spot on it, as the
 * source. False when there is nothing to measure or move. */
export function alignScroller(
  source: HTMLElement | null,
  target: HTMLElement | null
): boolean {
  const anchor = source ? readScrollAnchor(source) : null;
  if (!(anchor && target)) {
    return false;
  }
  const count = target.querySelectorAll(`[${PAGE_INDEX_ATTRIBUTE}]`).length;
  const spot = fromPagePosition(toPagePosition(anchor), count);
  return scrollToPageSpot(target, spot.index, spot.fraction);
}
