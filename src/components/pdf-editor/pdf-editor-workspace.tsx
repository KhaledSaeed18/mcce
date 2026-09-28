import { useCallback, useRef } from "react";
import { EditorDocumentColumn } from "@/components/pdf-editor/editor-document-column";
import { EditorDropZone } from "@/components/pdf-editor/editor-drop-zone";
import { EditorExamDialogs } from "@/components/pdf-editor/editor-exam-dialogs";
import { EditorFileBar } from "@/components/pdf-editor/editor-file-bar";
import { EditorFileBarTabs } from "@/components/pdf-editor/editor-file-bar-tabs";
import { EditorHelpDialog } from "@/components/pdf-editor/editor-help-dialog";
import { EditorPanes } from "@/components/pdf-editor/editor-panes";
import { EditorSidePanel } from "@/components/pdf-editor/editor-side-panel";
import { EditorStudySide } from "@/components/pdf-editor/editor-study-side";
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
  /** A study set the URL asks to open. */
  setLink: Pick<EditorSearch, "beside" | "set" | "setId">;
}

export function PdfEditorWorkspace({
  beside,
  focus,
  node,
  nodes,
  setLink,
}: PdfEditorWorkspaceProps) {
  const rootRef = useRef<HTMLElement>(null);
  const fullscreen = useFullscreen(rootRef);
  const help = useEditorHelp();
  const {
    desk,
    examCover,
    lock,
    match,
    openMatch,
    paneActions,
    panels,
    panes,
    peek,
    saveSet,
    tools,
  } = useEditorWorkspace({ beside, focus, node, nodes, setLink });
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
          <EditorFileBarTabs
            desk={desk}
            match={match}
            nodes={nodes}
            onOpenBeside={paneActions.openBeside}
            onOpenMatch={handleOpenMatch}
            onSaveSet={saveSet}
            sides={panes.sides}
          />
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
              examCover={examCover}
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
