import { motion } from "motion/react";
import { ResourcesMarkCard } from "@/components/resources/resources-mark-card";
import {
  RESOURCES_CARD_Y,
  RESOURCES_MARK_HEIGHT,
  RESOURCES_MARK_LOOP,
  RESOURCES_MARK_WIDTH,
} from "@/config/resources/resources-mark";
import { useLoopingProgress } from "@/hooks/use-looping-progress";

const CARDS = RESOURCES_CARD_Y.map((_y, index) => index);

export function ResourcesMark() {
  const { progress, opacity } = useLoopingProgress(RESOURCES_MARK_LOOP);

  return (
    <motion.svg
      aria-hidden="true"
      style={{ opacity }}
      viewBox={`0 0 ${RESOURCES_MARK_WIDTH} ${RESOURCES_MARK_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {CARDS.map((card) => (
        <ResourcesMarkCard index={card} key={card} progress={progress} />
      ))}
    </motion.svg>
  );
}
