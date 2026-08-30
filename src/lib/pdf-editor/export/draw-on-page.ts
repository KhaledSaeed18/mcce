import type { PDFFont, PDFPage } from "pdf-lib";
import { layoutText } from "../text-layout";
import type {
  Annotation,
  PenAnnotation,
  ShapeAnnotation,
  TextAnnotation,
} from "../types";
import { hexToRgb } from "./hex-to-rgb";

/** Page space is top-left origin; PDF user space is bottom-left. */
function flipY(page: PDFPage, y: number): number {
  return page.getHeight() - y;
}

function drawPen(page: PDFPage, annotation: PenAnnotation): void {
  const color = hexToRgb(annotation.color);
  for (let i = 1; i < annotation.points.length; i += 1) {
    const from = annotation.points[i - 1];
    const to = annotation.points[i];
    page.drawLine({
      color,
      end: { x: to.x, y: flipY(page, to.y) },
      lineCap: 1,
      start: { x: from.x, y: flipY(page, from.y) },
      thickness: annotation.width,
    });
  }
}

function drawShape(page: PDFPage, annotation: ShapeAnnotation): void {
  const borderColor = hexToRgb(annotation.color);
  if (annotation.type === "rect") {
    page.drawRectangle({
      borderColor,
      borderWidth: annotation.strokeWidth,
      height: annotation.height,
      width: annotation.width,
      x: annotation.x,
      y: flipY(page, annotation.y + annotation.height),
    });
    return;
  }
  page.drawEllipse({
    borderColor,
    borderWidth: annotation.strokeWidth,
    x: annotation.x + annotation.width / 2,
    xScale: annotation.width / 2,
    y: flipY(page, annotation.y + annotation.height / 2),
    yScale: annotation.height / 2,
  });
}

function drawText(
  page: PDFPage,
  annotation: TextAnnotation,
  font: PDFFont
): void {
  const { lineHeight, lines } = layoutText(annotation);
  const color = hexToRgb(annotation.color);
  for (const [index, line] of lines.entries()) {
    page.drawText(line, {
      color,
      font,
      size: annotation.fontSize,
      x: annotation.x,
      y: flipY(page, annotation.y + index * lineHeight),
    });
  }
}

export function drawAnnotationOnPage(
  page: PDFPage,
  annotation: Annotation,
  font: PDFFont
): void {
  if (annotation.type === "pen") {
    drawPen(page, annotation);
    return;
  }
  if (annotation.type === "text") {
    drawText(page, annotation, font);
    return;
  }
  drawShape(page, annotation);
}
