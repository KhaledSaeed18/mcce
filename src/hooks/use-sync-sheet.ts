import { type MotionValue, useTransform } from "motion/react";
import {
  SYNC_DIMMED_OPACITY,
  SYNC_FAN_DURATION,
  SYNC_FAN_STAGGER,
  SYNC_INDEX_DURATION,
  SYNC_LIFT_SCALE,
  SYNC_LINK_RANGE,
  SYNC_LINKED_INDEX,
  SYNC_SHEET_ENTRY_SCALE,
  SYNC_SHEETS,
} from "@/config/sync-diagram";

export interface SyncSheetMotion {
  opacity: MotionValue<number>;
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  x: MotionValue<number>;
  y: MotionValue<number>;
}

/** Fans one sheet out of its folder, dims it as the scan bar records it, then
 * lifts it again if it is the sheet the final stage links back to. The sheet
 * never travels to the index: the section's point is that files stay in Drive
 * and only a record is written. */
export function useSyncSheet(
  progress: MotionValue<number>,
  index: number
): SyncSheetMotion {
  const sheet = SYNC_SHEETS[index];
  const fanStart = index * SYNC_FAN_STAGGER;
  const fanEnd = fanStart + SYNC_FAN_DURATION;
  const fan = [fanStart, fanEnd];
  const isLinked = index === SYNC_LINKED_INDEX;

  const dimStops = [
    fanStart,
    fanEnd,
    sheet.indexAt,
    sheet.indexAt + SYNC_INDEX_DURATION,
  ];
  const dimValues = [0, 1, 1, SYNC_DIMMED_OPACITY];

  return {
    opacity: useTransform(
      progress,
      isLinked ? [...dimStops, ...SYNC_LINK_RANGE] : dimStops,
      isLinked ? [...dimValues, SYNC_DIMMED_OPACITY, 1] : dimValues
    ),
    rotate: useTransform(progress, fan, [0, sheet.rotation]),
    scale: useTransform(
      progress,
      isLinked ? [...fan, ...SYNC_LINK_RANGE] : fan,
      isLinked
        ? [SYNC_SHEET_ENTRY_SCALE, 1, 1, SYNC_LIFT_SCALE]
        : [SYNC_SHEET_ENTRY_SCALE, 1]
    ),
    x: useTransform(progress, fan, [sheet.originX, sheet.fanX]),
    y: useTransform(progress, fan, [sheet.originY, sheet.fanY]),
  };
}
