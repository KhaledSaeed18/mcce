import { motion } from "motion/react";
import type { HeroToolNode } from "@/components/marketing/types";

interface HeroNetworkToolProps {
  animationDelay: number;
  tool: HeroToolNode;
}

export function HeroNetworkTool({
  animationDelay,
  tool,
}: HeroNetworkToolProps) {
  const Icon = tool.icon;

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded border-2 bg-background px-2 py-1 font-head text-[10px] shadow-sm sm:text-xs"
      initial={{ opacity: 0, scale: 0.8 }}
      style={{ left: `${tool.x}%`, top: `${tool.y}%` }}
      transition={{ delay: animationDelay, duration: 0.3 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, scale: 1 }}
    >
      <Icon className="size-3 sm:size-3.5" />
      {tool.label}
    </motion.div>
  );
}
