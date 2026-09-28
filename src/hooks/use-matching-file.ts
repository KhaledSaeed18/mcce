import { useMemo } from "react";
import { findMatchingFile } from "@/lib/pdf-editor/match-files";
import type { EditorTreeNode } from "@/lib/pdf-editor/types";

/** The solution for the file with this id, or the paper for a solution.
 * A file from this device is not in the index, so it has none. */
export function useMatchingFile(
  nodes: EditorTreeNode[],
  id: string | undefined
): EditorTreeNode | null {
  return useMemo(() => {
    const file = id ? nodes.find((node) => node.id === id) : undefined;
    return file ? findMatchingFile(nodes, file) : null;
  }, [id, nodes]);
}
