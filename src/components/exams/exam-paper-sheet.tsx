import { type MotionValue, motion, useTransform } from "motion/react";
import {
  EXAMS_FAN_ANGLES,
  EXAMS_FAN_WINDOW,
  EXAMS_MARK_STROKE,
  EXAMS_SHEET,
} from "@/config/exams-mark";
import { useStaggeredEntry } from "@/hooks/use-staggered-entry";

interface ExamPaperSheetProps {
  index: number;
  progress: MotionValue<number>;
}

/** One paper behind the front sheet. It starts squared up with the front
 * sheet, so the pile reads as one paper until the fan splays it out. */
export function ExamPaperSheet({ index, progress }: ExamPaperSheetProps) {
  const entry = useStaggeredEntry(progress, index, EXAMS_FAN_WINDOW);
  const rotate = useTransform(entry, [0, 1], [0, EXAMS_FAN_ANGLES[index]]);

  return (
    <motion.rect
      fill="var(--card)"
      height={EXAMS_SHEET.height}
      rx={EXAMS_SHEET.rx}
      stroke="var(--border)"
      strokeWidth={EXAMS_MARK_STROKE}
      // Turns on its bottom edge, the way a hand of cards opens.
      style={{ originX: 0.5, originY: 1, rotate }}
      width={EXAMS_SHEET.width}
      x={EXAMS_SHEET.x}
      y={EXAMS_SHEET.y}
    />
  );
}
