import { getLineStart, layoutText } from "./text-layout";
import { measureTextWidth } from "./text-metrics";
import type { Point, TextGeometry } from "./types";

/** Where in the text a wrapped line begins, counting the break each line used up. */
function findLineOffset(text: string, lines: string[], index: number): number {
  let offset = 0;
  for (const line of lines.slice(0, index)) {
    offset += line.length;
    const next = text[offset];
    if (next === "\n" || next === " ") {
      offset += 1;
    }
  }
  return offset;
}

/** The place in the text nearest a point on the page, for putting the caret
 * where the reader clicked. */
export function getCaretOffset(text: TextGeometry, point: Point): number {
  const { box, lineHeight, lines } = layoutText(text);
  const row = Math.floor((point.y - box.y) / lineHeight);
  const index = Math.min(Math.max(row, 0), lines.length - 1);
  const line = lines[index];
  const offset = findLineOffset(text.text, lines, index);
  const width = measureTextWidth(line, text.fontSize, text);
  const reach = point.x - getLineStart(width, box, text);

  let before = 0;
  for (let count = 1; count <= line.length; count += 1) {
    const after = measureTextWidth(line.slice(0, count), text.fontSize, text);
    if (reach < (before + after) / 2) {
      return offset + count - 1;
    }
    before = after;
  }
  return offset + line.length;
}
