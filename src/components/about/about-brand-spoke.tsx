import { type MotionValue, motion, useTransform } from "motion/react";
import {
  ABOUT_CENTER,
  ABOUT_NODE,
  ABOUT_NODE_WINDOW,
  ABOUT_SPOKE_FADE,
  ABOUT_SPOKE_WIDTH,
  ABOUT_SPOKE_WINDOW,
  ABOUT_SPOKES,
} from "@/config/about-mark";
import { useStaggeredEntry } from "@/hooks/use-staggered-entry";

interface AboutBrandSpokeProps {
  index: number;
  progress: MotionValue<number>;
}

/** One arm of the mark: the line reaches out from the hub, then its node lands
 * on the end of it. */
export function AboutBrandSpoke({ index, progress }: AboutBrandSpokeProps) {
  const spoke = ABOUT_SPOKES[index];
  const reach = useStaggeredEntry(progress, index, ABOUT_SPOKE_WINDOW);
  const land = useStaggeredEntry(progress, index, ABOUT_NODE_WINDOW);

  const drawsAt = ABOUT_SPOKE_WINDOW.start + index * ABOUT_SPOKE_WINDOW.stagger;
  const lineOpacity = useTransform(
    progress,
    [drawsAt - ABOUT_SPOKE_FADE, drawsAt],
    [0, 1]
  );

  return (
    <g>
      <motion.line
        stroke="var(--border)"
        strokeLinecap="square"
        strokeWidth={ABOUT_SPOKE_WIDTH}
        style={{ opacity: lineOpacity, pathLength: reach }}
        x1={ABOUT_CENTER}
        x2={spoke.x}
        y1={ABOUT_CENTER}
        y2={spoke.y}
      />
      <motion.rect
        fill={`var(--${spoke.color})`}
        height={ABOUT_NODE.size}
        rx={ABOUT_NODE.rx}
        stroke="var(--border)"
        strokeWidth={ABOUT_NODE.stroke}
        style={{ opacity: land, scale: land }}
        width={ABOUT_NODE.size}
        x={spoke.x - ABOUT_NODE.size / 2}
        y={spoke.y - ABOUT_NODE.size / 2}
      />
    </g>
  );
}
