import type { PDFPage } from "pdf-lib";
import { getArrowHead } from "../arrow-head";
import type {
  ArrowAnnotation,
  PenAnnotation,
  Point,
  ShapeAnnotation,
} from "../types";
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

export function drawArrow(
  page: PDFPage,
  annotation: ArrowAnnotation,
  height: number
): void {
  const color = hexToRgb(annotation.color);
  const toContent = (point: Point) => ({
    x: point.x,
    y: flipY(height, point.y),
  });
  const tip = toContent(annotation.to);
  const [left, right] = getArrowHead(annotation);
  for (const start of [annotation.from, left, right]) {
    page.drawLine({
      color,
      end: tip,
      lineCap: 1,
      start: toContent(start),
      thickness: annotation.strokeWidth,
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
