import type { LoopingProgress } from "@/hooks/use-looping-progress";
import type { StaggerWindow } from "@/hooks/use-staggered-entry";

export const COURSE_MARK_WIDTH = 60;
export const COURSE_MARK_HEIGHT = 82;
export const COURSE_MARK_STROKE = 2;

/** The board does not cycle, so the catalogue always has a page to fill. */
export const COURSE_BOARD = { height: 54, rx: 2, width: 48, x: 6, y: 14 };

export const COURSE_TILE_WIDTH = 12;
export const COURSE_TILE_HEIGHT = 9;
export const COURSE_TILE_RX = 2;

/** One column per semester, one row per year. */
export const COURSE_TILE_X = [10, 24, 38];
export const COURSE_TILE_Y = [18, 30, 42, 54];

/** Tiles enter by column plus row, so the catalogue fills on a diagonal
 * rather than line by line. */
export const COURSE_TILE_WINDOW: StaggerWindow = {
  duration: 0.16,
  stagger: 0.09,
  start: 0.04,
};

/** The one course you came for, picked out once the rest are in place. */
export const COURSE_HIGHLIGHT = { col: 1, row: 2 };
export const COURSE_HIGHLIGHT_RANGE = [0.74, 0.9] as const;

export const COURSE_MARK_LOOP: LoopingProgress = {
  durationSeconds: 8,
  opacity: [1, 1, 0, 0, 1],
  opacityTimes: [0, 0.84, 0.9, 0.95, 1],
  progress: [0, 1, 1, 0, 0],
  progressTimes: [0, 0.6, 0.9, 0.91, 1],
};
