import { motion } from "motion/react";
import {
  SYNC_DIAGRAM_HEIGHT,
  SYNC_DIAGRAM_WIDTH,
  SYNC_FOLDERS,
  SYNC_LINKED_INDEX,
  SYNC_LOOP,
  SYNC_ROWS,
  SYNC_SHEETS,
} from "@/config/sync-diagram";
import { useLoopingProgress } from "@/hooks/use-looping-progress";
import { SyncDiagramFolder } from "./sync-diagram-folder";
import { SyncDiagramLink } from "./sync-diagram-link";
import { SyncDiagramRow } from "./sync-diagram-row";
import { SyncDiagramScan } from "./sync-diagram-scan";
import { SyncDiagramSheet } from "./sync-diagram-sheet";

/** The linked sheet draws last so the final stage can lift it clear of the
 * sheets that would otherwise overlap it. */
const SHEET_ORDER = SYNC_SHEETS.map((_sheet, index) => index).sort(
  (left, right) =>
    Number(left === SYNC_LINKED_INDEX) - Number(right === SYNC_LINKED_INDEX)
);

export function SyncDiagram() {
  const { progress, opacity } = useLoopingProgress(SYNC_LOOP);

  return (
    <div className="px-5 pt-5 sm:px-6 sm:pt-6">
      <motion.svg
        aria-hidden="true"
        className="mx-auto block h-auto w-full max-w-160"
        role="presentation"
        style={{ opacity }}
        viewBox={`0 0 ${SYNC_DIAGRAM_WIDTH} ${SYNC_DIAGRAM_HEIGHT}`}
      >
        {SYNC_FOLDERS.map((folder, index) => (
          <SyncDiagramFolder index={index} key={folder.x} progress={progress} />
        ))}

        {SHEET_ORDER.map((index) => (
          <SyncDiagramSheet
            index={index}
            key={SYNC_SHEETS[index].fanX}
            progress={progress}
          />
        ))}

        {SYNC_ROWS.map((row, index) => (
          <SyncDiagramRow
            index={index}
            key={row.barWidth}
            progress={progress}
          />
        ))}

        <SyncDiagramLink progress={progress} />
        <SyncDiagramScan progress={progress} />
      </motion.svg>
    </div>
  );
}
