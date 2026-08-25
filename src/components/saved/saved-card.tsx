import { type MotionValue, motion, useTransform } from "motion/react";
import {
  SAVED_CARD_HEIGHT,
  SAVED_CARD_RISE,
  SAVED_CARD_RX,
  SAVED_CARD_WIDTH,
  SAVED_CARD_WINDOW,
  SAVED_CARD_X,
  SAVED_CARD_Y,
  SAVED_LABEL_HEIGHT,
  SAVED_LABEL_INSET,
  SAVED_LABEL_WIDTH,
  SAVED_MARK_STROKE,
} from "@/config/saved-mark";
import { useStaggeredEntry } from "@/hooks/use-staggered-entry";

interface SavedCardProps {
  index: number;
  progress: MotionValue<number>;
}

export function SavedCard({ index, progress }: SavedCardProps) {
  const entry = useStaggeredEntry(progress, index, SAVED_CARD_WINDOW);
  const rise = useTransform(entry, [0, 1], [SAVED_CARD_RISE, 0]);
  const cardY = SAVED_CARD_Y[index];

  return (
    <motion.g style={{ opacity: entry, y: rise }}>
      <rect
        fill="var(--card)"
        height={SAVED_CARD_HEIGHT}
        rx={SAVED_CARD_RX}
        stroke="var(--border)"
        strokeWidth={SAVED_MARK_STROKE}
        width={SAVED_CARD_WIDTH}
        x={SAVED_CARD_X}
        y={cardY}
      />
      <rect
        fill="var(--muted-foreground)"
        height={SAVED_LABEL_HEIGHT}
        rx={SAVED_LABEL_HEIGHT / 2}
        width={SAVED_LABEL_WIDTH}
        x={SAVED_CARD_X + SAVED_LABEL_INSET}
        y={cardY + (SAVED_CARD_HEIGHT - SAVED_LABEL_HEIGHT) / 2}
      />
    </motion.g>
  );
}
