import { useRef } from "react";
import { EditorDocumentColumn } from "@/components/pdf-editor/editor-document-column";
import { EditorDropZone } from "@/components/pdf-editor/editor-drop-zone";
import { EditorFileBar } from "@/components/pdf-editor/editor-file-bar";
import { EditorHelpDialog } from "@/components/pdf-editor/editor-help-dialog";
import { EditorSidePanel } from "@/components/pdf-editor/editor-side-panel";
import { ExamTimeUpDialog } from "@/components/pdf-editor/exam-time-up-dialog";
import { FileBrowserPanel } from "@/components/pdf-editor/file-browser-panel";
import { StudyPanel } from "@/components/pdf-editor/study-panel";
import { EDITOR_HEIGHT_CLASS } from "@/config/pdf-editor";
import { useEditorHelp } from "@/hooks/use-editor-help";
import { useEditorPanels } from "@/hooks/use-editor-panels";
import { useEditorSession } from "@/hooks/use-editor-session";
import { useFullscreen } from "@/hooks/use-fullscreen";
import type { EditorFile, EditorTreeNode } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

interface PdfEditorWorkspaceProps {
  node: EditorFile | null;
  nodes: EditorTreeNode[];
}

export function PdfEditorWorkspace({ node, nodes }: PdfEditorWorkspaceProps) {
  const rootRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
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

  const session = useEditorSession(node, scrollRef);

  return (
    /* Fullscreen paints its own backdrop behind the element, so the page needs its own ground. */
    <main
      className={cn("flex flex-col bg-background", EDITOR_HEIGHT_CLASS)}
      ref={rootRef}
    >
      <EditorDropZone>
        <EditorFileBar
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
        />
        <div className="flex min-h-0 flex-1">
          <EditorSidePanel isAnimated={isAnimated} isOpen={isBrowserOpen}>
            <FileBrowserPanel activeNode={node} nodes={nodes} />
          </EditorSidePanel>
          <EditorDocumentColumn
            isBrowserOpen={isBrowserOpen}
            isPanelAnimated={isAnimated}
            isRailOpen={isRailOpen}
            node={node}
            nodes={nodes}
            onShowFiles={toggleBrowser}
            scrollRef={scrollRef}
            session={session}
          />
          <EditorSidePanel
            isAnimated={isAnimated}
            isOpen={isStudyOpen && session.doc !== null}
          >
            {session.doc ? (
              <StudyPanel
                bookmarks={session.bookmarks}
                doc={session.doc}
                navigation={session.navigation}
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
