import type { Annotation } from "../types";
import { drawCover } from "./cover";
import { drawNote } from "./note";
import {
  drawArrow,
  drawHighlight,
  drawPen,
  drawShape,
  drawTextMark,
} from "./shapes";
import { drawText } from "./text";

/** Draws in page space; the caller scales and turns the context to suit the page. */
export function drawAnnotation(
  ctx: CanvasRenderingContext2D,
  annotation: Annotation,
  isRevealed = false
): void {
  if (annotation.type === "note") {
    drawNote(ctx, annotation);
    return;
  }
  if (annotation.type === "cover") {
    drawCover(ctx, annotation, isRevealed);
    return;
  }
  if (annotation.type === "pen") {
    drawPen(ctx, annotation);
    return;
  }
  if (annotation.type === "text") {
    drawText(ctx, annotation);
    return;
  }
  if (annotation.type === "highlight") {
    drawHighlight(ctx, annotation);
    return;
  }
  if (annotation.type === "mark") {
    drawTextMark(ctx, annotation);
    return;
  }
  if (annotation.type === "arrow") {
    drawArrow(ctx, annotation);
    return;
  }
  drawShape(ctx, annotation);
}
