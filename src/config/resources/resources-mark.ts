import type { LoopingProgress } from "@/hooks/use-looping-progress";
import type { StaggerWindow } from "@/hooks/use-staggered-entry";

export const RESOURCES_MARK_WIDTH = 96;
export const RESOURCES_MARK_HEIGHT = 84;
export const RESOURCES_MARK_STROKE = 2;

/** Three tool cards, one under the other, each with a tile and a cost pill. */
export const RESOURCES_CARD = { height: 22, rx: 3, width: 84, x: 6 };
export const RESOURCES_CARD_Y = [4, 31, 58];
export const RESOURCES_TILE = { inset: 4, rx: 2, size: 14 };
export const RESOURCES_LINE = { height: 3, rx: 1.5, width: 30, x: 26 };
export const RESOURCES_PILL = { height: 8, rx: 4, width: 22, x: 62 };
export const RESOURCES_PILL_COLORS = ["chart-2", "chart-1", "chart-3"];

/** Cards slide in one after another, then the pills pop on. */
export const RESOURCES_CARD_WINDOW: StaggerWindow = {
  duration: 0.22,
  stagger: 0.16,
  start: 0.04,
};
export const RESOURCES_PILL_WINDOW: StaggerWindow = {
  duration: 0.12,
  stagger: 0.16,
  start: 0.3,
};
export const RESOURCES_CARD_SLIDE = 14;

export const RESOURCES_MARK_LOOP: LoopingProgress = {
  durationSeconds: 8,
  opacity: [1, 1, 0, 0, 1],
  opacityTimes: [0, 0.84, 0.9, 0.95, 1],
  progress: [0, 1, 1, 0, 0],
  progressTimes: [0, 0.6, 0.9, 0.91, 1],
};
