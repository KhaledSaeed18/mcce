import {
  concatTransformationMatrix,
  type PDFFont,
  type PDFPage,
  popGraphicsState,
  pushGraphicsState,
} from "pdf-lib";
import { getRenderedSize } from "../rotation";
import type { Annotation } from "../types";
import { getContentMatrix } from "./content-space";
import { drawPen, drawShape } from "./draw-shapes";
import { drawText } from "./draw-text";

/**
 * Draws one piece of markup in the space it was made in, which is the page as a
 * reader sees it. The turn the page already carried is undone for the length of
 * the drawing so that the coordinates land where they were put.
 */
export function drawAnnotationOnPage(
  page: PDFPage,
  annotation: Annotation,
  font: PDFFont | null,
  rotation: number
): void {
  const content = { height: page.getHeight(), width: page.getWidth() };
  const { height } = getRenderedSize(content, rotation);

  page.pushOperators(
    pushGraphicsState(),
    concatTransformationMatrix(...getContentMatrix(content, rotation))
  );
  if (annotation.type === "pen") {
    drawPen(page, annotation, height);
  } else if (annotation.type === "text") {
    drawText(page, annotation, font, height);
  } else {
    drawShape(page, annotation, height);
  }
  page.pushOperators(popGraphicsState());
}
