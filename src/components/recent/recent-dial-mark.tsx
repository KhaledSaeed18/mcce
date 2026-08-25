import { motion, useTransform } from "motion/react";
import { RecentDialRow } from "@/components/recent/recent-dial-row";
import {
  RECENT_BADGE_RANGE,
  RECENT_BADGE_RX,
  RECENT_BADGE_SIZE,
  RECENT_DIAL,
  RECENT_MARK_HEIGHT,
  RECENT_MARK_LOOP,
  RECENT_MARK_STROKE,
  RECENT_MARK_WIDTH,
  RECENT_ROW_Y,
  RECENT_SWEEP_FADE,
  RECENT_SWEEP_GAP,
  RECENT_SWEEP_RANGE,
  RECENT_SWEEP_WIDTH,
} from "@/config/recent-mark";
import { useLoopingProgress } from "@/hooks/use-looping-progress";

const ROWS = RECENT_ROW_Y.map((_y, index) => index);

const [SWEEP_START] = RECENT_SWEEP_RANGE;
const NOON_Y = RECENT_DIAL.cy - RECENT_DIAL.r;
const SWEEP_PATH = `M ${RECENT_DIAL.cx} ${NOON_Y} A ${RECENT_DIAL.r} ${RECENT_DIAL.r} 0 1 1 ${RECENT_DIAL.cx - RECENT_SWEEP_GAP} ${NOON_Y}`;

export function RecentDialMark() {
  const { progress, opacity } = useLoopingProgress(RECENT_MARK_LOOP);
  const sweep = useTransform(progress, [...RECENT_SWEEP_RANGE], [0, 1]);
  const sweepOpacity = useTransform(
    progress,
    [SWEEP_START - RECENT_SWEEP_FADE, SWEEP_START],
    [0, 1]
  );
  const badge = useTransform(progress, [...RECENT_BADGE_RANGE], [0, 1]);

  return (
    <motion.svg
      aria-hidden="true"
      style={{ opacity }}
      viewBox={`0 0 ${RECENT_MARK_WIDTH} ${RECENT_MARK_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* The dial does not cycle, so the sweep always has a face to run on. */}
      <circle
        {...RECENT_DIAL}
        fill="var(--card)"
        stroke="var(--border)"
        strokeWidth={RECENT_MARK_STROKE}
      />

      {ROWS.map((row) => (
        <RecentDialRow index={row} key={row} progress={progress} />
      ))}

      <motion.path
        d={SWEEP_PATH}
        fill="none"
        stroke="var(--primary)"
        strokeLinecap="round"
        strokeWidth={RECENT_SWEEP_WIDTH}
        style={{ opacity: sweepOpacity, pathLength: sweep }}
      />

      <motion.rect
        fill="var(--chart-2)"
        height={RECENT_BADGE_SIZE}
        rx={RECENT_BADGE_RX}
        stroke="var(--border)"
        strokeWidth={RECENT_MARK_STROKE}
        style={{ opacity: badge, scale: badge }}
        width={RECENT_BADGE_SIZE}
        x={RECENT_DIAL.cx - RECENT_BADGE_SIZE / 2}
        y={NOON_Y - RECENT_BADGE_SIZE / 2}
      />
    </motion.svg>
  );
}
