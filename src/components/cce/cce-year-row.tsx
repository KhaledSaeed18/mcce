import { type MotionValue, motion } from "motion/react";
import {
  CCE_MARK_STROKE,
  CCE_NODE_COLORS,
  CCE_NODE_RX,
  CCE_NODE_SIZE,
  CCE_NODE_X,
  CCE_YEAR_WINDOW,
  CCE_YEAR_Y,
} from "@/config/cce-mark";
import { useStaggeredEntry } from "@/hooks/use-staggered-entry";

interface CceYearRowProps {
  index: number;
  progress: MotionValue<number>;
}

export function CceYearRow({ index, progress }: CceYearRowProps) {
  const entry = useStaggeredEntry(progress, index, CCE_YEAR_WINDOW);

  return (
    <motion.g>
      {CCE_NODE_X.map((x, column) => (
        <motion.rect
          fill={CCE_NODE_COLORS[column]}
          height={CCE_NODE_SIZE}
          key={x}
          rx={CCE_NODE_RX}
          stroke="var(--border)"
          strokeWidth={CCE_MARK_STROKE}
          style={{ opacity: entry, scale: entry }}
          width={CCE_NODE_SIZE}
          x={x}
          y={CCE_YEAR_Y[index]}
        />
      ))}
    </motion.g>
  );
}
