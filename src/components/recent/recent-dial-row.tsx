import { type MotionValue, motion } from "motion/react";
import {
  RECENT_ROW_HEIGHT,
  RECENT_ROW_WIDTHS,
  RECENT_ROW_WINDOW,
  RECENT_ROW_X,
  RECENT_ROW_Y,
} from "@/config/recent-mark";
import { useStaggeredEntry } from "@/hooks/use-staggered-entry";

interface RecentDialRowProps {
  index: number;
  progress: MotionValue<number>;
}

export function RecentDialRow({ index, progress }: RecentDialRowProps) {
  const entry = useStaggeredEntry(progress, index, RECENT_ROW_WINDOW);

  return (
    <motion.rect
      fill="var(--muted-foreground)"
      height={RECENT_ROW_HEIGHT}
      rx={RECENT_ROW_HEIGHT / 2}
      // Wipes out from its left edge rather than growing from its middle.
      style={{ originX: 0, scaleX: entry }}
      width={RECENT_ROW_WIDTHS[index]}
      x={RECENT_ROW_X}
      y={RECENT_ROW_Y[index]}
    />
  );
}
