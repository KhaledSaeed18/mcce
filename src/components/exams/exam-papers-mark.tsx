import { motion, useTransform } from "motion/react";
import { ExamPaperSheet } from "@/components/exams/exam-paper-sheet";
import {
  EXAMS_FAN_ANGLES,
  EXAMS_LINE_HEIGHT,
  EXAMS_LINE_WIDTHS,
  EXAMS_LINE_X,
  EXAMS_LINE_Y,
  EXAMS_MARK_HEIGHT,
  EXAMS_MARK_LOOP,
  EXAMS_MARK_STROKE,
  EXAMS_MARK_WIDTH,
  EXAMS_SHEET,
  EXAMS_TAG,
  EXAMS_TAG_RANGE,
} from "@/config/exams-mark";
import { useLoopingProgress } from "@/hooks/use-looping-progress";

const SHEETS = EXAMS_FAN_ANGLES.map((_angle, index) => index);

export function ExamPapersMark() {
  const { progress, opacity } = useLoopingProgress(EXAMS_MARK_LOOP);
  const tag = useTransform(progress, [...EXAMS_TAG_RANGE], [0, 1]);

  return (
    <motion.svg
      aria-hidden="true"
      style={{ opacity }}
      viewBox={`0 0 ${EXAMS_MARK_WIDTH} ${EXAMS_MARK_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {SHEETS.map((sheet) => (
        <ExamPaperSheet index={sheet} key={sheet} progress={progress} />
      ))}

      {/* The front sheet does not cycle, so the fan always has a paper to
       * splay out from. */}
      <rect
        fill="var(--card)"
        height={EXAMS_SHEET.height}
        rx={EXAMS_SHEET.rx}
        stroke="var(--border)"
        strokeWidth={EXAMS_MARK_STROKE}
        width={EXAMS_SHEET.width}
        x={EXAMS_SHEET.x}
        y={EXAMS_SHEET.y}
      />

      {EXAMS_LINE_Y.map((y, index) => (
        <rect
          fill="var(--muted-foreground)"
          height={EXAMS_LINE_HEIGHT}
          key={y}
          rx={EXAMS_LINE_HEIGHT / 2}
          width={EXAMS_LINE_WIDTHS[index]}
          x={EXAMS_LINE_X}
          y={y}
        />
      ))}

      <motion.rect
        fill="var(--primary)"
        height={EXAMS_TAG.height}
        rx={EXAMS_TAG.rx}
        stroke="var(--border)"
        strokeWidth={EXAMS_MARK_STROKE}
        style={{ opacity: tag, scale: tag }}
        width={EXAMS_TAG.width}
        x={EXAMS_TAG.x}
        y={EXAMS_TAG.y}
      />
    </motion.svg>
  );
}
