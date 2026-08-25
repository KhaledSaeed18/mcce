import { type MotionValue, motion } from "motion/react";
import {
  GPA_BAR_HEIGHTS,
  GPA_BAR_RX,
  GPA_BAR_WIDTH,
  GPA_BAR_WINDOW,
  GPA_BAR_X,
  GPA_BASELINE_Y,
  GPA_MARK_STROKE,
} from "@/config/gpa-mark";
import { useStaggeredEntry } from "@/hooks/use-staggered-entry";

interface GpaScoreBarProps {
  index: number;
  progress: MotionValue<number>;
}

export function GpaScoreBar({ index, progress }: GpaScoreBarProps) {
  const height = GPA_BAR_HEIGHTS[index];
  const entry = useStaggeredEntry(progress, index, GPA_BAR_WINDOW);

  return (
    <motion.rect
      fill="var(--gpa-semester)"
      height={height}
      rx={GPA_BAR_RX}
      stroke="var(--border)"
      strokeWidth={GPA_MARK_STROKE}
      // Grows up off the baseline rather than out of its own middle.
      style={{ originY: 1, scaleY: entry }}
      width={GPA_BAR_WIDTH}
      x={GPA_BAR_X[index]}
      y={GPA_BASELINE_Y - height}
    />
  );
}
