import type { DriveIndex, DriveIndexStats } from "@/lib/drive/types";

export function buildIndexStats(
  index: DriveIndex,
  sourceCount: number
): DriveIndexStats {
  let fileCount = 0;
  let folderCount = 0;

  for (const source of index.meta.sources) {
    fileCount += source.fileCount;
    folderCount += source.folderCount;
  }

  return {
    fileCount,
    folderCount,
    generatedAt: index.meta.generatedAt,
    sourceCount,
  };
}
