import { useRef } from "react";
import { EditorDocumentColumn } from "@/components/pdf-editor/editor-document-column";
import { EditorDropZone } from "@/components/pdf-editor/editor-drop-zone";
import { EditorExamDialogs } from "@/components/pdf-editor/editor-exam-dialogs";
import { EditorFileBar } from "@/components/pdf-editor/editor-file-bar";
import { EditorHelpDialog } from "@/components/pdf-editor/editor-help-dialog";
import { EditorPanes } from "@/components/pdf-editor/editor-panes";
import { EditorQuickOpen } from "@/components/pdf-editor/editor-quick-open";
import { EditorSidePanel } from "@/components/pdf-editor/editor-side-panel";
import { EditorStudySide } from "@/components/pdf-editor/editor-study-side";
import { EditorTabStrip } from "@/components/pdf-editor/editor-tab-strip";
import { FileBrowserPanel } from "@/components/pdf-editor/file-browser-panel";
import { EDITOR_HEIGHT_CLASS } from "@/config/pdf-editor";
import { useEditorDesk } from "@/hooks/use-editor-desk";
import { useEditorHelp } from "@/hooks/use-editor-help";
import { useEditorPanels } from "@/hooks/use-editor-panels";
import { useEditorPanes } from "@/hooks/use-editor-panes";
import { useEditorShortcuts } from "@/hooks/use-editor-shortcuts";
import { useEditorTools } from "@/hooks/use-editor-tools";
import { useFullscreen } from "@/hooks/use-fullscreen";
import { usePaneActions } from "@/hooks/use-pane-actions";
import { useSpacePan } from "@/hooks/use-space-pan";
import { useSplitToggle } from "@/hooks/use-split-toggle";
import type {
  EditorFile,
  EditorSearch,
  EditorTreeNode,
} from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

interface PdfEditorWorkspaceProps {
  /** The file in the second pane, while the view is split. */
  beside: EditorFile | null;
  focus: EditorSearch["focus"];
  node: EditorFile | null;
  nodes: EditorTreeNode[];
}

export function PdfEditorWorkspace({
  beside,
  focus,
  node,
  nodes,
}: PdfEditorWorkspaceProps) {
  const rootRef = useRef<HTMLElement>(null);
  const fullscreen = useFullscreen(rootRef);
  const panels = useEditorPanels();
  const help = useEditorHelp();

  const tools = useEditorTools();
  const isSpacePanning = useSpacePan();
  const { focused, other, panes, sides } = useEditorPanes({
    beside,
    focus,
    isSpacePanning,
    node,
    tools,
  });
  const { session } = focused;
  useEditorShortcuts(session, tools.setTool);
  const { activeId, close, desk, forget, move, show } = useEditorDesk(
    focused.node,
    other?.node ?? null
  );
  const paneActions = usePaneActions();

  useSplitToggle({
    activeId,
    desk,
    onClosePane: paneActions.close,
    onOpenBeside: paneActions.openBeside,
    otherSide: other?.side ?? null,
  });

  return (
    /* Fullscreen paints its own backdrop behind the element, so the page needs its own ground. */
    <main
      className={cn("flex flex-col bg-background", EDITOR_HEIGHT_CLASS)}
      ref={rootRef}
    >
      <EditorDropZone>
        <EditorFileBar
          hasTabs={desk.files.length > 0}
          isBrowserOpen={panels.isBrowserOpen}
          isFullscreen={fullscreen.isFullscreen}
          isFullscreenSupported={fullscreen.isSupported}
          isRailOpen={panels.isRailOpen}
          isStudyOpen={panels.isStudyOpen}
          node={focused.node}
          onOpenHelp={help.open}
          onToggleBrowser={panels.toggleBrowser}
          onToggleFullscreen={fullscreen.toggle}
          onToggleRail={panels.toggleRail}
          onToggleStudy={panels.toggleStudy}
          saveStatus={session.saveStatus}
        >
          <EditorTabStrip
            activeId={activeId}
            desk={desk}
            nodes={nodes}
            onClose={close}
            onMove={move}
            onOpenBeside={paneActions.openBeside}
            onShow={show}
            sides={sides}
          >
            <EditorQuickOpen activeId={activeId} nodes={nodes} onShow={show} />
          </EditorTabStrip>
        </EditorFileBar>
        <div className="flex min-h-0 flex-1">
          <EditorSidePanel
            isAnimated={panels.isAnimated}
            isOpen={panels.isBrowserOpen}
          >
            <FileBrowserPanel
              activeNode={focused.node}
              nodes={nodes}
              onForget={forget}
              openFiles={desk.files}
            />
          </EditorSidePanel>
          <EditorDocumentColumn session={session} tools={tools}>
            <EditorPanes
              focusedSide={focused.side}
              isBrowserOpen={panels.isBrowserOpen}
              isPanelAnimated={panels.isAnimated}
              isRailOpen={panels.isRailOpen}
              nodes={nodes}
              onFocus={paneActions.focus}
              onShowFiles={panels.toggleBrowser}
              panes={panes}
              tools={tools}
            />
          </EditorDocumentColumn>
          <EditorStudySide
            isAnimated={panels.isAnimated}
            isOpen={panels.isStudyOpen}
            pane={focused}
          />
        </div>
      </EditorDropZone>
      <EditorHelpDialog onOpenChange={help.setIsOpen} open={help.isOpen} />
      <EditorExamDialogs panes={panes} />
    </main>
  );
}
