import { motion, useReducedMotion } from "motion/react";
import { HeroNetworkLeaf } from "@/components/marketing/hero-network-leaf";
import { HERO_GRAPHIC_HUB, HERO_GRAPHIC_LEAVES } from "@/config/hero";

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
    <div
      aria-hidden="true"
      className="relative aspect-square w-full overflow-hidden rounded border-2 bg-card shadow-xl"
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--border) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <span className="absolute top-3 left-3 -rotate-6 rounded border-2 bg-background px-2 py-0.5 font-head text-[10px] tracking-wide">
        auto-synced
      </span>

      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        {HERO_GRAPHIC_LEAVES.map((leaf, index) => (
          <motion.line
            animate={{ opacity: 1 }}
            initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
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
      </svg>

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
    </div>
  );
}
