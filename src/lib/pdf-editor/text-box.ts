import {
  EMPTY_TEXT_BOX_WIDTH,
  MIN_TEXT_BOX_WIDTH,
  PAGE_INSET,
} from "@/config/pdf-editor";
import { getTextBox } from "./text-layout";
import type { Box, PageSize, TextBoxEdge, TextGeometry } from "./types";

/** An empty or very short box still needs somewhere to put a caret. */
export function getFieldWidth(text: TextGeometry): number {
  return text.width ?? Math.max(getTextBox(text).width, EMPTY_TEXT_BOX_WIDTH);
}

/** The box the open field covers, which is wider than the text it holds so far. */
export function getFieldBox(text: TextGeometry): Box {
  return { ...getTextBox(text), width: getFieldWidth(text) };
}

/**
 * A box with no width of its own grows with its text. Once that growth would
 * run off the page it takes the page's width and starts wrapping instead.
 */
export function withBoundedWidth<T extends TextGeometry>(
  text: T,
  size: PageSize
): T {
  const available = size.width - PAGE_INSET * 2;
  if (getFieldWidth(text) <= available) {
    return text;
  }
  return { ...text, width: available };
}

/** Dragging a side edge: the opposite edge stays put and the text rewraps. */
export function resizeTextBox<T extends TextGeometry>(
  text: T,
  edge: TextBoxEdge,
  dx: number,
  size: PageSize
): T {
  const current = text.width ?? getTextBox(text).width;
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
