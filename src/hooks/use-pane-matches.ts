import { useMemo } from "react";
import type { EditorPaneView } from "@/hooks/use-editor-panes";
import { findMatchingFile } from "@/lib/pdf-editor/match-files";
import type { EditorTreeNode } from "@/lib/pdf-editor/types";

/** Each pane's match, left out when it is already on screen. */
export function usePaneMatches(
  panes: EditorPaneView[],
  nodes: EditorTreeNode[]
): (EditorTreeNode | null)[] {
  const shown = panes.map(({ node }) => node?.id ?? "").join("|");

  // biome-ignore lint/correctness/useExhaustiveDependencies: the matches change only when the files on screen do, which shown stands for
  return useMemo(() => {
    const onScreen = new Set(panes.map(({ node }) => node?.id));
    return panes.map(({ node }) => {
      const file = node ? nodes.find((item) => item.id === node.id) : undefined;
      const match = file ? findMatchingFile(nodes, file) : null;
      return match && !onScreen.has(match.id) ? match : null;
    });
  }, [shown, nodes]);
}
