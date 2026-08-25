import { type MotionValue, motion } from "motion/react";
import {
  SYNC_DIAGRAM_STROKE,
  SYNC_SHEET_HEIGHT,
  SYNC_SHEET_WIDTH,
} from "@/config/sync-diagram";
import { useSyncSheet } from "@/hooks/use-sync-sheet";

const RULE_INSET = 8;
const RULE_TOP = 16;
const RULE_GAP = 9;
const RULE_HEIGHT = 2;
const RULE_WIDTHS = [26, 20, 24];

interface SyncDiagramSheetProps {
  index: number;
  progress: MotionValue<number>;
}

export function SyncDiagramSheet({ index, progress }: SyncDiagramSheetProps) {
  const { x, y, rotate, scale, opacity } = useSyncSheet(progress, index);

  return (
    <motion.g style={{ opacity, x, y }}>
      <motion.g
        // Motion pins SVG transforms to the element's own fill box, so the
        // sheet already turns about its centre without an explicit origin.
        style={{ rotate, scale }}
      >
        <rect
          fill="var(--card)"
          height={SYNC_SHEET_HEIGHT}
          stroke="var(--border)"
          strokeWidth={SYNC_DIAGRAM_STROKE}
          width={SYNC_SHEET_WIDTH}
        />
        {RULE_WIDTHS.map((width, rule) => (
          <rect
            fill="var(--border)"
            height={RULE_HEIGHT}
            key={width}
            width={width}
            x={RULE_INSET}
            y={RULE_TOP + rule * RULE_GAP}
          />
        ))}
      </motion.g>
    </motion.g>
  );
}
