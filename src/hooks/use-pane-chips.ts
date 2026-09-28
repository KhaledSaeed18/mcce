import { useMemo } from "react";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import { findFileChip } from "@/lib/pdf-editor/file-chip";
import type { EditorTreeNode, FileChip } from "@/lib/pdf-editor/types";

/** Each pane's chip, from the index's material type where it has one. */
export function usePaneChips(
  panes: EditorPaneView[],
  nodes: EditorTreeNode[]
): (FileChip | null)[] {
  // A name can decide the chip, and one from this device arrives after its id.
  const shown = panes
    .map(({ node }) => (node ? `${node.id}/${node.name}` : ""))
    .join("|");

  // biome-ignore lint/correctness/useExhaustiveDependencies: the chips change only when the files on screen do, which shown stands for
  return useMemo(
    () =>
      panes.map(({ node }) => {
        if (!node) {
          return null;
        }
        const indexed = nodes.find((item) => item.id === node.id);
        return findFileChip(node.name, indexed?.materialType ?? null);
      }),
    [shown, nodes]
  );
}
