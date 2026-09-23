import type { Annotation, Box, Point } from "./types";

/** Where a point lands when its frame is stretched from one box to another. A
 * frame with no width or height has no scale along that axis, so points on it
 * are carried with the frame's edge instead. */
function mapPoint(point: Point, from: Box, to: Box): Point {
  const scaleX = from.width === 0 ? 1 : to.width / from.width;
  const scaleY = from.height === 0 ? 1 : to.height / from.height;
  return {
    x: to.x + (point.x - from.x) * scaleX,
    y: to.y + (point.y - from.y) * scaleY,
  };
}

/** Markup that can be stretched by its frame. Text rewraps by width instead,
 * and a text mark follows the lines of text it was laid on. */
export function isResizable(annotation: Annotation): boolean {
  return annotation.type !== "text" && annotation.type !== "mark";
}

/** The markup stretched from one frame to another. Line widths stay as they
 * were, so a resized shape is drawn with the same pen. */
export function scaleAnnotation(
  annotation: Annotation,
  from: Box,
  to: Box
): Annotation {
  const map = (point: Point) => mapPoint(point, from, to);
  switch (annotation.type) {
    case "pen":
    case "highlight":
      return { ...annotation, points: annotation.points.map(map) };
    case "arrow":
      return {
        ...annotation,
        from: map(annotation.from),
        to: map(annotation.to),
      };
    case "rect":
    case "ellipse": {
      const start = map({ x: annotation.x, y: annotation.y });
      const end = map({
        x: annotation.x + annotation.width,
        y: annotation.y + annotation.height,
      });
      return {
        ...annotation,
        height: end.y - start.y,
        width: end.x - start.x,
        x: start.x,
        y: start.y,
      };
    }
    default:
      return annotation;
  }
}
