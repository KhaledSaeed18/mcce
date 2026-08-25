import { motion } from "motion/react";
import { TuitionCoin } from "@/components/tuition/tuition-coin";
import {
  TUITION_COIN_COUNT,
  TUITION_GROUND,
  TUITION_MARK_HEIGHT,
  TUITION_MARK_LOOP,
  TUITION_MARK_WIDTH,
} from "@/config/tuition-mark";
import { useLoopingProgress } from "@/hooks/use-looping-progress";

const COINS = Array.from({ length: TUITION_COIN_COUNT }, (_coin, i) => i);

export function TuitionStackMark() {
  const { progress, opacity } = useLoopingProgress(TUITION_MARK_LOOP);

  return (
    <motion.svg
      aria-hidden="true"
      style={{ opacity }}
      viewBox={`0 0 ${TUITION_MARK_WIDTH} ${TUITION_MARK_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* The ground does not cycle, so the stack always lands on something. */}
      <rect fill="var(--border)" {...TUITION_GROUND} />

      {/* Bottom coin first, so each new one overlaps the one below it. */}
      {COINS.map((coin) => (
        <TuitionCoin index={coin} key={coin} progress={progress} />
      ))}
    </motion.svg>
  );
}
