import type { LoopingProgress } from "@/hooks/use-looping-progress";
import type { StaggerWindow } from "@/hooks/use-staggered-entry";

export const ADMISSIONS_MARK_WIDTH = 60;
export const ADMISSIONS_MARK_HEIGHT = 82;
export const ADMISSIONS_MARK_STROKE = 2;

/** The sheet every requirement is ticked on. It does not cycle, so the list
 * keeps a stable page while its entries come and go. */
export const ADMISSIONS_PAPER = { height: 78, rx: 3, width: 40, x: 10, y: 2 };

export const ADMISSIONS_BOX_SIZE = 9;
export const ADMISSIONS_BOX_RX = 2;
export const ADMISSIONS_BOX_X = 15;

export const ADMISSIONS_TEXT_WIDTH = 16;
export const ADMISSIONS_TEXT_HEIGHT = 3;
export const ADMISSIONS_TEXT_X = 29;

export const ADMISSIONS_ITEM_COUNT = 3;
export const ADMISSIONS_FIRST_ITEM_Y = 12;
export const ADMISSIONS_ITEM_SPACING = 14;

/** One row per entry: box pops, text wipes from the left, check draws last. */
export const ADMISSIONS_ROW_WINDOW: StaggerWindow = {
  duration: 0.22,
  stagger: 0.08,
  start: 0,
};

export const ADMISSIONS_BOX_RANGE = [0, 0.25] as const;
export const ADMISSIONS_TEXT_RANGE = [0.12, 0.55] as const;
export const ADMISSIONS_CHECK_START = 0.5;

export const ADMISSIONS_STAMP_CENTER = { x: 30, y: 64 };
export const ADMISSIONS_STAMP_RADIUS = 10;
export const ADMISSIONS_STAMP_RANGE = [0.56, 0.72] as const;
export const ADMISSIONS_STAMP_CHECK_START = 0.45;

/** Motion draws pathLength with a dasharray, so a stroke at length 0 still
 * paints its end caps. Checks stay hidden until they start drawing. */
export const ADMISSIONS_DRAW_FADE = 0.02;

export const ADMISSIONS_MARK_LOOP: LoopingProgress = {
  durationSeconds: 8,
  opacity: [1, 1, 0, 0, 1],
  opacityTimes: [0, 0.84, 0.9, 0.95, 1],
  progress: [0, 1, 1, 0, 0],
  progressTimes: [0, 0.6, 0.9, 0.91, 1],
};
