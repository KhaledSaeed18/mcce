import { TEXT_LINE_OVERLAP } from "@/config/pdf-editor";
import type { Box } from "./types";

function sharesLine(a: Box, b: Box): boolean {
  const overlap = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y);
  return overlap >= Math.min(a.height, b.height) * TEXT_LINE_OVERLAP;
}

function union(a: Box, b: Box): Box {
  const x = Math.min(a.x, b.x);
  const y = Math.min(a.y, b.y);
  return {
    height: Math.max(a.y + a.height, b.y + b.height) - y,
    width: Math.max(a.x + a.width, b.x + b.width) - x,
    x,
    y,
  };
}

/** A selection reports a box per run of text, often several per line. They
 * are joined into one box per line, so a mark over a line is one even band. */
export function mergeLineBoxes(boxes: readonly Box[]): Box[] {
  const lines: Box[] = [];
  const byTop = [...boxes].sort((a, b) => a.y - b.y || a.x - b.x);
  for (const box of byTop) {
    const index = lines.findIndex((line) => sharesLine(line, box));
    if (index === -1) {
      lines.push(box);
    } else {
      lines[index] = union(lines[index], box);
    }
  }
  return lines;
}
