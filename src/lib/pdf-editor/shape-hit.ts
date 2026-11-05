import type { Box, Point } from "./types";

/** How far a point lies from the outline of a box, inside it or out. */
export function distanceToRectOutline(box: Box, target: Point): number {
  const left = target.x - box.x;
  const right = box.x + box.width - target.x;
  const top = target.y - box.y;
  const bottom = box.y + box.height - target.y;
  if (Math.min(left, right, top, bottom) >= 0) {
    return Math.min(left, right, top, bottom);
  }
  return Math.hypot(Math.max(-left, -right, 0), Math.max(-top, -bottom, 0));
}

/** How far a point lies from an ellipse's outline, near enough for picking it
 * up: measured along the line from its center, which is exact on a circle. */
export function distanceToEllipseOutline(box: Box, target: Point): number {
  const radiusX = box.width / 2;
  const radiusY = box.height / 2;
  const dx = target.x - (box.x + radiusX);
  const dy = target.y - (box.y + radiusY);
  const reach = Math.hypot(dx / (radiusX || 1), dy / (radiusY || 1));
  if (reach === 0) {
    return Math.min(radiusX, radiusY);
  }
  return (Math.abs(reach - 1) * Math.hypot(dx, dy)) / reach;
}

/** Evenly spaced points from one to the other, leaving out the first, so a
 * quick sweep cannot jump over anything between two pointer events. */
export function pointsAlong(from: Point, to: Point, spacing: number): Point[] {
  const steps = Math.max(
    1,
    Math.ceil(Math.hypot(to.x - from.x, to.y - from.y) / spacing)
  );
  return Array.from({ length: steps }, (_, index) => {
    const along = (index + 1) / steps;
    return {
      x: from.x + (to.x - from.x) * along,
      y: from.y + (to.y - from.y) * along,
    };
  });
}
