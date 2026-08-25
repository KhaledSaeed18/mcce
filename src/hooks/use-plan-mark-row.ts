import { type MotionValue, useTransform } from "motion/react";
import { PLAN_ROW_DURATION, PLAN_ROW_STAGGER } from "@/config/plan-mark";

export interface PlanMarkRowMotion {
  barScaleX: MotionValue<number>;
  markerScale: MotionValue<number>;
  opacity: MotionValue<number>;
}

/** Lands one course line on the board. The bar wipes out from the marker so the
 * row reads as being written, not as fading up. */
export function usePlanMarkRow(
  progress: MotionValue<number>,
  index: number
): PlanMarkRowMotion {
  const start = index * PLAN_ROW_STAGGER;
  const window = [start, start + PLAN_ROW_DURATION];

  return {
    barScaleX: useTransform(progress, window, [0, 1]),
    markerScale: useTransform(progress, window, [0, 1]),
    opacity: useTransform(progress, window, [0, 1]),
  };
}
