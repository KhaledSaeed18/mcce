import { type MotionValue, motion, useTransform } from "motion/react";
import {
  RESOURCES_CARD,
  RESOURCES_CARD_SLIDE,
  RESOURCES_CARD_WINDOW,
  RESOURCES_CARD_Y,
  RESOURCES_LINE,
  RESOURCES_MARK_STROKE,
  RESOURCES_PILL,
  RESOURCES_PILL_COLORS,
  RESOURCES_PILL_WINDOW,
  RESOURCES_TILE,
} from "@/config/resources/resources-mark";
import { useStaggeredEntry } from "@/hooks/use-staggered-entry";

interface ResourcesMarkCardProps {
  index: number;
  progress: MotionValue<number>;
}

/** One card in the mark: slides up into place, then its cost pill pops on. */
export function ResourcesMarkCard({ index, progress }: ResourcesMarkCardProps) {
  const entry = useStaggeredEntry(progress, index, RESOURCES_CARD_WINDOW);
  const pill = useStaggeredEntry(progress, index, RESOURCES_PILL_WINDOW);
  const y = useTransform(entry, [0, 1], [RESOURCES_CARD_SLIDE, 0]);
  const cardY = RESOURCES_CARD_Y[index];

  return (
    <motion.g style={{ opacity: entry, y }}>
      <rect
        fill="var(--card)"
        height={RESOURCES_CARD.height}
        rx={RESOURCES_CARD.rx}
        stroke="var(--border)"
        strokeWidth={RESOURCES_MARK_STROKE}
        width={RESOURCES_CARD.width}
        x={RESOURCES_CARD.x}
        y={cardY}
      />
      <rect
        fill="var(--primary)"
        height={RESOURCES_TILE.size}
        rx={RESOURCES_TILE.rx}
        stroke="var(--border)"
        strokeWidth={RESOURCES_MARK_STROKE}
        width={RESOURCES_TILE.size}
        x={RESOURCES_CARD.x + RESOURCES_TILE.inset}
        y={cardY + RESOURCES_TILE.inset}
      />
      <rect
        fill="var(--muted-foreground)"
        height={RESOURCES_LINE.height}
        rx={RESOURCES_LINE.rx}
        width={RESOURCES_LINE.width}
        x={RESOURCES_LINE.x}
        y={cardY + RESOURCES_TILE.inset + 2}
      />
      <motion.rect
        fill={`var(--${RESOURCES_PILL_COLORS[index]})`}
        height={RESOURCES_PILL.height}
        rx={RESOURCES_PILL.rx}
        stroke="var(--border)"
        strokeWidth={RESOURCES_MARK_STROKE}
        style={{ opacity: pill, scale: pill }}
        width={RESOURCES_PILL.width}
        x={RESOURCES_PILL.x}
        y={cardY + (RESOURCES_CARD.height - RESOURCES_PILL.height) / 2}
      />
    </motion.g>
  );
}
