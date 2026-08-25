import type { LoopingProgress } from "@/hooks/use-looping-progress";
import type { StaggerWindow } from "@/hooks/use-staggered-entry";

export const RECENT_MARK_WIDTH = 60;
export const RECENT_MARK_HEIGHT = 82;
export const RECENT_MARK_STROKE = 2;

/** The dial does not cycle, so the sweep always has a face to run around. */
export const RECENT_DIAL = { cx: 30, cy: 40, r: 24 };

export const RECENT_SWEEP_WIDTH = 3;
export const RECENT_SWEEP_RANGE = [0.04, 0.62] as const;

/** Motion draws pathLength with a dasharray, so the sweep still paints its
 * start cap at length 0. It stays hidden until it starts drawing. */
export const RECENT_SWEEP_FADE = 0.02;

/** An arc that closes on its own start point collapses, so it stops a hair
 * short of noon and the round cap covers the difference. */
export const RECENT_SWEEP_GAP = 0.02;

/** One row per file the sync found, oldest at the top. */
export const RECENT_ROW_X = 20;
export const RECENT_ROW_HEIGHT = 4;
export const RECENT_ROW_WIDTHS = [22, 16, 20];
export const RECENT_ROW_Y = [32, 40, 48];

export const RECENT_ROW_WINDOW: StaggerWindow = {
  duration: 0.16,
  stagger: 0.14,
  start: 0.12,
};

/** Sits where the sweep starts and ends, so it reads as what the pass found. */
export const RECENT_BADGE_SIZE = 10;
export const RECENT_BADGE_RX = 2;
export const RECENT_BADGE_RANGE = [0.72, 0.88] as const;

export const RECENT_MARK_LOOP: LoopingProgress = {
  durationSeconds: 8,
  opacity: [1, 1, 0, 0, 1],
  opacityTimes: [0, 0.84, 0.9, 0.95, 1],
  progress: [0, 1, 1, 0, 0],
  progressTimes: [0, 0.6, 0.9, 0.91, 1],
};
