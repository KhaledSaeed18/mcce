import {
  MIN_EDGE_WRAP_WIDTH,
  MIN_TEXT_BOX_WIDTH,
  PAGE_INSET,
  TEXT_PLACEHOLDER,
} from "@/config/pdf-editor";
import { clampBox } from "./bounds";
import { getTextBox } from "./text-layout";
import { measureTextWidth } from "./text-metrics";
import type { Box, PageSize, TextBoxEdge, TextGeometry } from "./types";

const POSITION_TOLERANCE = 0.001;

type WrappableText = TextGeometry & { isEdgeWrapped?: boolean };

/** An empty box is as wide as its placeholder; otherwise it hugs its text. */
export function getFieldWidth(text: TextGeometry): number {
  if (text.width !== undefined) {
    return text.width;
  }
  return text.text
    ? getTextBox(text).width
    : measureTextWidth(TEXT_PLACEHOLDER, text.fontSize, text);
}

export function getFieldBox(text: TextGeometry): Box {
  return { ...getTextBox(text), width: getFieldWidth(text) };
}

/**
 * A box with no width of its own grows with its text. Reaching the page's edge
 * makes it wrap there, and it lets go again once the text fits. A width the
 * reader set is theirs and is left alone.
 */
function wrapAtPageEdge<T extends WrappableText>(text: T, size: PageSize): T {
  if (text.width !== undefined && !text.isEdgeWrapped) {
    return text;
  }
  const available = Math.max(
    size.width - PAGE_INSET - text.x,
    Math.min(MIN_EDGE_WRAP_WIDTH, size.width - PAGE_INSET * 2)
  );
  const natural = getFieldWidth({ ...text, width: undefined });
  const width = natural > available ? available : undefined;
  if (width === text.width) {
    return text;
  }
  return { ...text, isEdgeWrapped: width !== undefined, width };
}

/** Hands back the very same object when the text already fits, so a caller can
 * tell nothing changed. The offsets are compared loosely because a box is worked
 * out from its anchor and back, which rarely lands on the same float, and a
 * caller that fits text on every change would chase that difference forever. */
export function keepTextOnPage<T extends WrappableText>(
  text: T,
  size: PageSize
): T {
  const wrapped = wrapAtPageEdge(text, size);
  const box = getFieldBox(wrapped);
  const moved = clampBox(box, size);
  const dx = moved.x - box.x;
  const dy = moved.y - box.y;
  if (Math.abs(dx) < POSITION_TOLERANCE && Math.abs(dy) < POSITION_TOLERANCE) {
    return wrapped;
  }
  return { ...wrapped, x: wrapped.x + dx, y: wrapped.y + dy };
}

/** Dragging a side edge: the opposite edge stays put and the text rewraps. */
export function resizeTextBox<T extends TextGeometry>(
  text: T,
  edge: TextBoxEdge,
  dx: number,
  size: PageSize
): T {
  const current = getFieldWidth(text);
  const right = text.x + current;
  const limit =
    edge === "right" ? size.width - PAGE_INSET - text.x : right - PAGE_INSET;
  const width = Math.min(
    Math.max(
      edge === "right" ? current + dx : current - dx,
      MIN_TEXT_BOX_WIDTH
    ),
    Math.max(limit, MIN_TEXT_BOX_WIDTH)
  );

  return { ...text, width, x: edge === "right" ? text.x : right - width };
}
