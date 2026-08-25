import { motion, useTransform } from "motion/react";
import {
  LEGAL_BODY,
  LEGAL_BODY_STROKE,
  LEGAL_KEYHOLE_CENTER,
  LEGAL_KEYHOLE_RADIUS,
  LEGAL_KEYHOLE_RANGE,
  LEGAL_KEYHOLE_STEM_TO_Y,
  LEGAL_KEYHOLE_STROKE,
  LEGAL_MARK_HEIGHT,
  LEGAL_MARK_LOOP,
  LEGAL_MARK_WIDTH,
  LEGAL_SHACKLE_DROP_RANGE,
  LEGAL_SHACKLE_LEFT_X,
  LEGAL_SHACKLE_LIFT,
  LEGAL_SHACKLE_RIGHT_X,
  LEGAL_SHACKLE_STROKE,
  LEGAL_SHACKLE_TOP_Y,
} from "@/config/legal-mark";
import { useLoopingProgress } from "@/hooks/use-looping-progress";

export function LegalPadlockMark() {
  const { progress, opacity } = useLoopingProgress(LEGAL_MARK_LOOP);
  const drop = useTransform(
    progress,
    [...LEGAL_SHACKLE_DROP_RANGE],
    [-LEGAL_SHACKLE_LIFT, 0]
  );
  const keyhole = useTransform(progress, [...LEGAL_KEYHOLE_RANGE], [0, 1]);
  const { x, y } = LEGAL_KEYHOLE_CENTER;

  return (
    <motion.svg
      aria-hidden="true"
      style={{ opacity }}
      viewBox={`0 0 ${LEGAL_MARK_WIDTH} ${LEGAL_MARK_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* The body does not cycle, so the lock always has its frame. */}
      <rect
        fill="var(--card)"
        height={LEGAL_BODY.height}
        rx={LEGAL_BODY.rx}
        stroke="var(--border)"
        strokeWidth={LEGAL_BODY_STROKE}
        width={LEGAL_BODY.width}
        x={LEGAL_BODY.x}
        y={LEGAL_BODY.y}
      />

      {/* Open at rest, then drops shut over the body. */}
      <motion.path
        d={`M ${LEGAL_SHACKLE_LEFT_X} ${LEGAL_BODY.y} L ${LEGAL_SHACKLE_LEFT_X} ${LEGAL_SHACKLE_TOP_Y} A 10 10 0 0 1 ${LEGAL_SHACKLE_RIGHT_X} ${LEGAL_SHACKLE_TOP_Y} L ${LEGAL_SHACKLE_RIGHT_X} ${LEGAL_BODY.y}`}
        fill="none"
        stroke="var(--border)"
        strokeLinecap="round"
        strokeWidth={LEGAL_SHACKLE_STROKE}
        style={{ y: drop }}
      />

      <motion.g style={{ opacity: keyhole, scale: keyhole }}>
        <circle cx={x} cy={y} fill="var(--primary)" r={LEGAL_KEYHOLE_RADIUS} />
        <line
          stroke="var(--primary)"
          strokeLinecap="round"
          strokeWidth={LEGAL_KEYHOLE_STROKE}
          x1={x}
          x2={x}
          y1={y + 2}
          y2={LEGAL_KEYHOLE_STEM_TO_Y}
        />
      </motion.g>
    </motion.svg>
  );
}
