import { type MotionValue, motion } from "motion/react";
import {
  SITEMAP_MARK_STROKE,
  SITEMAP_NODE_RX,
  SITEMAP_NODE_SIZE,
  SITEMAP_NODE_WINDOW,
  SITEMAP_NODE_X,
  SITEMAP_NODE_Y,
} from "@/config/sitemap-mark";
import { useStaggeredEntry } from "@/hooks/use-staggered-entry";

interface SitemapNodeProps {
  index: number;
  progress: MotionValue<number>;
}

export function SitemapNode({ index, progress }: SitemapNodeProps) {
  const entry = useStaggeredEntry(progress, index, SITEMAP_NODE_WINDOW);

  return (
    <motion.rect
      fill="var(--card)"
      height={SITEMAP_NODE_SIZE}
      rx={SITEMAP_NODE_RX}
      stroke="var(--border)"
      strokeWidth={SITEMAP_MARK_STROKE}
      style={{ opacity: entry, scale: entry }}
      width={SITEMAP_NODE_SIZE}
      x={SITEMAP_NODE_X[index]}
      y={SITEMAP_NODE_Y}
    />
  );
}
