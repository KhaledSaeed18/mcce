import type { LoopingProgress } from "@/hooks/use-looping-progress";

export const LEGAL_MARK_WIDTH = 60;
export const LEGAL_MARK_HEIGHT = 82;

/** The lock body never cycles, so the padlock keeps its frame while the
 * shackle and keyhole come and go. */
export const LEGAL_BODY = { height: 30, rx: 3, width: 32, x: 14, y: 42 };
export const LEGAL_BODY_STROKE = 2;

export const LEGAL_SHACKLE_STROKE = 3;
export const LEGAL_SHACKLE_LEFT_X = 20;
export const LEGAL_SHACKLE_RIGHT_X = 40;
export const LEGAL_SHACKLE_TOP_Y = 32;
/** How far the shackle sits above the body while the lock is open. */
export const LEGAL_SHACKLE_LIFT = 10;

export const LEGAL_KEYHOLE_CENTER = { x: 30, y: 53 };
export const LEGAL_KEYHOLE_RADIUS = 3.5;
export const LEGAL_KEYHOLE_STEM_TO_Y = 61;
export const LEGAL_KEYHOLE_STROKE = 2.5;

export const LEGAL_SHACKLE_DROP_RANGE = [0.05, 0.3] as const;
export const LEGAL_KEYHOLE_RANGE = [0.38, 0.52] as const;

export const LEGAL_MARK_LOOP: LoopingProgress = {
  durationSeconds: 8,
  opacity: [1, 1, 0, 0, 1],
  opacityTimes: [0, 0.84, 0.9, 0.95, 1],
  progress: [0, 1, 1, 0, 0],
  progressTimes: [0, 0.6, 0.9, 0.91, 1],
};
