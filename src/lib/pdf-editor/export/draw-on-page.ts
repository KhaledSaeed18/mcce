import type { PDFFont, PDFPage } from "pdf-lib";
import type { Annotation } from "../types";
import { drawPen, drawShape } from "./draw-shapes";
import { drawText } from "./draw-text";

/** Draws one piece of markup in the space it was made in, which counts downwards. */
export function drawAnnotationOnPage(
  page: PDFPage,
  annotation: Annotation,
  font: PDFFont | null
): void {
  const height = page.getHeight();

  if (annotation.type === "pen") {
    drawPen(page, annotation, height);
    return;
  }
  if (annotation.type === "text") {
    drawText(page, annotation, font, height);
    return;
  }
  drawShape(page, annotation, height);
}
