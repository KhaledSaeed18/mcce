import { TEXT_ASCENT_RATIO, TEXT_DESCENT_RATIO } from "@/config/pdf-editor";
import { getTextBox } from "./text-layout";
import type { Box, Point, TextAnnotation, TextDraft, TextStyle } from "./types";

/** A box that grows with its text, its first line centered on the click so the
 * caret appears right under the pointer. */
export function buildDraft(
  point: Point,
  pageId: string,
  style: TextStyle
): TextDraft {
  const center = (TEXT_ASCENT_RATIO - TEXT_DESCENT_RATIO) / 2;
  return {
    ...style,
    pageId,
    text: "",
    x: point.x,
    y: point.y + style.fontSize * center,
  };
}

/** A box drawn on the page, which wraps at the width it was drawn. */
export function buildBoxDraft(
  box: Box,
  pageId: string,
  style: TextStyle
): TextDraft {
  const draft: TextDraft = {
    ...style,
    pageId,
    text: "",
    width: box.width,
    x: box.x,
    y: 0,
  };
  return { ...draft, y: box.y - getTextBox(draft).y };
}

/** A field over text already on the page, which keeps the style it was written in. */
export function toDraft(annotation: TextAnnotation, caret?: number): TextDraft {
  const { id, type: _type, ...rest } = annotation;
  return { ...rest, caret, id };
}
