import {
  TEXT_ALIGN_SHARE,
  TEXT_ASCENT_RATIO,
  TEXT_DESCENT_RATIO,
  TEXT_FILL_PADDING_RATIO,
  TEXT_LINE_HEIGHT_RATIO,
} from "@/config/pdf-editor";
import { measureTextWidth } from "./text-metrics";
import { wrapText } from "./text-wrap";
import type { Box, TextFormat, TextGeometry } from "./types";

export interface TextLayout {
  box: Box;
  lineHeight: number;
  lines: string[];
}

/**
 * The lines the text breaks into and the box they fill. The box covers whole
 * line boxes rather than the glyphs alone, so the field that edits the text can
 * sit exactly on it.
 */
export function layoutText(text: TextGeometry): TextLayout {
  const lines = wrapText(text.text, text.fontSize, text.width, text);
  const lineHeight = text.fontSize * TEXT_LINE_HEIGHT_RATIO;
  const leading =
    lineHeight - text.fontSize * (TEXT_ASCENT_RATIO + TEXT_DESCENT_RATIO);

  return {
    box: {
      height: lines.length * lineHeight,
      width:
        text.width ??
        Math.max(
          ...lines.map((line) => measureTextWidth(line, text.fontSize, text))
        ),
      x: text.x,
      y: text.y - text.fontSize * TEXT_ASCENT_RATIO - leading / 2,
    },
    lineHeight,
    lines,
  };
}

/** The rectangle the text occupies, which is what keeps it on the page. */
export function getTextBox(text: TextGeometry): Box {
  return layoutText(text).box;
}

/** Where a line of this width starts inside its box. */
export function getLineStart(
  lineWidth: number,
  box: Box,
  format: TextFormat
): number {
  const share = TEXT_ALIGN_SHARE[format.align ?? "left"];
  return box.x + (box.width - lineWidth) * share;
}

/** What a text fill covers, a little past the text on every side. */
export function getFillBox(box: Box, fontSize: number): Box {
  const padding = fontSize * TEXT_FILL_PADDING_RATIO;
  return {
    height: box.height,
    width: box.width + padding * 2,
    x: box.x - padding,
    y: box.y,
  };
}
