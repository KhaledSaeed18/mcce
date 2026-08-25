import { motion, useTransform } from "motion/react";
import { AdmissionsChecklistItem } from "@/components/admissions/admissions-checklist-item";
import {
  ADMISSIONS_DRAW_FADE,
  ADMISSIONS_ITEM_COUNT,
  ADMISSIONS_MARK_HEIGHT,
  ADMISSIONS_MARK_LOOP,
  ADMISSIONS_MARK_STROKE,
  ADMISSIONS_MARK_WIDTH,
  ADMISSIONS_PAPER,
  ADMISSIONS_STAMP_CENTER,
  ADMISSIONS_STAMP_CHECK_START,
  ADMISSIONS_STAMP_RADIUS,
  ADMISSIONS_STAMP_RANGE,
} from "@/config/admissions-mark";
import { useLoopingProgress } from "@/hooks/use-looping-progress";

const ITEMS = Array.from({ length: ADMISSIONS_ITEM_COUNT }, (_item, i) => i);

export function AdmissionsChecklistMark() {
  const { progress, opacity } = useLoopingProgress(ADMISSIONS_MARK_LOOP);
  const stamp = useTransform(progress, [...ADMISSIONS_STAMP_RANGE], [0, 1]);
  const stampCheckOpacity = useTransform(
    stamp,
    [
      ADMISSIONS_STAMP_CHECK_START - ADMISSIONS_DRAW_FADE,
      ADMISSIONS_STAMP_CHECK_START,
    ],
    [0, 1]
  );
  const stampCheckDraw = useTransform(
    stamp,
    [ADMISSIONS_STAMP_CHECK_START, 1],
    [0, 1]
  );
  const { x, y } = ADMISSIONS_STAMP_CENTER;

  return (
    <motion.svg
      aria-hidden="true"
      style={{ opacity }}
      viewBox={`0 0 ${ADMISSIONS_MARK_WIDTH} ${ADMISSIONS_MARK_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* The paper does not cycle, so the list always has somewhere to sit. */}
      <rect
        fill="var(--card)"
        height={ADMISSIONS_PAPER.height}
        rx={ADMISSIONS_PAPER.rx}
        stroke="var(--border)"
        strokeWidth={ADMISSIONS_MARK_STROKE}
        width={ADMISSIONS_PAPER.width}
        x={ADMISSIONS_PAPER.x}
        y={ADMISSIONS_PAPER.y}
      />

      {ITEMS.map((item) => (
        <AdmissionsChecklistItem index={item} key={item} progress={progress} />
      ))}

      {/* Centered under the last row, in the space the list leaves free. */}
      <motion.g style={{ opacity: stamp, scale: stamp }}>
        <motion.circle
          cx={x}
          cy={y}
          fill="none"
          r={ADMISSIONS_STAMP_RADIUS}
          stroke="var(--chart-2)"
          strokeWidth={ADMISSIONS_MARK_STROKE}
        />
        <motion.path
          d={`M ${x - 4.5} ${y} L ${x - 1.5} ${y + 3} L ${x + 4.5} ${y - 3}`}
          fill="none"
          stroke="var(--chart-2)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={ADMISSIONS_MARK_STROKE}
          style={{ opacity: stampCheckOpacity, pathLength: stampCheckDraw }}
        />
      </motion.g>
    </motion.svg>
  );
}
