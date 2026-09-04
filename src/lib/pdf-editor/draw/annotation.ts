import type { Annotation } from "../types";
import { drawPen, drawShape } from "./shapes";
import { drawText } from "./text";

/** Draws in page space; the caller scales and turns the context to suit the page. */
export function drawAnnotation(
  ctx: CanvasRenderingContext2D,
  annotation: Annotation
): void {
  if (annotation.type === "pen") {
    drawPen(ctx, annotation);
    return;
  }
  if (annotation.type === "text") {
    drawText(ctx, annotation);
    return;
  }
  drawShape(ctx, annotation);
}
