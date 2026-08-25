import type { LoopingProgress } from "@/hooks/use-looping-progress";
import type { StaggerWindow } from "@/hooks/use-staggered-entry";

export const TUITION_MARK_WIDTH = 60;
export const TUITION_MARK_HEIGHT = 82;
export const TUITION_MARK_STROKE = 2;

export const TUITION_GROUND = { height: 2, width: 48, x: 6, y: 72 };

export const TUITION_COIN_CENTER_X = 30;
export const TUITION_COIN_RX = 17;
export const TUITION_COIN_RY = 6;
export const TUITION_COIN_SPACING = 10;

/** Bottom coin first, so the stack builds upward as each one lands. */
export const TUITION_COIN_BOTTOM_Y = 66;
export const TUITION_COIN_COUNT = 5;

/** Small enough to clear the coin stacked on top of it: each coin below the
 * crown is only visible from its centre down. Stroke is in the icon's own 24
 * unit space, so it lands near half the coin outline's weight. */
export const TUITION_COIN_GLYPH_SIZE = 6;
export const TUITION_COIN_GLYPH_STROKE = 3.5;

/** How far above its resting place a coin starts before it drops. */
export const TUITION_COIN_DROP = 18;

export const TUITION_COIN_WINDOW: StaggerWindow = {
  duration: 0.2,
  stagger: 0.12,
  start: 0,
};

export const TUITION_MARK_LOOP: LoopingProgress = {
  durationSeconds: 8,
  opacity: [1, 1, 0, 0, 1],
  opacityTimes: [0, 0.84, 0.9, 0.95, 1],
  progress: [0, 1, 1, 0, 0],
  progressTimes: [0, 0.6, 0.9, 0.91, 1],
};
