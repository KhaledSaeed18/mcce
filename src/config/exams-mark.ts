import type { LoopingProgress } from "@/hooks/use-looping-progress";
import type { StaggerWindow } from "@/hooks/use-staggered-entry";

export const EXAMS_MARK_WIDTH = 60;
export const EXAMS_MARK_HEIGHT = 82;
export const EXAMS_MARK_STROKE = 2;

/** The sheet the fan splays out from. It does not cycle, so the mark always
 * shows a paper even at rest. */
export const EXAMS_SHEET = { height: 42, rx: 2, width: 30, x: 15, y: 18 };

/** Degrees each paper behind the front one turns out to, left then right. */
export const EXAMS_FAN_ANGLES = [-13, 13];

export const EXAMS_FAN_WINDOW: StaggerWindow = {
  duration: 0.26,
  stagger: 0.2,
  start: 0.06,
};

export const EXAMS_LINE_X = 20;
export const EXAMS_LINE_HEIGHT = 3;
export const EXAMS_LINE_WIDTHS = [20, 14, 18];
export const EXAMS_LINE_Y = [27, 35, 43];

/** The term every paper in the fan was sat, sitting clear of the sheets. */
export const EXAMS_TAG = { height: 10, rx: 2, width: 24, x: 18, y: 66 };
export const EXAMS_TAG_RANGE = [0.64, 0.8] as const;

export const EXAMS_MARK_LOOP: LoopingProgress = {
  durationSeconds: 8,
  opacity: [1, 1, 0, 0, 1],
  opacityTimes: [0, 0.84, 0.9, 0.95, 1],
  progress: [0, 1, 1, 0, 0],
  progressTimes: [0, 0.6, 0.9, 0.91, 1],
};
