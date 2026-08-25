import type { LoopingProgress } from "@/hooks/use-looping-progress";
import type { StaggerWindow } from "@/hooks/use-staggered-entry";

export const SITEMAP_MARK_WIDTH = 60;
export const SITEMAP_MARK_HEIGHT = 82;
export const SITEMAP_MARK_STROKE = 2;

/** The root never cycles, so the tree always grows from somewhere. */
export const SITEMAP_ROOT = { size: 12, x: 24, y: 20 };
export const SITEMAP_ROOT_RX = 2;

export const SITEMAP_TRUNK_FROM_Y = 32;
export const SITEMAP_RAIL_Y = 42;
export const SITEMAP_RAIL_FROM_X = 12;
export const SITEMAP_RAIL_TO_X = 48;
export const SITEMAP_DROP_TO_Y = 54;

/** One page node per drop, left to right. */
export const SITEMAP_NODE_SIZE = 12;
export const SITEMAP_NODE_RX = 2;
export const SITEMAP_NODE_Y = 54;
export const SITEMAP_NODE_X = [6, 24, 42];

export const SITEMAP_TREE_RANGE = [0.04, 0.4] as const;

/** Motion draws pathLength with a dasharray, so the connector still paints
 * its start cap at length 0. It stays hidden until it starts drawing. */
export const SITEMAP_TREE_FADE = 0.02;

export const SITEMAP_NODE_WINDOW: StaggerWindow = {
  duration: 0.16,
  stagger: 0.1,
  start: 0.42,
};

export const SITEMAP_MARK_LOOP: LoopingProgress = {
  durationSeconds: 8,
  opacity: [1, 1, 0, 0, 1],
  opacityTimes: [0, 0.84, 0.9, 0.95, 1],
  progress: [0, 1, 1, 0, 0],
  progressTimes: [0, 0.6, 0.9, 0.91, 1],
};
