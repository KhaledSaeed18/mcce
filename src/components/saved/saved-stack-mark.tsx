import { motion, useTransform } from "motion/react";
import { SavedCard } from "@/components/saved/saved-card";
import {
  SAVED_CARD_Y,
  SAVED_MARK_HEIGHT,
  SAVED_MARK_LOOP,
  SAVED_MARK_STROKE,
  SAVED_MARK_WIDTH,
  SAVED_RIBBON_HEIGHT,
  SAVED_RIBBON_NOTCH,
  SAVED_RIBBON_RANGE,
  SAVED_RIBBON_WIDTH,
  SAVED_RIBBON_X,
  SAVED_RIBBON_Y,
  SAVED_SHELF,
} from "@/config/saved-mark";
import { useLoopingProgress } from "@/hooks/use-looping-progress";

const CARDS = SAVED_CARD_Y.map((_y, index) => index);

const RIBBON_HALF = SAVED_RIBBON_WIDTH / 2;
const RIBBON_PATH = `M ${SAVED_RIBBON_X} ${SAVED_RIBBON_Y} h ${SAVED_RIBBON_WIDTH} v ${SAVED_RIBBON_HEIGHT} l -${RIBBON_HALF} -${SAVED_RIBBON_NOTCH} l -${RIBBON_HALF} ${SAVED_RIBBON_NOTCH} z`;

export function SavedStackMark() {
  const { progress, opacity } = useLoopingProgress(SAVED_MARK_LOOP);
  const ribbon = useTransform(progress, [...SAVED_RIBBON_RANGE], [0, 1]);

  return (
    <motion.svg
      aria-hidden="true"
      style={{ opacity }}
      viewBox={`0 0 ${SAVED_MARK_WIDTH} ${SAVED_MARK_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* The shelf does not cycle, so the pile always has a base. */}
      <rect fill="var(--border)" {...SAVED_SHELF} />

      {CARDS.map((card) => (
        <SavedCard index={card} key={card} progress={progress} />
      ))}

      <motion.path
        d={RIBBON_PATH}
        fill="var(--primary)"
        stroke="var(--border)"
        strokeLinejoin="round"
        strokeWidth={SAVED_MARK_STROKE}
        // Drops down over the front card rather than growing from its middle.
        style={{ originY: 0, scaleY: ribbon }}
      />
    </motion.svg>
  );
}
