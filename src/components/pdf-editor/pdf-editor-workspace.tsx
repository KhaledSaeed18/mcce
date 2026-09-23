import { useRef } from "react";
import { EditorDocumentArea } from "@/components/pdf-editor/editor-document-area";
import { EditorDropZone } from "@/components/pdf-editor/editor-drop-zone";
import { EditorFileBar } from "@/components/pdf-editor/editor-file-bar";
import { EditorHelpDialog } from "@/components/pdf-editor/editor-help-dialog";
import { EditorPlaceholder } from "@/components/pdf-editor/editor-placeholder";
import { EditorSidePanel } from "@/components/pdf-editor/editor-side-panel";
import { EditorToolbar } from "@/components/pdf-editor/editor-toolbar";
import { FileBrowserPanel } from "@/components/pdf-editor/file-browser-panel";
import { PdfPageList } from "@/components/pdf-editor/pdf-page-list";
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
  const { isAnimated, isBrowserOpen, isRailOpen, toggleBrowser, toggleRail } =
    useEditorPanels();
  const help = useEditorHelp();

  const {
    doc,
    exportPdf,
    exportStatus,
    ink,
    isDocumentShown,
    markup,
    navigation,
    retry,
    saveStatus,
    settings,
    sizes,
    status,
    tools,
    zoom,
  } = useEditorSession(node, scrollRef);

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
          node={node}
          onOpenHelp={help.open}
          onToggleBrowser={toggleBrowser}
          onToggleFullscreen={toggleFullscreen}
          onToggleRail={toggleRail}
          saveStatus={saveStatus}
        />
        <div className="flex min-h-0 flex-1">
          <EditorSidePanel isAnimated={isAnimated} isOpen={isBrowserOpen}>
            <FileBrowserPanel activeNode={node} nodes={nodes} />
          </EditorSidePanel>
          <div className="flex min-w-0 flex-1 flex-col">
            {doc ? (
              <EditorToolbar
                canClear={markup.annotations.length > 0}
                canRedo={markup.canRedo}
                canRestore={!markup.isOriginal}
                canUndo={markup.canUndo}
                color={ink.color}
                exportStatus={exportStatus}
                fontSize={tools.fontSize}
                navigation={navigation}
                onClear={markup.clear}
                onColorChange={ink.changeColor}
                onExport={exportPdf}
                onFontSizeChange={markup.changeFontSize}
                onRedo={markup.redo}
                onRestore={markup.restore}
                onStrokeWidthChange={ink.changeStrokeWidth}
                onToolChange={tools.setTool}
                onUndo={markup.undo}
                strokeWidth={ink.strokeWidth}
                tool={tools.tool}
                zoom={zoom}
              />
            ) : null}
            <EditorDocumentArea
              doc={doc}
              isLoading={status === "loading"}
              isPanelAnimated={isAnimated}
              isRailOpen={isRailOpen}
              layout={markup.pages}
              navigation={navigation}
              onCopyPage={markup.copyPage}
              onRemovePage={markup.removePage}
              onReorderPage={markup.reorderPage}
              onRotatePage={markup.rotatePage}
              scrollRef={scrollRef}
              sizes={sizes}
            >
              {doc && isDocumentShown ? (
                <PdfPageList
                  actions={markup.actions}
                  annotations={markup.annotations}
                  doc={doc}
                  onTextDraftChange={markup.openDraft}
                  pages={markup.pages}
                  selectedId={markup.selectedId}
                  settings={settings}
                  textDraft={markup.draft}
                  zoom={zoom.value}
                />
              ) : (
                <EditorPlaceholder
                  isBrowserOpen={isBrowserOpen}
                  nodes={nodes}
                  onRetry={retry}
                  onShowFiles={toggleBrowser}
                  source={node ? node.source : "drive"}
                  status={status}
                />
              )}
            </EditorDocumentArea>
          </div>
        </div>
      </EditorDropZone>
      <EditorHelpDialog onOpenChange={help.setIsOpen} open={help.isOpen} />
    </main>
  );
}
