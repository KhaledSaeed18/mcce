import type { LoopingProgress } from "@/hooks/use-looping-progress";
import type { StaggerWindow } from "@/hooks/use-staggered-entry";

/** Square, unlike the other hero marks, because the brand mark is square. */
export const ABOUT_MARK_SIZE = 120;
export const ABOUT_CENTER = 60;

export const ABOUT_HUB = { rx: 5, size: 28, stroke: 3.5 };
export const ABOUT_NODE = { rx: 4, size: 20, stroke: 3 };
export const ABOUT_SPOKE_WIDTH = 4;

export interface AboutSpoke {
  /** Theme token, matching the brand mark's own colour for this arm. */
  color: string;
  /** Centre of the node this spoke ends at. */
  x: number;
  y: number;
}

/** The four arms of the MCCE mark, in the order the logo draws them. */
export const ABOUT_SPOKES: AboutSpoke[] = [
  { color: "chart-2", x: 60, y: 16 },
  { color: "chart-3", x: 104, y: 60 },
  { color: "chart-4", x: 60, y: 104 },
  { color: "chart-5", x: 16, y: 60 },
];

export const ABOUT_HUB_RANGE = [0, 0.14] as const;

export const ABOUT_SPOKE_WINDOW: StaggerWindow = {
  duration: 0.16,
  stagger: 0.1,
  start: 0.18,
};

export const ABOUT_NODE_WINDOW: StaggerWindow = {
  duration: 0.12,
  stagger: 0.1,
  start: 0.3,
};

/** Motion draws pathLength with a dasharray, so a spoke at length 0 still
 * paints its end caps. Each arm stays hidden until it starts drawing. */
export const ABOUT_SPOKE_FADE = 0.02;

export const ABOUT_MARK_LOOP: LoopingProgress = {
  durationSeconds: 8,
  opacity: [1, 1, 0, 0, 1],
  opacityTimes: [0, 0.84, 0.9, 0.95, 1],
  progress: [0, 1, 1, 0, 0],
  progressTimes: [0, 0.6, 0.9, 0.91, 1],
};
