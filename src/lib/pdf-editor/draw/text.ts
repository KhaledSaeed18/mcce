import {
  TEXT_HIGHLIGHT_ALPHA,
  TEXT_HIGHLIGHT_PADDING,
  TEXT_HIGHLIGHT_WIDTH,
  TEXT_UNDERLINE_OFFSET_RATIO,
  TEXT_UNDERLINE_WIDTH_RATIO,
} from "@/config/pdf-editor";
import { getCanvasFont } from "../text-font";
import {
  getFillBox,
  getLineStart,
  getTextBox,
  layoutText,
} from "../text-layout";
import type { TextAnnotation } from "../types";

export function drawText(
  ctx: CanvasRenderingContext2D,
  annotation: TextAnnotation
): void {
  const { box, lineHeight, lines } = layoutText(annotation);
  const { background, color, fontSize, underline, y } = annotation;
  if (background) {
    const fill = getFillBox(box, fontSize);
    ctx.fillStyle = background;
    ctx.fillRect(fill.x, fill.y, fill.width, fill.height);
  }
  ctx.fillStyle = color;
  ctx.font = getCanvasFont(annotation, fontSize);
  ctx.textBaseline = "alphabetic";
  for (const [index, line] of lines.entries()) {
    const baseline = y + index * lineHeight;
    const { width } = ctx.measureText(line);
    const start = getLineStart(width, box, annotation);
    ctx.fillText(line, start, baseline);
    if (underline && line) {
      ctx.fillRect(
        start,
        baseline + fontSize * TEXT_UNDERLINE_OFFSET_RATIO,
        width,
        fontSize * TEXT_UNDERLINE_WIDTH_RATIO
      );
    }
  }
}

/** Outlines the text under the pointer, so it reads as something to click or drag. */
export function drawTextHighlight(
  ctx: CanvasRenderingContext2D,
  annotation: TextAnnotation
): void {
  const box = getTextBox(annotation);
  ctx.save();
  ctx.strokeStyle = annotation.color;
  ctx.globalAlpha = TEXT_HIGHLIGHT_ALPHA;
  ctx.lineWidth = TEXT_HIGHLIGHT_WIDTH;
  ctx.strokeRect(
    box.x - TEXT_HIGHLIGHT_PADDING,
    box.y - TEXT_HIGHLIGHT_PADDING,
    box.width + TEXT_HIGHLIGHT_PADDING * 2,
    box.height + TEXT_HIGHLIGHT_PADDING * 2
  );
  ctx.restore();
}
