import { motion, useTransform } from "motion/react";
import { GpaScoreBar } from "@/components/gpa/gpa-score-bar";
import {
  GPA_BAR_X,
  GPA_BASELINE,
  GPA_BASELINE_Y,
  GPA_CUMULATIVE_Y,
  GPA_LINE_FADE,
  GPA_LINE_FROM,
  GPA_LINE_RANGE,
  GPA_LINE_TO,
  GPA_LINE_WIDTH,
  GPA_MARK_HEIGHT,
  GPA_MARK_LOOP,
  GPA_MARK_STROKE,
  GPA_MARK_WIDTH,
  GPA_MARKER_RANGE,
  GPA_MARKER_RX,
  GPA_MARKER_SIZE,
} from "@/config/gpa-mark";
import { useLoopingProgress } from "@/hooks/use-looping-progress";

const [LINE_START] = GPA_LINE_RANGE;

export function GpaScoreMark() {
  const { progress, opacity } = useLoopingProgress(GPA_MARK_LOOP);
  const draw = useTransform(progress, [...GPA_LINE_RANGE], [0, 1]);
  const lineOpacity = useTransform(
    progress,
    [LINE_START - GPA_LINE_FADE, LINE_START],
    [0, 1]
  );
  const marker = useTransform(progress, [...GPA_MARKER_RANGE], [0, 1]);

  return (
    <motion.svg
      aria-hidden="true"
      style={{ opacity }}
      viewBox={`0 0 ${GPA_MARK_WIDTH} ${GPA_MARK_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* The ground the bars stand on does not cycle, so the mark keeps a
       * stable base while the grades above it come and go. */}
      <rect fill="var(--border)" {...GPA_BASELINE} y={GPA_BASELINE_Y} />

      {GPA_BAR_X.map((x, index) => (
        <GpaScoreBar index={index} key={x} progress={progress} />
      ))}

      <motion.line
        stroke="var(--gpa-cumulative)"
        strokeLinecap="round"
        strokeWidth={GPA_LINE_WIDTH}
        style={{ opacity: lineOpacity, pathLength: draw }}
        x1={GPA_LINE_FROM}
        x2={GPA_LINE_TO}
        y1={GPA_CUMULATIVE_Y}
        y2={GPA_CUMULATIVE_Y}
      />

      <motion.rect
        fill="var(--gpa-cumulative)"
        height={GPA_MARKER_SIZE}
        rx={GPA_MARKER_RX}
        stroke="var(--border)"
        strokeWidth={GPA_MARK_STROKE}
        style={{ opacity: marker, scale: marker }}
        width={GPA_MARKER_SIZE}
        x={GPA_LINE_TO - GPA_MARKER_SIZE / 2}
        y={GPA_CUMULATIVE_Y - GPA_MARKER_SIZE / 2}
      />
    </motion.svg>
  );
}
