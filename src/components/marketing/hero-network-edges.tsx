import { motion, useReducedMotion } from "motion/react";
import {
  HERO_GRAPHIC_HUB,
  HERO_GRAPHIC_LEAVES,
  HERO_GRAPHIC_TOOLS,
} from "@/config/hero";

export function HeroNetworkEdges() {
  const shouldReduceMotion = useReducedMotion();
  const initialOpacity = shouldReduceMotion ? 1 : 0;

  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      {HERO_GRAPHIC_LEAVES.map((leaf, index) => (
        <motion.line
          animate={{ opacity: 1 }}
          initial={{ opacity: initialOpacity }}
          key={leaf.label}
          stroke="var(--border)"
          strokeWidth={1.5}
          transition={{ delay: 0.15 * index, duration: 0.3 }}
          vectorEffect="non-scaling-stroke"
          x1={HERO_GRAPHIC_HUB.x}
          x2={leaf.x}
          y1={HERO_GRAPHIC_HUB.y}
          y2={leaf.y}
        />
      ))}

      {HERO_GRAPHIC_TOOLS.map((tool, index) => (
        <motion.line
          animate={{ opacity: 1 }}
          initial={{ opacity: initialOpacity }}
          key={tool.label}
          stroke="var(--border)"
          strokeDasharray="4 4"
          strokeWidth={1.5}
          transition={{ delay: 0.5 + 0.1 * index, duration: 0.3 }}
          vectorEffect="non-scaling-stroke"
          x1={HERO_GRAPHIC_HUB.x}
          x2={tool.x}
          y1={HERO_GRAPHIC_HUB.y}
          y2={tool.y}
        />
      ))}
    </svg>
  );
}
