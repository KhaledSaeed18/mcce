import { DollarSignIcon } from "lucide-react";
import { type MotionValue, motion, useTransform } from "motion/react";
import {
  TUITION_COIN_BOTTOM_Y,
  TUITION_COIN_CENTER_X,
  TUITION_COIN_DROP,
  TUITION_COIN_GLYPH_SIZE,
  TUITION_COIN_GLYPH_STROKE,
  TUITION_COIN_RX,
  TUITION_COIN_RY,
  TUITION_COIN_SPACING,
  TUITION_COIN_WINDOW,
  TUITION_MARK_STROKE,
} from "@/config/tuition-mark";
import { useStaggeredEntry } from "@/hooks/use-staggered-entry";

interface TuitionCoinProps {
  index: number;
  progress: MotionValue<number>;
}

export function TuitionCoin({ index, progress }: TuitionCoinProps) {
  const entry = useStaggeredEntry(progress, index, TUITION_COIN_WINDOW);
  const y = useTransform(entry, [0, 1], [-TUITION_COIN_DROP, 0]);
  const centerY = TUITION_COIN_BOTTOM_Y - index * TUITION_COIN_SPACING;

  return (
    <motion.g style={{ opacity: entry, y }}>
      <ellipse
        cx={TUITION_COIN_CENTER_X}
        cy={centerY}
        fill="var(--primary)"
        rx={TUITION_COIN_RX}
        ry={TUITION_COIN_RY}
        stroke="var(--border)"
        strokeWidth={TUITION_MARK_STROKE}
      />
      {/* Nested so the icon scales into the coin's own units. */}
      <DollarSignIcon
        height={TUITION_COIN_GLYPH_SIZE}
        stroke="var(--border)"
        strokeWidth={TUITION_COIN_GLYPH_STROKE}
        width={TUITION_COIN_GLYPH_SIZE}
        x={TUITION_COIN_CENTER_X - TUITION_COIN_GLYPH_SIZE / 2}
        y={centerY - TUITION_COIN_GLYPH_SIZE / 2}
      />
    </motion.g>
  );
}
