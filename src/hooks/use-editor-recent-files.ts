import { useMemo } from "react";
import { useRecentNodes } from "@/components/providers/recent-nodes-provider";
import { EDITOR_RECENT_LIMIT } from "@/config/pdf-editor";
import { resolveNodeIds } from "@/lib/drive/by-id";
import type { DriveNode } from "@/lib/drive/types";

/** Recently opened files the editor can take, newest first. */
export function useEditorRecentFiles(nodes: DriveNode[]): DriveNode[] {
  const { ids } = useRecentNodes();

  return useMemo(
    () =>
      resolveNodeIds(nodes, ids)
        .filter((node) => node.kind === "pdf")
        .slice(0, EDITOR_RECENT_LIMIT),
    [ids, nodes]
  );
}
