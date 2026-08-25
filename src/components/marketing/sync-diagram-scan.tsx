import { type MotionValue, motion, useTransform } from "motion/react";
import {
  SYNC_DIAGRAM_HEIGHT,
  SYNC_SCAN_CAP,
  SYNC_SCAN_FADE,
  SYNC_SCAN_FROM,
  SYNC_SCAN_RANGE,
  SYNC_SCAN_TO,
  SYNC_SCAN_WIDTH,
} from "@/config/sync-diagram";

const [SCAN_START, SCAN_END] = SYNC_SCAN_RANGE;
const CAP_OFFSET = (SYNC_SCAN_CAP - SYNC_SCAN_WIDTH) / 2;

interface SyncDiagramScanProps {
  progress: MotionValue<number>;
}

export function SyncDiagramScan({ progress }: SyncDiagramScanProps) {
  const x = useTransform(
    progress,
    [SCAN_START, SCAN_END],
    [SYNC_SCAN_FROM, SYNC_SCAN_TO]
  );
  const opacity = useTransform(
    progress,
    [
      SCAN_START,
      SCAN_START + SYNC_SCAN_FADE,
      SCAN_END - SYNC_SCAN_FADE,
      SCAN_END,
    ],
    [0, 1, 1, 0]
  );

  return (
    <motion.g style={{ opacity, x }}>
      <rect
        fill="var(--primary)"
        height={SYNC_DIAGRAM_HEIGHT}
        width={SYNC_SCAN_WIDTH}
      />
      <rect
        fill="var(--primary)"
        height={SYNC_SCAN_CAP}
        stroke="var(--border)"
        strokeWidth={SYNC_SCAN_WIDTH / 2}
        width={SYNC_SCAN_CAP}
        x={-CAP_OFFSET}
      />
      <rect
        fill="var(--primary)"
        height={SYNC_SCAN_CAP}
        stroke="var(--border)"
        strokeWidth={SYNC_SCAN_WIDTH / 2}
        width={SYNC_SCAN_CAP}
        x={-CAP_OFFSET}
        y={SYNC_DIAGRAM_HEIGHT - SYNC_SCAN_CAP}
      />
    </motion.g>
  );
}
