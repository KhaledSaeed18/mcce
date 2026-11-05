import {
  TEXT_ASCENT_RATIO,
  TEXT_LINE_HEIGHT_RATIO,
  TEXT_WIDTH_FALLBACK_RATIO,
} from "@/config/pdf-editor";
import { getCanvasFont } from "./text-font";
import type { TextFormat } from "./types";

const PLAIN: TextFormat = {};

let measureContext: CanvasRenderingContext2D | null = null;

/** One offscreen context for every measurement: wrapping asks for many per keystroke. */
function getMeasureContext(): CanvasRenderingContext2D | null {
  if (measureContext) {
    return measureContext;
  }
  if (typeof document === "undefined") {
    return null;
  }
  measureContext = document.createElement("canvas").getContext("2d");
  return measureContext;
}

export function measureTextWidth(
  text: string,
  fontSize: number,
  format: TextFormat = PLAIN
): number {
  const ctx = getMeasureContext();
  if (!ctx) {
    return text.length * fontSize * TEXT_WIDTH_FALLBACK_RATIO;
  }
  ctx.font = getCanvasFont(format, fontSize);
  return ctx.measureText(text).width;
}

/**
 * How far a text field must shift for its first baseline to land on the canvas's.
 * A browser centers each font's own ascent and descent in the line, while the
 * canvas draws on a fixed baseline, so without this text jumps as a box opens.
 */
export function getFieldBaselineShift(
  format: TextFormat,
  fontSize: number
): number {
  const ctx = getMeasureContext();
  if (!ctx) {
    return 0;
  }
  ctx.font = getCanvasFont(format, fontSize);
  const { fontBoundingBoxAscent: ascent, fontBoundingBoxDescent: descent } =
    ctx.measureText("x");
  const lineHeight = fontSize * TEXT_LINE_HEIGHT_RATIO;
  const fieldBaseline = (lineHeight - ascent - descent) / 2 + ascent;
  const canvasBaseline =
    (lineHeight - fontSize) / 2 + fontSize * TEXT_ASCENT_RATIO;
  return canvasBaseline - fieldBaseline;
}
