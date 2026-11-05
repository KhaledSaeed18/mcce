import { MAX_FONT_SIZE, MIN_FONT_SIZE, PAGE_INSET } from "@/config/pdf-editor";
import { getFieldBox } from "./text-box";
import type { FrameCorner, PageSize, TextGeometry } from "./types";

/** Half steps keep a drag smooth without leaving long decimals in the size. */
function roundFontSize(fontSize: number): number {
  return Math.round(fontSize * 2) / 2;
}

/**
 * Dragging a corner: the text grows or shrinks as a whole, lines breaking where
 * they did, with the opposite corner held still. It stops at the page's edge.
 */
export function scaleTextBox<T extends TextGeometry>(
  text: T,
  corner: FrameCorner,
  dx: number,
  dy: number,
  size: PageSize
): T {
  const box = getFieldBox(text);
  const isRight = corner.endsWith("right");
  const isBottom = corner.startsWith("bottom");
  const room = {
    height: isBottom
      ? size.height - PAGE_INSET - box.y
      : box.y + box.height - PAGE_INSET,
    width: isRight
      ? size.width - PAGE_INSET - box.x
      : box.x + box.width - PAGE_INSET,
  };
  const wanted = Math.max(
    (box.width + (isRight ? dx : -dx)) / box.width,
    (box.height + (isBottom ? dy : -dy)) / box.height
  );
  const ratio = Math.min(
    wanted,
    room.width / box.width,
    room.height / box.height
  );
  const fontSize = Math.min(
    Math.max(roundFontSize(text.fontSize * ratio), MIN_FONT_SIZE),
    MAX_FONT_SIZE
  );
  const applied = fontSize / text.fontSize;
  const next: T = {
    ...text,
    fontSize,
    width: text.width === undefined ? undefined : text.width * applied,
  };
  const scaled = getFieldBox(next);
  const left = isRight ? box.x : box.x + box.width - scaled.width;
  const top = isBottom ? box.y : box.y + box.height - scaled.height;

  return { ...next, x: left, y: top + next.y - scaled.y };
}
