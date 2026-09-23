import { getTextBox } from "./text-layout";
import type { Annotation, Box, Point } from "./types";

function boxAround(points: readonly Point[]): Box {
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const x = Math.min(...xs);
  const y = Math.min(...ys);
  return { height: Math.max(...ys) - y, width: Math.max(...xs) - x, x, y };
}

function union(boxes: readonly Box[]): Box {
  return boxAround(
    boxes.flatMap((box) => [
      { x: box.x, y: box.y },
      { x: box.x + box.width, y: box.y + box.height },
    ])
  );
}

/** The rectangle a piece of markup covers on the page: what it is framed by
 * when selected, kept on the page by when moved, and scaled by when resized. */
export function getAnnotationBox(annotation: Annotation): Box {
  switch (annotation.type) {
    case "pen":
    case "highlight":
      return boxAround(annotation.points);
    case "arrow":
      return boxAround([annotation.from, annotation.to]);
    case "text":
      return getTextBox(annotation);
    case "mark":
      return union(annotation.boxes);
    default:
      return {
        height: annotation.height,
        width: annotation.width,
        x: annotation.x,
        y: annotation.y,
      };
  }
}
