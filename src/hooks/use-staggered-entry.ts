import { type MotionValue, useTransform } from "motion/react";

export interface StaggerWindow {
  /** Duration of one item's entry, in progress units. */
  duration: number;
  /** Gap between one item's start and the next. */
  stagger: number;
  /** Where the first item begins, in progress units. */
  start: number;
}

/** A 0 to 1 entry value for one item in a staggered run, driven by a loop's
 * progress. Consumers map it onto whatever they animate, so a line that wipes
 * and a marker that pops stay in step without repeating the windowing. */
export function useStaggeredEntry(
  progress: MotionValue<number>,
  index: number,
  window: StaggerWindow
): MotionValue<number> {
  const start = window.start + index * window.stagger;
  return useTransform(progress, [start, start + window.duration], [0, 1]);
}
