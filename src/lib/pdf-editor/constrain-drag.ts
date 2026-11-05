import { CONSTRAIN_ANGLE_STEP } from "@/config/pdf-editor";
import type { EditorTool, Point } from "./types";

/** Where a Shift drag ends: a box stays square, and an arrow keeps to steps of
 * 45 degrees. Other tools have nothing to hold to. */
export function constrainDrag(
  tool: EditorTool,
  start: Point,
  end: Point
): Point {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  if (tool === "arrow") {
    const angle =
      Math.round(Math.atan2(dy, dx) / CONSTRAIN_ANGLE_STEP) *
      CONSTRAIN_ANGLE_STEP;
    const length = Math.hypot(dx, dy);
    return {
      x: start.x + Math.cos(angle) * length,
      y: start.y + Math.sin(angle) * length,
    };
  }
  if (tool === "rect" || tool === "ellipse" || tool === "cover") {
    const side = Math.max(Math.abs(dx), Math.abs(dy));
    return {
      x: start.x + side * (dx < 0 ? -1 : 1),
      y: start.y + side * (dy < 0 ? -1 : 1),
    };
  }
  return end;
}
