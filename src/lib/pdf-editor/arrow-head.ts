import {
  ARROW_HEAD_ANGLE,
  ARROW_HEAD_LENGTH_RATIO,
  ARROW_HEAD_MIN_LENGTH,
} from "@/config/pdf-editor";
import type { ArrowAnnotation, Point } from "./types";

/** The two open ends of the head, shared by the canvas and the export so the
 * saved arrow matches the one on screen. */
export function getArrowHead(arrow: ArrowAnnotation): [Point, Point] {
  const { from, to } = arrow;
  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const length = Math.max(
    ARROW_HEAD_MIN_LENGTH,
    arrow.strokeWidth * ARROW_HEAD_LENGTH_RATIO
  );
  const side = (offset: number): Point => ({
    x: to.x - length * Math.cos(angle + offset),
    y: to.y - length * Math.sin(angle + offset),
  });
  return [side(ARROW_HEAD_ANGLE), side(-ARROW_HEAD_ANGLE)];
}
