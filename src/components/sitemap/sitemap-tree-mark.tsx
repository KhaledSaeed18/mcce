import { motion, useTransform } from "motion/react";
import { SitemapNode } from "@/components/sitemap/sitemap-node";
import {
  SITEMAP_DROP_TO_Y,
  SITEMAP_MARK_HEIGHT,
  SITEMAP_MARK_LOOP,
  SITEMAP_MARK_STROKE,
  SITEMAP_MARK_WIDTH,
  SITEMAP_NODE_X,
  SITEMAP_RAIL_FROM_X,
  SITEMAP_RAIL_TO_X,
  SITEMAP_RAIL_Y,
  SITEMAP_ROOT,
  SITEMAP_ROOT_RX,
  SITEMAP_TREE_FADE,
  SITEMAP_TREE_RANGE,
  SITEMAP_TRUNK_FROM_Y,
} from "@/config/sitemap-mark";
import { useLoopingProgress } from "@/hooks/use-looping-progress";

const NODES = SITEMAP_NODE_X.map((_x, index) => index);

export function SitemapTreeMark() {
  const { progress, opacity } = useLoopingProgress(SITEMAP_MARK_LOOP);
  const treeDraw = useTransform(progress, [...SITEMAP_TREE_RANGE], [0, 1]);
  const treeOpacity = useTransform(
    progress,
    [SITEMAP_TREE_RANGE[0] - SITEMAP_TREE_FADE, SITEMAP_TREE_RANGE[0]],
    [0, 1]
  );

  return (
    <motion.svg
      aria-hidden="true"
      style={{ opacity }}
      viewBox={`0 0 ${SITEMAP_MARK_WIDTH} ${SITEMAP_MARK_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* The root does not cycle, so the tree always grows from somewhere. */}
      <rect
        fill="var(--primary)"
        height={SITEMAP_ROOT.size}
        rx={SITEMAP_ROOT_RX}
        stroke="var(--border)"
        strokeWidth={SITEMAP_MARK_STROKE}
        width={SITEMAP_ROOT.size}
        x={SITEMAP_ROOT.x}
        y={SITEMAP_ROOT.y}
      />

      {/* One path, so the dash draws trunk, rail, then each drop in turn. */}
      <motion.path
        d={`M ${SITEMAP_ROOT.x + SITEMAP_ROOT.size / 2} ${SITEMAP_TRUNK_FROM_Y} V ${SITEMAP_RAIL_Y} M ${SITEMAP_RAIL_FROM_X} ${SITEMAP_RAIL_Y} H ${SITEMAP_RAIL_TO_X} ${SITEMAP_NODE_X.map(
          (x) =>
            ` M ${x + SITEMAP_ROOT.size / 2} ${SITEMAP_RAIL_Y} V ${SITEMAP_DROP_TO_Y}`
        ).join(" ")}`}
        fill="none"
        stroke="var(--border)"
        strokeLinecap="round"
        strokeWidth={SITEMAP_MARK_STROKE}
        style={{ opacity: treeOpacity, pathLength: treeDraw }}
      />

      {NODES.map((node) => (
        <SitemapNode index={node} key={node} progress={progress} />
      ))}
    </motion.svg>
  );
}
