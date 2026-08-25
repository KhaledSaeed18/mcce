import { type MotionValue, motion, useTransform } from "motion/react";
import {
  ADMISSIONS_BOX_RANGE,
  ADMISSIONS_BOX_RX,
  ADMISSIONS_BOX_SIZE,
  ADMISSIONS_BOX_X,
  ADMISSIONS_CHECK_START,
  ADMISSIONS_DRAW_FADE,
  ADMISSIONS_FIRST_ITEM_Y,
  ADMISSIONS_ITEM_SPACING,
  ADMISSIONS_MARK_STROKE,
  ADMISSIONS_ROW_WINDOW,
  ADMISSIONS_TEXT_HEIGHT,
  ADMISSIONS_TEXT_RANGE,
  ADMISSIONS_TEXT_WIDTH,
  ADMISSIONS_TEXT_X,
} from "@/config/admissions-mark";
import { useStaggeredEntry } from "@/hooks/use-staggered-entry";

interface AdmissionsChecklistItemProps {
  index: number;
  progress: MotionValue<number>;
}

export function AdmissionsChecklistItem({
  index,
  progress,
}: AdmissionsChecklistItemProps) {
  const entry = useStaggeredEntry(progress, index, ADMISSIONS_ROW_WINDOW);
  const box = useTransform(entry, [...ADMISSIONS_BOX_RANGE], [0, 1]);
  const text = useTransform(entry, [...ADMISSIONS_TEXT_RANGE], [0, 1]);
  const checkOpacity = useTransform(
    entry,
    [ADMISSIONS_CHECK_START - ADMISSIONS_DRAW_FADE, ADMISSIONS_CHECK_START],
    [0, 1]
  );
  const checkDraw = useTransform(entry, [ADMISSIONS_CHECK_START, 1], [0, 1]);

  const boxY = ADMISSIONS_FIRST_ITEM_Y + index * ADMISSIONS_ITEM_SPACING;

  return (
    <motion.g>
      <motion.rect
        fill="var(--primary)"
        height={ADMISSIONS_BOX_SIZE}
        rx={ADMISSIONS_BOX_RX}
        stroke="var(--border)"
        strokeWidth={ADMISSIONS_MARK_STROKE}
        style={{ opacity: box }}
        width={ADMISSIONS_BOX_SIZE}
        x={ADMISSIONS_BOX_X}
        y={boxY}
      />
      <motion.rect
        fill="var(--muted-foreground)"
        height={ADMISSIONS_TEXT_HEIGHT}
        ry={ADMISSIONS_TEXT_HEIGHT / 2}
        style={{ originX: 0, scaleX: text }}
        width={ADMISSIONS_TEXT_WIDTH}
        x={ADMISSIONS_TEXT_X}
        y={boxY + (ADMISSIONS_BOX_SIZE - ADMISSIONS_TEXT_HEIGHT) / 2}
      />
      <motion.path
        d={`M ${ADMISSIONS_BOX_X + 2} ${boxY + 4.5} L ${ADMISSIONS_BOX_X + 4} ${
          boxY + 7
        } L ${ADMISSIONS_BOX_X + 7.2} ${boxY + 2}`}
        fill="none"
        stroke="var(--primary-foreground)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={ADMISSIONS_MARK_STROKE}
        style={{ opacity: checkOpacity, pathLength: checkDraw }}
      />
    </motion.g>
  );
}
