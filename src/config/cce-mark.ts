import type { LoopingProgress } from "@/hooks/use-looping-progress";
import type { StaggerWindow } from "@/hooks/use-staggered-entry";

export const CCE_MARK_WIDTH = 60;
export const CCE_MARK_HEIGHT = 82;
export const CCE_MARK_STROKE = 2;

export const CCE_GROUND = { height: 2, width: 48, x: 6, y: 72 };

/** One track per program: CENG on the left, TENG on the right. */
export const CCE_TRACK_X = [18, 42];
export const CCE_TRACK_FROM_Y = 12;
export const CCE_TRACK_TO_Y = 66;

export const CCE_TRACK_RANGE = [0.04, 0.3] as const;

/** Motion draws pathLength with a dasharray, so a track still paints its
 * start cap at length 0. It stays hidden until it starts drawing. */
export const CCE_TRACK_FADE = 0.02;

/** One node pair per year, top to bottom, one colour per program. */
export const CCE_NODE_SIZE = 10;
export const CCE_NODE_RX = 2;
export const CCE_NODE_X = [13, 37];
export const CCE_NODE_COLORS = ["var(--chart-2)", "var(--chart-5)"];
export const CCE_YEAR_Y = [15, 33, 51];

export const CCE_YEAR_WINDOW: StaggerWindow = {
  duration: 0.16,
  stagger: 0.1,
  start: 0.32,
};

export const CCE_BRIDGE_RANGE = [0.7, 0.78] as const;
export const CCE_BRIDGE_FADE = 0.02;

/** Where the two programs meet: one node, resting on the ground. */
export const CCE_JOIN = { size: 12, x: 24, y: 60 };
export const CCE_JOIN_RX = 2;
export const CCE_JOIN_RANGE = [0.8, 0.92] as const;

export const CCE_MARK_LOOP: LoopingProgress = {
  durationSeconds: 8,
  opacity: [1, 1, 0, 0, 1],
  opacityTimes: [0, 0.84, 0.9, 0.95, 1],
  progress: [0, 1, 1, 0, 0],
  progressTimes: [0, 0.6, 0.9, 0.91, 1],
};
