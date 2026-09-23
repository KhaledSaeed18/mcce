import { PAGE_INDEX_ATTRIBUTE } from "@/config/pdf-editor";
import type { Box } from "./types";

const TEXT_RUN_SELECTOR = ".textLayer span:not(.markedContent)";

/** The part of the selection inside one text run. Measuring runs one at a
 * time keeps a selection that crosses pages from measuring the whole of each
 * page element it passes over. */
function clipToRun(selection: Range, text: Text): Range {
  const run = document.createRange();
  run.selectNodeContents(text);
  if (selection.compareBoundaryPoints(Range.START_TO_START, run) > 0) {
    run.setStart(selection.startContainer, selection.startOffset);
  }
  if (selection.compareBoundaryPoints(Range.END_TO_END, run) < 0) {
    run.setEnd(selection.endContainer, selection.endOffset);
  }
  return run;
}

/** The selected text's boxes on each page, in pixels from that page's corner,
 * keyed by the page's position. */
export function collectSelectionBoxes(
  selection: Range,
  root: HTMLElement
): Map<number, Box[]> {
  const byPage = new Map<number, Box[]>();
  for (const page of root.querySelectorAll<HTMLElement>(
    `[${PAGE_INDEX_ATTRIBUTE}]`
  )) {
    const origin = page.getBoundingClientRect();
    const boxes: Box[] = [];
    for (const run of page.querySelectorAll(TEXT_RUN_SELECTOR)) {
      const text = run.firstChild;
      if (!(text instanceof Text && selection.intersectsNode(text))) {
        continue;
      }
      for (const rect of clipToRun(selection, text).getClientRects()) {
        if (rect.width > 0 && rect.height > 0) {
          boxes.push({
            height: rect.height,
            width: rect.width,
            x: rect.left - origin.left,
            y: rect.top - origin.top,
          });
        }
      }
    }
    if (boxes.length) {
      byPage.set(Number(page.getAttribute(PAGE_INDEX_ATTRIBUTE)), boxes);
    }
  }
  return byPage;
}
