import { type MotionValue, motion, useTransform } from "motion/react";
import {
  SYNC_LINK_ARROW,
  SYNC_LINK_ARROW_RANGE,
  SYNC_LINK_ARROW_TRANSFORM,
  SYNC_LINK_PATH,
  SYNC_LINK_RANGE,
  SYNC_LINK_WIDTH,
} from "@/config/sync-diagram";

interface SyncDiagramLinkProps {
  progress: MotionValue<number>;
}

export function SyncDiagramLink({ progress }: SyncDiagramLinkProps) {
  const pathLength = useTransform(progress, [...SYNC_LINK_RANGE], [0, 1]);
  const arrowOpacity = useTransform(
    progress,
    [...SYNC_LINK_ARROW_RANGE],
    [0, 1]
  );

  return (
    <g>
      <motion.path
        d={SYNC_LINK_PATH}
        fill="none"
        stroke="var(--primary)"
        strokeLinecap="round"
        strokeWidth={SYNC_LINK_WIDTH}
        style={{ pathLength }}
      />
      <motion.polygon
        fill="var(--primary)"
        points={SYNC_LINK_ARROW}
        style={{ opacity: arrowOpacity }}
        transform={SYNC_LINK_ARROW_TRANSFORM}
      />
    </g>
  );
}
