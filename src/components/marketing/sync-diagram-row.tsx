import { type MotionValue, motion } from "motion/react";
import {
  SYNC_DIAGRAM_STROKE,
  SYNC_ROW_HEIGHT,
  SYNC_ROW_MARKER,
  SYNC_ROW_WIDTH,
  SYNC_ROWS,
} from "@/config/sync-diagram";
import { useSyncRow } from "@/hooks/use-sync-row";

const MARKER_X = 7;
const MARKER_Y = (SYNC_ROW_HEIGHT - SYNC_ROW_MARKER) / 2;
const BAR_X = 27;
const BAR_HEIGHT = 3;
const BAR_Y = (SYNC_ROW_HEIGHT - BAR_HEIGHT) / 2;
const SHADOW_OFFSET = 4;

interface SyncDiagramRowProps {
  index: number;
  progress: MotionValue<number>;
}

export function SyncDiagramRow({ index, progress }: SyncDiagramRowProps) {
  const { x, y, opacity, highlight } = useSyncRow(progress, index);

  return (
    <motion.g style={{ opacity, x, y }}>
      <motion.rect
        fill="var(--border)"
        height={SYNC_ROW_HEIGHT}
        style={{ opacity: highlight }}
        width={SYNC_ROW_WIDTH}
        x={SHADOW_OFFSET}
        y={SHADOW_OFFSET}
      />
      <rect
        fill="var(--card)"
        height={SYNC_ROW_HEIGHT}
        width={SYNC_ROW_WIDTH}
      />
      <motion.rect
        fill="var(--primary)"
        height={SYNC_ROW_HEIGHT}
        style={{ opacity: highlight }}
        width={SYNC_ROW_WIDTH}
      />
      <rect
        fill="none"
        height={SYNC_ROW_HEIGHT}
        stroke="var(--border)"
        strokeWidth={SYNC_DIAGRAM_STROKE}
        width={SYNC_ROW_WIDTH}
      />
      <rect
        fill="var(--primary)"
        height={SYNC_ROW_MARKER}
        width={SYNC_ROW_MARKER}
        x={MARKER_X}
        y={MARKER_Y}
      />
      {/* Sits over the amber marker so it stays visible once the whole row
       * turns amber in the final stage. */}
      <motion.rect
        fill="var(--card)"
        height={SYNC_ROW_MARKER}
        style={{ opacity: highlight }}
        width={SYNC_ROW_MARKER}
        x={MARKER_X}
        y={MARKER_Y}
      />
      <rect
        fill="none"
        height={SYNC_ROW_MARKER}
        stroke="var(--border)"
        strokeWidth={SYNC_DIAGRAM_STROKE}
        width={SYNC_ROW_MARKER}
        x={MARKER_X}
        y={MARKER_Y}
      />
      <rect
        fill="var(--border)"
        height={BAR_HEIGHT}
        width={SYNC_ROWS[index].barWidth}
        x={BAR_X}
        y={BAR_Y}
      />
    </motion.g>
  );
}
