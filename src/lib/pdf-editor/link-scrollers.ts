import { PAGE_INDEX_ATTRIBUTE } from "@/config/pdf-editor";
import { fromPagePosition, toPagePosition } from "./page-position";
import { readScrollAnchor, scrollToPageSpot } from "./scroll-anchor";

/** Keeps two page scrollers the same distance apart in pages: the second
 * starts `gap` pages on from the first, and scrolling either moves the other.
 * Returns what undoes it. */
export function linkScrollers(
  first: HTMLElement,
  second: HTMLElement,
  gap: number
): () => void {
  // Where each was last moved to by the other, so that move is not followed back.
  const placed = new Map<HTMLElement, number>();
  let frame = 0;

  const follow = (source: HTMLElement, target: HTMLElement, shift: number) => {
    const anchor = readScrollAnchor(source);
    if (!anchor) {
      return;
    }
    const pageCount = target.querySelectorAll(
      `[${PAGE_INDEX_ATTRIBUTE}]`
    ).length;
    const spot = fromPagePosition(toPagePosition(anchor) + shift, pageCount);
    if (scrollToPageSpot(target, spot.index, spot.fraction)) {
      placed.set(target, target.scrollTop);
    }
  };

  const listen =
    (source: HTMLElement, target: HTMLElement, shift: number) => () => {
      const mark = placed.get(source);
      placed.delete(source);
      if (mark !== undefined && Math.abs(source.scrollTop - mark) < 1) {
        return;
      }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => follow(source, target, shift));
    };

  const handleFirst = listen(first, second, gap);
  const handleSecond = listen(second, first, -gap);
  first.addEventListener("scroll", handleFirst, { passive: true });
  second.addEventListener("scroll", handleSecond, { passive: true });
  // A lock measured where the two are is already met, but one brought back
  // with a study set finds each file where it was last left.
  follow(first, second, gap);
  return () => {
    cancelAnimationFrame(frame);
    first.removeEventListener("scroll", handleFirst);
    second.removeEventListener("scroll", handleSecond);
  };
}
