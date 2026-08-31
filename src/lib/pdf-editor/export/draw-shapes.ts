import type { PDFPage } from "pdf-lib";
import type { PenAnnotation, ShapeAnnotation } from "../types";
import { flipY } from "./content-space";
import { hexToRgb } from "./hex-to-rgb";

export function drawPen(
  page: PDFPage,
  annotation: PenAnnotation,
  height: number
): void {
  const color = hexToRgb(annotation.color);
  for (let i = 1; i < annotation.points.length; i += 1) {
    const from = annotation.points[i - 1];
    const to = annotation.points[i];
    page.drawLine({
      color,
      end: { x: to.x, y: flipY(height, to.y) },
      lineCap: 1,
      start: { x: from.x, y: flipY(height, from.y) },
      thickness: annotation.width,
    });
  }
}

export function drawShape(
  page: PDFPage,
  annotation: ShapeAnnotation,
  height: number
): void {
  const borderColor = hexToRgb(annotation.color);
  if (annotation.type === "rect") {
    page.drawRectangle({
      borderColor,
      borderWidth: annotation.strokeWidth,
      height: annotation.height,
      width: annotation.width,
      x: annotation.x,
      y: flipY(height, annotation.y + annotation.height),
    });
    return;
  }
  page.drawEllipse({
    borderColor,
    borderWidth: annotation.strokeWidth,
    x: annotation.x + annotation.width / 2,
    xScale: annotation.width / 2,
    y: flipY(height, annotation.y + annotation.height / 2),
    yScale: annotation.height / 2,
  });
}
