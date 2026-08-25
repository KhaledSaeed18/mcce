import type { LoopingProgress } from "@/hooks/use-looping-progress";
import type { StaggerWindow } from "@/hooks/use-staggered-entry";

export const GPA_MARK_WIDTH = 60;
export const GPA_MARK_HEIGHT = 82;
export const GPA_MARK_STROKE = 2;

export const GPA_BASELINE_Y = 70;
export const GPA_BASELINE = { height: 2, width: 52, x: 2 };

export const GPA_BAR_WIDTH = 8;
export const GPA_BAR_RX = 2;

/** One semester each. The cumulative line below is their real mean, so the
 * two halves of the mark cannot drift out of agreement. */
export const GPA_BAR_HEIGHTS = [30, 42, 24, 50];
export const GPA_BAR_X = [3, 14, 25, 36];

export const GPA_CUMULATIVE_Y =
  GPA_BASELINE_Y -
  GPA_BAR_HEIGHTS.reduce((total, height) => total + height, 0) /
    GPA_BAR_HEIGHTS.length;

export const GPA_LINE_FROM = 2;
export const GPA_LINE_TO = 52;
export const GPA_LINE_WIDTH = 3;

export const GPA_MARKER_SIZE = 9;
export const GPA_MARKER_RX = 2;

export const GPA_BAR_WINDOW: StaggerWindow = {
  duration: 0.18,
  stagger: 0.1,
  start: 0,
};

export const GPA_LINE_RANGE = [0.54, 0.78] as const;
export const GPA_MARKER_RANGE = [0.8, 0.92] as const;

/** Motion draws pathLength with a dasharray, so the line still paints its end
 * caps at length 0. It stays hidden until it starts drawing. */
export const GPA_LINE_FADE = 0.02;

export const GPA_MARK_LOOP: LoopingProgress = {
  durationSeconds: 8,
  opacity: [1, 1, 0, 0, 1],
  opacityTimes: [0, 0.84, 0.9, 0.95, 1],
  progress: [0, 1, 1, 0, 0],
  progressTimes: [0, 0.6, 0.9, 0.91, 1],
};
