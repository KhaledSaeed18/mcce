import { motion, useTransform } from "motion/react";
import { AboutBrandSpoke } from "@/components/about/about-brand-spoke";
import {
  ABOUT_CENTER,
  ABOUT_HUB,
  ABOUT_HUB_RANGE,
  ABOUT_MARK_LOOP,
  ABOUT_MARK_SIZE,
  ABOUT_SPOKES,
} from "@/config/about-mark";
import { useLoopingProgress } from "@/hooks/use-looping-progress";

export function AboutBrandMark() {
  const { progress, opacity } = useLoopingProgress(ABOUT_MARK_LOOP);
  const hub = useTransform(progress, [...ABOUT_HUB_RANGE], [0, 1]);

  return (
    <motion.svg
      aria-hidden="true"
      style={{ opacity }}
      viewBox={`0 0 ${ABOUT_MARK_SIZE} ${ABOUT_MARK_SIZE}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Arms first, so the hub covers where they meet rather than the other
       * way round. */}
      {ABOUT_SPOKES.map((spoke, index) => (
        <AboutBrandSpoke index={index} key={spoke.color} progress={progress} />
      ))}

      <motion.rect
        fill="var(--chart-1)"
        height={ABOUT_HUB.size}
        rx={ABOUT_HUB.rx}
        stroke="var(--border)"
        strokeWidth={ABOUT_HUB.stroke}
        style={{ opacity: hub, scale: hub }}
        width={ABOUT_HUB.size}
        x={ABOUT_CENTER - ABOUT_HUB.size / 2}
        y={ABOUT_CENTER - ABOUT_HUB.size / 2}
      />
    </motion.svg>
  );
}
