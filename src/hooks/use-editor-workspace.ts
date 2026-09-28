import { useEditorDesk } from "@/hooks/use-editor-desk";
import { useEditorPanels } from "@/hooks/use-editor-panels";
import { useEditorPanes } from "@/hooks/use-editor-panes";
import { useEditorShortcuts } from "@/hooks/use-editor-shortcuts";
import { useEditorTools } from "@/hooks/use-editor-tools";
import { useMatchArrival } from "@/hooks/use-match-arrival";
import { useMatchOpener } from "@/hooks/use-match-opener";
import { useMatchingFile } from "@/hooks/use-matching-file";
import { usePaneActions } from "@/hooks/use-pane-actions";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { useSpacePan } from "@/hooks/use-space-pan";
import { useSplitControls } from "@/hooks/use-split-controls";
import type {
  EditorFile,
  EditorSearch,
  EditorTreeNode,
} from "@/lib/pdf-editor/types";

interface EditorWorkspaceOptions {
  beside: EditorFile | null;
  focus: EditorSearch["focus"];
  node: EditorFile | null;
  nodes: EditorTreeNode[];
}

/** Everything the workspace shows, put together: the shared tools, the
 * panes and their sessions, the tabs, the side panels, and the keys that
 * reach across them. */
export function useEditorWorkspace({
  beside,
  focus,
  node,
  nodes,
}: EditorWorkspaceOptions) {
  const panels = useEditorPanels();
  const tools = useEditorTools();
  const isSpacePanning = useSpacePan();
  const arrival = useMatchArrival([node?.id, beside?.id]);
  const panes = useEditorPanes({
    arrival: arrival.arrival,
    beside,
    focus,
    isSpacePanning,
    node,
    tools,
  });
  const { focused, other } = panes;
  useEditorShortcuts(focused.session, tools.setTool);
  const desk = useEditorDesk(focused.node, other?.node ?? null);
  const paneActions = usePaneActions();
  const lock = useScrollLock(panes.panes, arrival.arrival, arrival.settle);
  const match = useMatchingFile(nodes, focused.node?.id);
  const openMatch = useMatchOpener({
    onArrive: arrival.request,
    onPlace: paneActions.place,
  });

  useSplitControls({
    activeId: desk.activeId,
    desk: desk.desk,
    other,
    paneActions,
    panels,
    panes: panes.panes,
  });

  return {
    desk,
    lock,
    match,
    openMatch,
    paneActions,
    panels,
    panes,
    tools,
  };
}
