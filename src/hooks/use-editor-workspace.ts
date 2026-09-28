import { useEditorDesk } from "@/hooks/use-editor-desk";
import { useEditorPanels } from "@/hooks/use-editor-panels";
import { useEditorPanes } from "@/hooks/use-editor-panes";
import { useEditorShortcuts } from "@/hooks/use-editor-shortcuts";
import { useEditorTools } from "@/hooks/use-editor-tools";
import { usePaneActions } from "@/hooks/use-pane-actions";
import { useSpacePan } from "@/hooks/use-space-pan";
import { useSplitControls } from "@/hooks/use-split-controls";
import type { EditorFile, EditorSearch } from "@/lib/pdf-editor/types";

interface EditorWorkspaceOptions {
  beside: EditorFile | null;
  focus: EditorSearch["focus"];
  node: EditorFile | null;
}

/** Everything the workspace shows, put together: the shared tools, the
 * panes and their sessions, the tabs, the side panels, and the keys that
 * reach across them. */
export function useEditorWorkspace({
  beside,
  focus,
  node,
}: EditorWorkspaceOptions) {
  const panels = useEditorPanels();
  const tools = useEditorTools();
  const isSpacePanning = useSpacePan();
  const panes = useEditorPanes({
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

  useSplitControls({
    activeId: desk.activeId,
    desk: desk.desk,
    other,
    paneActions,
    panels,
    panes: panes.panes,
  });

  return { desk, paneActions, panels, panes, tools };
}
