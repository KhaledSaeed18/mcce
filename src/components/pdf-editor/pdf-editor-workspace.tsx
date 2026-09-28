import { useCallback, useRef } from "react";
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
import { useEditorHelp } from "@/hooks/use-editor-help";
import { useEditorWorkspace } from "@/hooks/use-editor-workspace";
import { useFullscreen } from "@/hooks/use-fullscreen";
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
  const help = useEditorHelp();
  const {
    desk,
    lock,
    match,
    openMatch,
    paneActions,
    panels,
    panes,
    peek,
    tools,
  } = useEditorWorkspace({ beside, focus, node, nodes });
  const { focused } = panes;
  const { session } = focused;
  const handleOpenMatch = useCallback(() => {
    if (match) {
      openMatch(focused, match);
    }
  }, [focused, match, openMatch]);

  return (
    /* Fullscreen paints its own backdrop behind the element, so the page needs its own ground. */
    <main
      className={cn("flex flex-col bg-background", EDITOR_HEIGHT_CLASS)}
      ref={rootRef}
    >
      <EditorDropZone>
        <EditorFileBar
          hasTabs={desk.desk.files.length > 0}
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
            activeId={desk.activeId}
            desk={desk.desk}
            match={match}
            nodes={nodes}
            onClose={desk.close}
            onMove={desk.move}
            onOpenBeside={paneActions.openBeside}
            onOpenMatch={handleOpenMatch}
            onShow={desk.show}
            sides={panes.sides}
          >
            <EditorQuickOpen
              activeId={desk.activeId}
              nodes={nodes}
              onShow={desk.show}
            />
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
              onForget={desk.forget}
              openFiles={desk.desk.files}
            />
          </EditorSidePanel>
          <EditorDocumentColumn session={session} tools={tools}>
            <EditorPanes
              focusedSide={focused.side}
              isBrowserOpen={panels.isBrowserOpen}
              isPanelAnimated={panels.isAnimated}
              isRailOpen={panels.isRailOpen}
              lock={lock}
              nodes={nodes}
              onClosePane={paneActions.close}
              onFocus={paneActions.focus}
              onOpenMatch={openMatch}
              onPlace={paneActions.place}
              onShowFiles={panels.toggleBrowser}
              onSwap={paneActions.swap}
              panes={panes.panes}
              peek={peek}
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
      <EditorExamDialogs panes={panes.panes} />
    </main>
  );
}
