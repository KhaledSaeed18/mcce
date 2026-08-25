import { type MotionValue, useTransform } from "motion/react";
import {
  SYNC_INDEX_DURATION,
  SYNC_LINK_RANGE,
  SYNC_LINKED_INDEX,
  SYNC_ROW_ENTRY_OFFSET,
  SYNC_ROW_GAP,
  SYNC_ROW_TOP,
  SYNC_ROW_X,
  SYNC_SHEETS,
} from "@/config/sync-diagram";

export interface SyncRowMotion {
  highlight: MotionValue<number>;
  opacity: MotionValue<number>;
  x: MotionValue<number>;
  y: number;
}

/** Writes one index row at the moment the scan bar reaches its sheet, then
 * marks it as the row the final stage traces back to Drive. */
export function useSyncRow(
  progress: MotionValue<number>,
  index: number
): SyncRowMotion {
  const writeAt = SYNC_SHEETS[index].indexAt;
  const write = [writeAt, writeAt + SYNC_INDEX_DURATION];
  const isLinked = index === SYNC_LINKED_INDEX;

  return {
    highlight: useTransform(
      progress,
      [...SYNC_LINK_RANGE],
      [0, isLinked ? 1 : 0]
    ),
    opacity: useTransform(progress, write, [0, 1]),
    x: useTransform(progress, write, [
      SYNC_ROW_X + SYNC_ROW_ENTRY_OFFSET,
      SYNC_ROW_X,
    ]),
    y: SYNC_ROW_TOP + index * SYNC_ROW_GAP,
  };
}
