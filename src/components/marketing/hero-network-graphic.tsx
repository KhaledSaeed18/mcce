import { motion, useReducedMotion } from "motion/react";
import { HeroNetworkEdges } from "@/components/marketing/hero-network-edges";
import { HeroNetworkLeaf } from "@/components/marketing/hero-network-leaf";
import { HeroNetworkTool } from "@/components/marketing/hero-network-tool";
import {
  HERO_GRAPHIC_HUB,
  HERO_GRAPHIC_LEAVES,
  HERO_GRAPHIC_TOOLS,
} from "@/config/hero";
import { DOT_GRID_BACKGROUND } from "@/config/patterns";

export function HeroNetworkGraphic() {
  const shouldReduceMotion = useReducedMotion();
  const hubTransition = shouldReduceMotion
    ? { duration: 0.4 }
    : {
        delay: 0.2,
        duration: 0.4,
        scale: {
          duration: 3,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        },
      };

  return (
    <div className="relative aspect-square w-full overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={DOT_GRID_BACKGROUND}
      />

      <HeroNetworkEdges />

      <motion.div
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.05, 1] }}
        className="absolute flex size-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded border-2 bg-primary font-head text-primary-foreground shadow-md sm:size-20"
        initial={{ opacity: 0, scale: 0 }}
        style={{
          left: `${HERO_GRAPHIC_HUB.x}%`,
          top: `${HERO_GRAPHIC_HUB.y}%`,
        }}
        transition={hubTransition}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, scale: 1 }}
      >
        <span className="text-[10px] sm:text-xs">MCCE</span>
        <span className="text-[8px] opacity-70 sm:text-[10px]">index</span>
      </motion.div>

      {HERO_GRAPHIC_LEAVES.map((leaf, index) => (
        <HeroNetworkLeaf
          animationDelay={0.35 + index * 0.1}
          key={leaf.label}
          leaf={leaf}
        />
      ))}

      {HERO_GRAPHIC_TOOLS.map((tool, index) => (
        <HeroNetworkTool
          animationDelay={0.6 + index * 0.1}
          key={tool.label}
          tool={tool}
        />
      ))}
    </div>
  );
}
