import { type MotionValue, motion, useTransform } from "motion/react";
import {
  SYNC_DIAGRAM_STROKE,
  SYNC_FAN_RANGE,
  SYNC_FOLDER_HEIGHT,
  SYNC_FOLDER_TAB_HEIGHT,
  SYNC_FOLDER_TAB_WIDTH,
  SYNC_FOLDER_WIDTH,
  SYNC_FOLDERS,
} from "@/config/sync-diagram";

const FLAP_TOP = 20;
const FLAP_OPEN_DEGREES = -12;

interface SyncDiagramFolderProps {
  index: number;
  progress: MotionValue<number>;
}

export function SyncDiagramFolder({ index, progress }: SyncDiagramFolderProps) {
  const folder = SYNC_FOLDERS[index];
  const rotate = useTransform(
    progress,
    [...SYNC_FAN_RANGE],
    [0, FLAP_OPEN_DEGREES]
  );

  return (
    <g transform={`translate(${folder.x}, ${folder.y})`}>
      <rect
        fill="var(--primary)"
        height={SYNC_FOLDER_TAB_HEIGHT}
        stroke="var(--border)"
        strokeWidth={SYNC_DIAGRAM_STROKE}
        width={SYNC_FOLDER_TAB_WIDTH}
        y={-SYNC_FOLDER_TAB_HEIGHT}
      />
      <rect
        fill="var(--card)"
        height={SYNC_FOLDER_HEIGHT}
        stroke="var(--border)"
        strokeWidth={SYNC_DIAGRAM_STROKE}
        width={SYNC_FOLDER_WIDTH}
      />
      {/* Hinges on its own bottom edge so the folder reads as tipping open
       * rather than sliding down the page. */}
      <motion.rect
        fill="var(--primary)"
        height={SYNC_FOLDER_HEIGHT - FLAP_TOP}
        stroke="var(--border)"
        strokeWidth={SYNC_DIAGRAM_STROKE}
        style={{
          rotate,
          transformOrigin: `${SYNC_FOLDER_WIDTH / 2}px ${SYNC_FOLDER_HEIGHT}px`,
        }}
        width={SYNC_FOLDER_WIDTH}
        y={FLAP_TOP}
      />
    </g>
  );
}
