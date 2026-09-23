import {
  LineCapStyle,
  LineJoinStyle,
  type PDFPage,
  setLineJoin,
} from "pdf-lib";
import { HIGHLIGHT_OPACITY } from "@/config/pdf-editor";
import { getArrowHead } from "../arrow-head";
import type {
  ArrowAnnotation,
  HighlightAnnotation,
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

/** Written as one path rather than a line per segment: separate see-through
 * segments would darken at every joint where they overlap. */
export function drawHighlight(
  page: PDFPage,
  annotation: HighlightAnnotation,
  height: number
): void {
  const [first, ...rest] = annotation.points;
  if (!first) {
    return;
  }
  const path = [
    `M ${first.x} ${first.y}`,
    ...rest.map((point) => `L ${point.x} ${point.y}`),
  ].join(" ");
  // The drawing call sets the cap itself but leaves the join to the state around it.
  page.pushOperators(setLineJoin(LineJoinStyle.Round));
  page.drawSvgPath(path, {
    borderColor: hexToRgb(annotation.color),
    borderLineCap: LineCapStyle.Round,
    borderOpacity: HIGHLIGHT_OPACITY,
    borderWidth: annotation.width,
    x: 0,
    // An SVG path runs downward from its origin, the same way markup is stored,
    // so anchoring it at the top of the page does the flip the other calls do.
    y: height,
  });
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
