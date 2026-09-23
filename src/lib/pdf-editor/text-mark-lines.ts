import {
  TEXT_MARK_LINE_RATIO,
  TEXT_MARK_MIN_LINE,
  TEXT_MARK_STRIKE_AT,
  TEXT_MARK_UNDERLINE_AT,
} from "@/config/pdf-editor";
import type { Box, Point, TextMarkStyle } from "./types";

export interface MarkLine {
  end: Point;
  start: Point;
  thickness: number;
}

/** The line an underline or a strike draws across one line of text, shared by
 * the canvas and the export so both put it in the same place. */
export function getMarkLine(
  box: Box,
  style: Exclude<TextMarkStyle, "highlight">
): MarkLine {
  const at =
    style === "underline" ? TEXT_MARK_UNDERLINE_AT : TEXT_MARK_STRIKE_AT;
  const y = box.y + box.height * at;
  return {
    end: { x: box.x + box.width, y },
    start: { x: box.x, y },
    thickness: Math.max(TEXT_MARK_MIN_LINE, box.height * TEXT_MARK_LINE_RATIO),
  };
}
