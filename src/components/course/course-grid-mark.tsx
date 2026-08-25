import { motion, useTransform } from "motion/react";
import { CourseGridTile } from "@/components/course/course-grid-tile";
import {
  COURSE_BOARD,
  COURSE_HIGHLIGHT,
  COURSE_HIGHLIGHT_RANGE,
  COURSE_MARK_HEIGHT,
  COURSE_MARK_LOOP,
  COURSE_MARK_STROKE,
  COURSE_MARK_WIDTH,
  COURSE_TILE_HEIGHT,
  COURSE_TILE_RX,
  COURSE_TILE_WIDTH,
  COURSE_TILE_X,
  COURSE_TILE_Y,
} from "@/config/course-mark";
import { useLoopingProgress } from "@/hooks/use-looping-progress";

const CELLS = COURSE_TILE_Y.flatMap((_y, row) =>
  COURSE_TILE_X.map((_x, col) => ({ col, row }))
);

export function CourseGridMark() {
  const { progress, opacity } = useLoopingProgress(COURSE_MARK_LOOP);
  const highlight = useTransform(progress, [...COURSE_HIGHLIGHT_RANGE], [0, 1]);

  return (
    <motion.svg
      aria-hidden="true"
      style={{ opacity }}
      viewBox={`0 0 ${COURSE_MARK_WIDTH} ${COURSE_MARK_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* The board does not cycle, so the catalogue always has a page. */}
      <rect
        fill="var(--muted)"
        {...COURSE_BOARD}
        stroke="var(--border)"
        strokeWidth={COURSE_MARK_STROKE}
      />

      {CELLS.map((cell) => (
        <CourseGridTile
          col={cell.col}
          key={`${cell.row}-${cell.col}`}
          progress={progress}
          row={cell.row}
        />
      ))}

      {/* Sits over the tile already in that slot, so the pick reads as one of
       * the courses rather than a fourteenth one. */}
      <motion.rect
        fill="var(--primary)"
        height={COURSE_TILE_HEIGHT}
        rx={COURSE_TILE_RX}
        stroke="var(--border)"
        strokeWidth={COURSE_MARK_STROKE}
        style={{ opacity: highlight, scale: highlight }}
        width={COURSE_TILE_WIDTH}
        x={COURSE_TILE_X[COURSE_HIGHLIGHT.col]}
        y={COURSE_TILE_Y[COURSE_HIGHLIGHT.row]}
      />
    </motion.svg>
  );
}
