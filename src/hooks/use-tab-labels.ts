import { useMemo } from "react";
import { buildTabLabels } from "@/lib/pdf-editor/tab-label";
import type {
  EditorTreeNode,
  OpenFile,
  TabLabel,
} from "@/lib/pdf-editor/types";

/** A label for each open file, in tab order. A file from the index takes its
 * name and material type from the index, which knows them best. */
export function useTabLabels(
  files: OpenFile[],
  nodes: EditorTreeNode[]
): TabLabel[] {
  const byId = useMemo(
    () => new Map(nodes.map((node) => [node.id, node])),
    [nodes]
  );

  return useMemo(
    () =>
      buildTabLabels(
        files.map((file) => {
          const node = file.source === "drive" ? byId.get(file.id) : undefined;
          return {
            materialType: node?.materialType ?? null,
            name: node?.name ?? file.name,
          };
        })
      ),
    [byId, files]
  );
}
