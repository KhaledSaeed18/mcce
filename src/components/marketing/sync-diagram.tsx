import { motion } from "motion/react";
import {
  SYNC_DIAGRAM_HEIGHT,
  SYNC_DIAGRAM_WIDTH,
  SYNC_FOLDERS,
  SYNC_LINKED_INDEX,
  SYNC_ROWS,
  SYNC_SHEETS,
} from "@/config/sync-diagram";
import { useSyncLoop } from "@/hooks/use-sync-loop";
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
  const { progress, opacity } = useSyncLoop();

  return (
    <div className="px-5 pt-5 sm:px-6 sm:pt-6">
      <motion.svg
        aria-hidden="true"
        className="mx-auto block h-auto w-full max-w-[640px]"
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
