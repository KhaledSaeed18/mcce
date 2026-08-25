import type { LoopingProgress } from "@/hooks/use-looping-progress";
import type { StaggerWindow } from "@/hooks/use-staggered-entry";

export const CONTACT_MARK_WIDTH = 60;
export const CONTACT_MARK_HEIGHT = 82;
export const CONTACT_MARK_STROKE = 2;
export const CONTACT_SHADOW_OFFSET = 3;

export interface ContactBubble {
  fill: string;
  height: number;
  /** Entry window in progress units. */
  range: readonly [number, number];
  rx: number;
  /** Drawn off the bubble's bottom edge, pointing at whoever is speaking. */
  tail: string;
  width: number;
  x: number;
  y: number;
}

/** Yours first, top left. The reply answers from the opposite side, which is
 * what makes the pair read as two people rather than one list. */
export const CONTACT_BUBBLES: ContactBubble[] = [
  {
    fill: "var(--primary)",
    height: 24,
    range: [0, 0.18],
    rx: 5,
    tail: "M10 34 L10 42 L18 34 Z",
    width: 40,
    x: 6,
    y: 10,
  },
  {
    fill: "var(--card)",
    height: 22,
    range: [0.5, 0.72],
    rx: 5,
    tail: "M50 68 L50 76 L42 68 Z",
    width: 38,
    x: 16,
    y: 46,
  },
];

/** How far a bubble rises into place as it pops. */
export const CONTACT_BUBBLE_RISE = 6;
export const CONTACT_BUBBLE_ENTRY_SCALE = 0.7;

export const CONTACT_DOT_RADIUS = 2.5;
export const CONTACT_DOT_CENTER_Y = 22;
export const CONTACT_DOT_X = [16, 25, 34];

export const CONTACT_DOT_WINDOW: StaggerWindow = {
  duration: 0.12,
  stagger: 0.08,
  start: 0.22,
};

/** Runs on its own clock rather than the loop's, so the mark keeps a pulse
 * through the long hold instead of freezing once everything has arrived. */
export const CONTACT_DOT_PULSE_SECONDS = 1.4;
export const CONTACT_DOT_PULSE_DELAY = 0.16;
export const CONTACT_DOT_PULSE_OPACITY = [1, 0.35, 1];

export const CONTACT_MARK_LOOP: LoopingProgress = {
  durationSeconds: 8,
  opacity: [1, 1, 0, 0, 1],
  opacityTimes: [0, 0.84, 0.9, 0.95, 1],
  progress: [0, 1, 1, 0, 0],
  progressTimes: [0, 0.6, 0.9, 0.91, 1],
};
