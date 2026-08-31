import type { Point } from "./types";

/** How far a point lies from a line segment, measured to the nearest place on it. */
export function distanceToSegment(
  from: Point,
  to: Point,
  target: Point
): number {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const lengthSquared = dx * dx + dy * dy;
  if (lengthSquared === 0) {
    return Math.hypot(target.x - from.x, target.y - from.y);
  }

  const along =
    ((target.x - from.x) * dx + (target.y - from.y) * dy) / lengthSquared;
  const nearest = Math.min(Math.max(along, 0), 1);
  return Math.hypot(
    target.x - (from.x + nearest * dx),
    target.y - (from.y + nearest * dy)
  );
}

/**
 * How far a point lies from a stroke, which is the line through its points and
 * not the points alone. A quick drag records them far apart, and the stretches
 * in between have to be reachable too.
 */
export function distanceToStroke(points: Point[], target: Point): number {
  let nearest = Number.POSITIVE_INFINITY;
  for (let index = 1; index < points.length; index += 1) {
    nearest = Math.min(
      nearest,
      distanceToSegment(points[index - 1], points[index], target)
    );
  }
  return nearest;
}
