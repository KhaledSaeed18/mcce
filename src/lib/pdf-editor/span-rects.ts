import type { Box, TextSpan } from "./types";

/** A position inside a text item, as a point a DOM range can start or end at.
 * An item with no text is not on the page, so it has nowhere to point. */
function toRangePoint(
  textDivs: readonly HTMLElement[],
  item: number,
  offset: number
): [Node, number] | null {
  const node = textDivs[item]?.firstChild;
  return node ? [node, Math.min(offset, node.textContent?.length ?? 0)] : null;
}

/** Where a run of text sits on screen, measured from the page's own corner. A
 * run over several lines comes back as one box per line piece. */
export function measureSpan(
  textDivs: readonly HTMLElement[],
  span: TextSpan,
  origin: DOMRect
): Box[] {
  const start = toRangePoint(textDivs, span.start.item, span.start.offset);
  const end = toRangePoint(textDivs, span.end.item, span.end.offset);
  if (!(start && end)) {
    return [];
  }
  const range = document.createRange();
  range.setStart(...start);
  range.setEnd(...end);
  return Array.from(range.getClientRects())
    .filter((rect) => rect.width > 0 && rect.height > 0)
    .map((rect) => ({
      height: rect.height,
      width: rect.width,
      x: rect.left - origin.left,
      y: rect.top - origin.top,
    }));
}
