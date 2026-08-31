import {
  ANNOTATION_FONT_FAMILY,
  TEXT_HIGHLIGHT_ALPHA,
  TEXT_HIGHLIGHT_DASH,
  TEXT_HIGHLIGHT_PADDING,
  TEXT_HIGHLIGHT_WIDTH,
} from "@/config/pdf-editor";
import { getTextBox, layoutText } from "../text-layout";
import type { TextAnnotation } from "../types";

export function drawText(
  ctx: CanvasRenderingContext2D,
  annotation: TextAnnotation
): void {
  const { lineHeight, lines } = layoutText(annotation);
  ctx.fillStyle = annotation.color;
  ctx.font = `${annotation.fontSize}px ${ANNOTATION_FONT_FAMILY}`;
  ctx.textBaseline = "alphabetic";
  for (const [index, line] of lines.entries()) {
    ctx.fillText(line, annotation.x, annotation.y + index * lineHeight);
  }
}

/** Outlines the text under the pointer, so it reads as something that can be moved. */
export function drawTextHighlight(
  ctx: CanvasRenderingContext2D,
  annotation: TextAnnotation
): void {
  const box = getTextBox(annotation);
  ctx.save();
  ctx.strokeStyle = annotation.color;
  ctx.globalAlpha = TEXT_HIGHLIGHT_ALPHA;
  ctx.lineWidth = TEXT_HIGHLIGHT_WIDTH;
  ctx.setLineDash(TEXT_HIGHLIGHT_DASH);
  ctx.strokeRect(
    box.x - TEXT_HIGHLIGHT_PADDING,
    box.y - TEXT_HIGHLIGHT_PADDING,
    box.width + TEXT_HIGHLIGHT_PADDING * 2,
    box.height + TEXT_HIGHLIGHT_PADDING * 2
  );
  ctx.restore();
}
