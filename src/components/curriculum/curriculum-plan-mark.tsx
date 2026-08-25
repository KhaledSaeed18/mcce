import { motion, useTransform } from "motion/react";
import { CurriculumPlanRow } from "@/components/curriculum/curriculum-plan-row";
import {
  PLAN_BOARD,
  PLAN_BOARD_SHADOW_OFFSET,
  PLAN_CLIP,
  PLAN_LINK_FADE,
  PLAN_LINK_PATH,
  PLAN_LINK_RANGE,
  PLAN_LINK_WIDTH,
  PLAN_MARK_HEIGHT,
  PLAN_MARK_LOOP,
  PLAN_MARK_STROKE,
  PLAN_MARK_WIDTH,
  PLAN_ROWS,
} from "@/config/plan-mark";
import { useLoopingProgress } from "@/hooks/use-looping-progress";

export function CurriculumPlanMark() {
  const { progress, opacity } = useLoopingProgress(PLAN_MARK_LOOP);
  const [linkStart] = PLAN_LINK_RANGE;
  const linkLength = useTransform(progress, [...PLAN_LINK_RANGE], [0, 1]);
  const linkOpacity = useTransform(
    progress,
    [linkStart - PLAN_LINK_FADE, linkStart],
    [0, 1]
  );

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${PLAN_MARK_WIDTH} ${PLAN_MARK_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* The board itself never cycles. Only what is written on it does, so the
       * page keeps a stable silhouette in the corner of the eye. */}
      <rect
        fill="var(--border)"
        {...PLAN_BOARD}
        x={PLAN_BOARD.x + PLAN_BOARD_SHADOW_OFFSET}
        y={PLAN_BOARD.y + PLAN_BOARD_SHADOW_OFFSET}
      />
      <rect
        fill="var(--border)"
        {...PLAN_CLIP}
        x={PLAN_CLIP.x + PLAN_BOARD_SHADOW_OFFSET}
        y={PLAN_CLIP.y + PLAN_BOARD_SHADOW_OFFSET}
      />

      <rect
        fill="var(--primary)"
        stroke="var(--border)"
        strokeWidth={PLAN_MARK_STROKE}
        {...PLAN_BOARD}
      />
      <rect
        fill="var(--primary)"
        stroke="var(--border)"
        strokeWidth={PLAN_MARK_STROKE}
        {...PLAN_CLIP}
      />

      <motion.g style={{ opacity }}>
        {PLAN_ROWS.map((row, index) => (
          <CurriculumPlanRow
            index={index}
            key={row.centerY}
            progress={progress}
          />
        ))}

        <motion.path
          d={PLAN_LINK_PATH}
          fill="none"
          stroke="var(--primary-foreground)"
          strokeLinecap="round"
          strokeWidth={PLAN_LINK_WIDTH}
          style={{ opacity: linkOpacity, pathLength: linkLength }}
        />
      </motion.g>
    </svg>
  );
}
