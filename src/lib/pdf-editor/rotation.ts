import {
  PAGE_HALF_TURN,
  PAGE_QUARTER_TURN,
  PAGE_THREE_QUARTER_TURN,
} from "@/config/pdf-editor";
import type { PageSize, Point } from "./types";

/** How a turned page is placed so that it still starts at the same corner. */
export interface RotationTransform {
  angle: number;
  tx: number;
  ty: number;
}

/** A page on its side is as wide as it was tall. */
export function getRenderedSize(size: PageSize, rotation: number): PageSize {
  if (rotation % PAGE_HALF_TURN === 0) {
    return size;
  }
  return { height: size.width, width: size.height };
}

/**
 * Markup is kept in the page's upright space, so turning a page moves what is
 * drawn on it without touching a single coordinate. This is what the canvas and
 * the overlays are turned by to draw that space onto a page that has been turned.
 */
export function getRotationTransform(
  size: PageSize,
  rotation: number
): RotationTransform {
  const angle = (rotation * Math.PI) / PAGE_HALF_TURN;
  if (rotation === PAGE_QUARTER_TURN) {
    return { angle, tx: size.height, ty: 0 };
  }
  if (rotation === PAGE_HALF_TURN) {
    return { angle, tx: size.width, ty: size.height };
  }
  if (rotation === PAGE_THREE_QUARTER_TURN) {
    return { angle, tx: 0, ty: size.width };
  }
  return { angle: 0, tx: 0, ty: 0 };
}

/**
 * The same for a movement rather than a place. A drag reports how far the
 * pointer went across the screen, which on a turned page is along a different
 * axis of the page underneath it.
 */
export function toBaseDelta(delta: Point, rotation: number): Point {
  if (rotation === PAGE_QUARTER_TURN) {
    return { x: delta.y, y: -delta.x };
  }
  if (rotation === PAGE_HALF_TURN) {
    return { x: -delta.x, y: -delta.y };
  }
  if (rotation === PAGE_THREE_QUARTER_TURN) {
    return { x: -delta.y, y: delta.x };
  }
  return delta;
}

/** Where a point on the turned page sits on the upright one. */
export function toBasePoint(
  point: Point,
  size: PageSize,
  rotation: number
): Point {
  if (rotation === PAGE_QUARTER_TURN) {
    return { x: point.y, y: size.height - point.x };
  }
  if (rotation === PAGE_HALF_TURN) {
    return { x: size.width - point.x, y: size.height - point.y };
  }
  if (rotation === PAGE_THREE_QUARTER_TURN) {
    return { x: size.width - point.y, y: point.x };
  }
  return point;
}
