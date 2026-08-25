import { type MotionValue, motion } from "motion/react";
import {
  PLAN_BAR_HEIGHT,
  PLAN_BAR_X,
  PLAN_MARKER_SIZE,
  PLAN_MARKER_X,
  PLAN_ROW_WINDOW,
  PLAN_ROWS,
} from "@/config/plan-mark";
import { useStaggeredEntry } from "@/hooks/use-staggered-entry";

interface CurriculumPlanRowProps {
  index: number;
  progress: MotionValue<number>;
}

export function CurriculumPlanRow({ index, progress }: CurriculumPlanRowProps) {
  const row = PLAN_ROWS[index];
  const entry = useStaggeredEntry(progress, index, PLAN_ROW_WINDOW);
  const markerY = row.centerY - PLAN_MARKER_SIZE / 2;

  return (
    <motion.g style={{ opacity: entry }}>
      <motion.rect
        fill="var(--primary-foreground)"
        height={PLAN_MARKER_SIZE}
        rx={1}
        style={{
          scale: entry,
          transformOrigin: `${PLAN_MARKER_X + PLAN_MARKER_SIZE / 2}px ${row.centerY}px`,
        }}
        width={PLAN_MARKER_SIZE}
        x={PLAN_MARKER_X}
        y={markerY}
      />
      <motion.rect
        fill="var(--primary-foreground)"
        height={PLAN_BAR_HEIGHT}
        rx={1.75}
        style={{
          scaleX: entry,
          transformOrigin: `${PLAN_BAR_X}px ${row.centerY}px`,
        }}
        width={row.barWidth}
        x={PLAN_BAR_X}
        y={row.centerY - PLAN_BAR_HEIGHT / 2}
      />
    </motion.g>
  );
}
