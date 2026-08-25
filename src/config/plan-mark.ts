import type { LoopingProgress } from "@/hooks/use-looping-progress";
import type { StaggerWindow } from "@/hooks/use-staggered-entry";

/** Kept at the clipboard's box so the mark drops into the same hero slot. */
export const PLAN_MARK_WIDTH = 60;
export const PLAN_MARK_HEIGHT = 82;
export const PLAN_MARK_STROKE = 2;

export const PLAN_BOARD = { height: 58, rx: 3, width: 42, x: 6, y: 10 };
export const PLAN_BOARD_SHADOW_OFFSET = 4;
export const PLAN_CLIP = { height: 8, rx: 2, width: 16, x: 19, y: 5 };

export const PLAN_MARKER_SIZE = 5;
export const PLAN_MARKER_X = 12;
export const PLAN_BAR_X = 21;
export const PLAN_BAR_HEIGHT = 3.5;

/** One per course line on the board, top to bottom. */
export const PLAN_ROWS = [
  { barWidth: 18, centerY: 24 },
  { barWidth: 13, centerY: 34 },
  { barWidth: 18, centerY: 44 },
  { barWidth: 10, centerY: 54 },
];

export const PLAN_ROW_WINDOW: StaggerWindow = {
  duration: 0.18,
  stagger: 0.14,
  start: 0,
};

/** Bows out to the left margin so it reads as a link between two courses
 * rather than another rule on the page. */
export const PLAN_LINK_PATH = "M 14.5 27 C 8.5 31, 8.5 37, 14.5 41";
export const PLAN_LINK_RANGE = [0.62, 0.86] as const;

/** Motion draws pathLength with a dasharray, so at length 0 the round caps
 * still paint a dot at each end. The link stays fully hidden until it starts
 * drawing rather than parking two dots on the board for most of the loop. */
export const PLAN_LINK_FADE = 0.02;
export const PLAN_LINK_WIDTH = 1.4;

export const PLAN_MARK_LOOP: LoopingProgress = {
  durationSeconds: 8,
  opacity: [1, 1, 0, 0, 1],
  opacityTimes: [0, 0.84, 0.9, 0.95, 1],
  progress: [0, 1, 1, 0, 0],
  progressTimes: [0, 0.6, 0.9, 0.91, 1],
};
