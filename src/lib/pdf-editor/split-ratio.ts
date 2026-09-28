import {
  DEFAULT_SPLIT_RATIO,
  MIN_PANE_WIDTH,
  SPLIT_SNAP_DISTANCE,
} from "@/config/pdf-editor";

/** Keeps both panes at least their narrowest readable width. A space too
 * narrow for two gets an even split, the fairest it can do. */
export function clampSplitRatio(ratio: number, width: number): number {
  if (width < MIN_PANE_WIDTH * 2) {
    return DEFAULT_SPLIT_RATIO;
  }
  const least = MIN_PANE_WIDTH / width;
  return Math.min(Math.max(ratio, least), 1 - least);
}

/** Settles on the middle when it is close, since an even split is what a
 * drag near it is usually after. */
export function snapSplitRatio(ratio: number): number {
  return Math.abs(ratio - DEFAULT_SPLIT_RATIO) <= SPLIT_SNAP_DISTANCE
    ? DEFAULT_SPLIT_RATIO
    : ratio;
}

/** A stored ratio that is not a share of the width goes back to even. */
export function parseSplitRatio(value: unknown): number {
  return typeof value === "number" && value > 0 && value < 1
    ? value
    : DEFAULT_SPLIT_RATIO;
}
