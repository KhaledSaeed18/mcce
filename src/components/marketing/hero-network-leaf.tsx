import { motion } from "motion/react";
import type { HeroLeafNode } from "@/components/marketing/types";
import { cn } from "@/lib/utils";

interface HeroNetworkLeafProps {
  animationDelay: number;
  leaf: HeroLeafNode;
}

export function HeroNetworkLeaf({
  animationDelay,
  leaf,
}: HeroNetworkLeafProps) {
  const Icon = leaf.icon;

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${leaf.x}%`, top: `${leaf.y}%` }}
    >
      <div className="relative">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "flex size-10 items-center justify-center rounded border-2 shadow-sm transition-transform duration-200 sm:size-12",
            "motion-safe:hover:-translate-x-0.5 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md"
          )}
          initial={{ opacity: 0, scale: 0 }}
          style={{ backgroundColor: `var(--${leaf.color})` }}
          transition={{ delay: animationDelay, duration: 0.3 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <Icon className="size-4 text-black sm:size-5" />
        </motion.div>
        <span
          className={cn(
            "absolute whitespace-nowrap font-medium text-[10px] text-muted-foreground sm:text-xs",
            leaf.labelClassName
          )}
        >
          {leaf.label}
        </span>
      </div>
    </div>
  );
}
