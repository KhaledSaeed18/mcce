import { PAGE_INDEX_ATTRIBUTE } from "@/config/pdf-editor";
import type { ScrollAnchor } from "./types";

function offsetWithin(scroller: HTMLElement, element: HTMLElement): number {
  return (
    element.getBoundingClientRect().top -
    scroller.getBoundingClientRect().top +
    scroller.scrollTop
  );
}

export function readScrollAnchor(scroller: HTMLElement): ScrollAnchor | null {
  const middle = scroller.scrollTop + scroller.clientHeight / 2;
  const pages = scroller.querySelectorAll<HTMLElement>(
    `[${PAGE_INDEX_ATTRIBUTE}]`
  );
  for (const page of pages) {
    const top = offsetWithin(scroller, page);
    if (top + page.offsetHeight >= middle) {
      return {
        centerX:
          (scroller.scrollLeft + scroller.clientWidth / 2) /
          scroller.scrollWidth,
        fraction: (middle - top) / page.offsetHeight,
        index: Number(page.getAttribute(PAGE_INDEX_ATTRIBUTE)),
      };
    }
  }
  return null;
}

export function restoreScrollAnchor(
  scroller: HTMLElement,
  anchor: ScrollAnchor
): void {
  const page = scroller.querySelector<HTMLElement>(
    `[${PAGE_INDEX_ATTRIBUTE}="${anchor.index}"]`
  );
  if (!page) {
    return;
  }
  const top = offsetWithin(scroller, page);
  scroller.scrollTop =
    top + anchor.fraction * page.offsetHeight - scroller.clientHeight / 2;
  scroller.scrollLeft =
    anchor.centerX * scroller.scrollWidth - scroller.clientWidth / 2;
}
