import { useRef } from "react";
import { EditorDocumentColumn } from "@/components/pdf-editor/editor-document-column";
import { EditorDropZone } from "@/components/pdf-editor/editor-drop-zone";
import { EditorFileBar } from "@/components/pdf-editor/editor-file-bar";
import { EditorHelpDialog } from "@/components/pdf-editor/editor-help-dialog";
import { EditorPane } from "@/components/pdf-editor/editor-pane";
import { EditorSidePanel } from "@/components/pdf-editor/editor-side-panel";
import { EditorTabStrip } from "@/components/pdf-editor/editor-tab-strip";
import { ExamTimeUpDialog } from "@/components/pdf-editor/exam-time-up-dialog";
import { FileBrowserPanel } from "@/components/pdf-editor/file-browser-panel";
import { StudyPanel } from "@/components/pdf-editor/study-panel";
import { DEFAULT_EXPORT_NAME, EDITOR_HEIGHT_CLASS } from "@/config/pdf-editor";
import { useEditorDesk } from "@/hooks/use-editor-desk";
import { useEditorHelp } from "@/hooks/use-editor-help";
import { useEditorPanels } from "@/hooks/use-editor-panels";
import { useEditorSession } from "@/hooks/use-editor-session";
import { useEditorShortcuts } from "@/hooks/use-editor-shortcuts";
import { useEditorTools } from "@/hooks/use-editor-tools";
import { useFullscreen } from "@/hooks/use-fullscreen";
import { useSpacePan } from "@/hooks/use-space-pan";
import type { EditorFile, EditorTreeNode } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

interface PdfEditorWorkspaceProps {
  node: EditorFile | null;
  nodes: EditorTreeNode[];
}

export function PdfEditorWorkspace({ node, nodes }: PdfEditorWorkspaceProps) {
  const rootRef = useRef<HTMLElement>(null);
  const {
    isFullscreen,
    isSupported: isFullscreenSupported,
    toggle: toggleFullscreen,
  } = useFullscreen(rootRef);
  const {
    isAnimated,
    isBrowserOpen,
    isRailOpen,
    isStudyOpen,
    toggleBrowser,
    toggleRail,
    toggleStudy,
  } = useEditorPanels();
  const help = useEditorHelp();

  const tools = useEditorTools();
  const isSpacePanning = useSpacePan();
  const session = useEditorSession({
    isSpacePanning,
    node,
    tools,
  });
  useEditorShortcuts(session, tools.setTool);
  const { activeId, close, desk, move, show } = useEditorDesk(node);

  return (
    /* Fullscreen paints its own backdrop behind the element, so the page needs its own ground. */
    <main
      className={cn("flex flex-col bg-background", EDITOR_HEIGHT_CLASS)}
      ref={rootRef}
    >
      <EditorDropZone>
        <EditorFileBar
          hasTabs={desk.files.length > 0}
          isBrowserOpen={isBrowserOpen}
          isFullscreen={isFullscreen}
          isFullscreenSupported={isFullscreenSupported}
          isRailOpen={isRailOpen}
          isStudyOpen={isStudyOpen}
          node={node}
          onOpenHelp={help.open}
          onToggleBrowser={toggleBrowser}
          onToggleFullscreen={toggleFullscreen}
          onToggleRail={toggleRail}
          onToggleStudy={toggleStudy}
          saveStatus={session.saveStatus}
        >
          <EditorTabStrip
            activeId={activeId}
            desk={desk}
            nodes={nodes}
            onClose={close}
            onMove={move}
            onShow={show}
          />
        </EditorFileBar>
        <div className="flex min-h-0 flex-1">
          <EditorSidePanel isAnimated={isAnimated} isOpen={isBrowserOpen}>
            <FileBrowserPanel activeNode={node} nodes={nodes} />
          </EditorSidePanel>
          <EditorDocumentColumn session={session} tools={tools}>
            <EditorPane
              isBrowserOpen={isBrowserOpen}
              isPanelAnimated={isAnimated}
              isRailOpen={isRailOpen}
              node={node}
              nodes={nodes}
              onShowFiles={toggleBrowser}
              session={session}
              tools={tools}
            />
          </EditorDocumentColumn>
          <EditorSidePanel
            isAnimated={isAnimated}
            isOpen={isStudyOpen && session.doc !== null}
          >
            {session.doc ? (
              <StudyPanel
                annotations={session.markup.annotations}
                bookmarks={session.bookmarks}
                doc={session.doc}
                fileName={node ? node.name : DEFAULT_EXPORT_NAME}
                navigation={session.navigation}
                onSelect={session.markup.actions.select}
                pages={session.markup.pages}
              />
            ) : null}
          </EditorSidePanel>
        </div>
      </EditorDropZone>
      <EditorHelpDialog onOpenChange={help.setIsOpen} open={help.isOpen} />
      <ExamTimeUpDialog
        isOpen={session.exam.isOver}
        onClose={session.exam.end}
        onDownload={session.exportPdf}
      />
    </main>
  );
}
