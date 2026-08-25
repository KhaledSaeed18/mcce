import { type MotionValue, motion } from "motion/react";
import {
  COURSE_MARK_STROKE,
  COURSE_TILE_HEIGHT,
  COURSE_TILE_RX,
  COURSE_TILE_WIDTH,
  COURSE_TILE_WINDOW,
  COURSE_TILE_X,
  COURSE_TILE_Y,
} from "@/config/course-mark";
import { useStaggeredEntry } from "@/hooks/use-staggered-entry";

interface CourseGridTileProps {
  col: number;
  progress: MotionValue<number>;
  row: number;
}

export function CourseGridTile({ col, progress, row }: CourseGridTileProps) {
  const entry = useStaggeredEntry(progress, col + row, COURSE_TILE_WINDOW);

  return (
    <motion.rect
      fill="var(--card)"
      height={COURSE_TILE_HEIGHT}
      rx={COURSE_TILE_RX}
      stroke="var(--border)"
      strokeWidth={COURSE_MARK_STROKE}
      style={{ opacity: entry, scale: entry }}
      width={COURSE_TILE_WIDTH}
      x={COURSE_TILE_X[col]}
      y={COURSE_TILE_Y[row]}
    />
  );
}
