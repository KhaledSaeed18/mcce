import { motion, useTransform } from "motion/react";
import { CceYearRow } from "@/components/cce/cce-year-row";
import {
  CCE_BRIDGE_FADE,
  CCE_BRIDGE_RANGE,
  CCE_GROUND,
  CCE_JOIN,
  CCE_JOIN_RANGE,
  CCE_JOIN_RX,
  CCE_MARK_HEIGHT,
  CCE_MARK_LOOP,
  CCE_MARK_STROKE,
  CCE_MARK_WIDTH,
  CCE_TRACK_FADE,
  CCE_TRACK_FROM_Y,
  CCE_TRACK_RANGE,
  CCE_TRACK_TO_Y,
  CCE_TRACK_X,
  CCE_YEAR_Y,
} from "@/config/cce-mark";
import { useLoopingProgress } from "@/hooks/use-looping-progress";

const YEARS = CCE_YEAR_Y.map((_y, index) => index);

export function CceTracksMark() {
  const { progress, opacity } = useLoopingProgress(CCE_MARK_LOOP);
  const trackDraw = useTransform(progress, [...CCE_TRACK_RANGE], [0, 1]);
  const trackOpacity = useTransform(
    progress,
    [CCE_TRACK_RANGE[0] - CCE_TRACK_FADE, CCE_TRACK_RANGE[0]],
    [0, 1]
  );
  const bridgeDraw = useTransform(progress, [...CCE_BRIDGE_RANGE], [0, 1]);
  const bridgeOpacity = useTransform(
    progress,
    [CCE_BRIDGE_RANGE[0] - CCE_BRIDGE_FADE, CCE_BRIDGE_RANGE[0]],
    [0, 1]
  );
  const join = useTransform(progress, [...CCE_JOIN_RANGE], [0, 1]);

  return (
    <motion.svg
      aria-hidden="true"
      style={{ opacity }}
      viewBox={`0 0 ${CCE_MARK_WIDTH} ${CCE_MARK_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* The ground does not cycle, so the tracks always land somewhere. */}
      <rect fill="var(--border)" {...CCE_GROUND} />

      {/* Both tracks draw down together, one per program. */}
      {CCE_TRACK_X.map((x) => (
        <motion.line
          key={x}
          stroke="var(--border)"
          strokeLinecap="round"
          strokeWidth={CCE_MARK_STROKE}
          style={{ opacity: trackOpacity, pathLength: trackDraw }}
          x1={x}
          x2={x}
          y1={CCE_TRACK_FROM_Y}
          y2={CCE_TRACK_TO_Y}
        />
      ))}

      {YEARS.map((year) => (
        <CceYearRow index={year} key={year} progress={progress} />
      ))}

      {/* The two programs meet in one shared node on the ground. */}
      <motion.line
        stroke="var(--border)"
        strokeLinecap="round"
        strokeWidth={CCE_MARK_STROKE}
        style={{ opacity: bridgeOpacity, pathLength: bridgeDraw }}
        x1={CCE_TRACK_X[0]}
        x2={CCE_TRACK_X[1]}
        y1={CCE_TRACK_TO_Y}
        y2={CCE_TRACK_TO_Y}
      />
      <motion.rect
        fill="var(--primary)"
        height={CCE_JOIN.size}
        rx={CCE_JOIN_RX}
        stroke="var(--border)"
        strokeWidth={CCE_MARK_STROKE}
        style={{ opacity: join, scale: join }}
        width={CCE_JOIN.size}
        x={CCE_JOIN.x}
        y={CCE_JOIN.y}
      />
    </motion.svg>
  );
}
