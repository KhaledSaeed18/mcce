import type { LoopingProgress } from "@/hooks/use-looping-progress";
import type { StaggerWindow } from "@/hooks/use-staggered-entry";

export const SAVED_MARK_WIDTH = 60;
export const SAVED_MARK_HEIGHT = 82;
export const SAVED_MARK_STROKE = 2;

/** The shelf does not cycle, so the pile always has something to rest on. */
export const SAVED_SHELF = { height: 2, width: 48, x: 6, y: 72 };

export const SAVED_CARD_WIDTH = 44;
export const SAVED_CARD_HEIGHT = 14;
export const SAVED_CARD_RX = 2;
export const SAVED_CARD_X = 8;

/** Back of the pile first, so every card lands in front of the last one. The
 * cards abut rather than overlap, so each one shows the same band and its
 * label reads as centred. */
export const SAVED_CARD_Y = [56, 42, 28];

/** How far below its resting place a card starts before it slides up. */
export const SAVED_CARD_RISE = 14;

export const SAVED_LABEL_WIDTH = 22;
export const SAVED_LABEL_HEIGHT = 4;
export const SAVED_LABEL_INSET = 6;

export const SAVED_CARD_WINDOW: StaggerWindow = {
  duration: 0.2,
  stagger: 0.14,
  start: 0.02,
};

export const SAVED_RIBBON_WIDTH = 9;
export const SAVED_RIBBON_HEIGHT = 18;
export const SAVED_RIBBON_NOTCH = 5;
export const SAVED_RIBBON_X = 38;

/** Starts above the front card's top edge, so it reads as clipped on rather
 * than printed. The front card is the last entry in `SAVED_CARD_Y`. */
export const SAVED_RIBBON_Y = 24;

export const SAVED_RIBBON_RANGE = [0.62, 0.8] as const;

export const SAVED_MARK_LOOP: LoopingProgress = {
  durationSeconds: 8,
  opacity: [1, 1, 0, 0, 1],
  opacityTimes: [0, 0.84, 0.9, 0.95, 1],
  progress: [0, 1, 1, 0, 0],
  progressTimes: [0, 0.6, 0.9, 0.91, 1],
};
