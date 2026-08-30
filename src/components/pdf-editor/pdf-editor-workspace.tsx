import { useCallback, useRef, useState } from "react";
import { EditorFileBar } from "@/components/pdf-editor/editor-file-bar";
import { EditorStatus } from "@/components/pdf-editor/editor-status";
import { EditorToolbar } from "@/components/pdf-editor/editor-toolbar";
import { FileBrowserPanel } from "@/components/pdf-editor/file-browser-panel";
import { PdfPageList } from "@/components/pdf-editor/pdf-page-list";
import { DEFAULT_EXPORT_NAME, EDITOR_HEIGHT_CLASS } from "@/config/pdf-editor";
import { useAnnotationFont } from "@/hooks/use-annotation-font";
import { useEditorMarkup } from "@/hooks/use-editor-markup";
import { useEditorTools } from "@/hooks/use-editor-tools";
import { useFullscreen } from "@/hooks/use-fullscreen";
import { usePdfDocument } from "@/hooks/use-pdf-document";
import { usePdfExport } from "@/hooks/use-pdf-export";
import { usePdfZoom } from "@/hooks/use-pdf-zoom";
import type { DriveNode } from "@/lib/drive/types";
import { cn } from "@/lib/utils";

interface PdfEditorWorkspaceProps {
  node: DriveNode | null;
  nodes: DriveNode[];
}

export function PdfEditorWorkspace({ node, nodes }: PdfEditorWorkspaceProps) {
  const rootRef = useRef<HTMLElement>(null);
  const {
    isFullscreen,
    isSupported: isFullscreenSupported,
    toggle: toggleFullscreen,
  } = useFullscreen(rootRef);
  const [isBrowserOpen, setIsBrowserOpen] = useState(true);

  const { bytes, doc, status } = usePdfDocument(node?.id);
  const isFontReady = useAnnotationFont();
  const {
    color,
    fontSize,
    setColor,
    setFontSize,
    setStrokeWidth,
    setTool,
    strokeWidth,
    tool,
  } = useEditorTools();
  const {
    actions,
    annotations,
    canRedo,
    canUndo,
    changeColor,
    changeFontSize,
    clear,
    draft: textDraft,
    openDraft,
    redo,
    selectedId,
    undo,
  } = useEditorMarkup({ fileId: node?.id, setColor, setFontSize });
  const { resetZoom, zoom, zoomIn, zoomOut } = usePdfZoom();
  const { exportPdf, status: exportStatus } = usePdfExport({
    annotations,
    bytes,
    fileName: node ? node.name : DEFAULT_EXPORT_NAME,
  });

  const toggleBrowser = useCallback(
    () => setIsBrowserOpen((open) => !open),
    []
  );

  const settings = { color, fontSize, strokeWidth, tool };

  return (
    /* Fullscreen paints its own backdrop behind the element, so the page needs its own ground. */
    <main
      className={cn("flex flex-col bg-background", EDITOR_HEIGHT_CLASS)}
      ref={rootRef}
    >
      <EditorFileBar
        isBrowserOpen={isBrowserOpen}
        isFullscreen={isFullscreen}
        isFullscreenSupported={isFullscreenSupported}
        node={node}
        onToggleBrowser={toggleBrowser}
        onToggleFullscreen={toggleFullscreen}
      />
      <div className="flex min-h-0 flex-1">
        {isBrowserOpen ? (
          <FileBrowserPanel activeNode={node} nodes={nodes} />
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col">
          <EditorToolbar
            canRedo={canRedo}
            canUndo={canUndo}
            color={color}
            exportStatus={exportStatus}
            fontSize={fontSize}
            onClear={clear}
            onColorChange={changeColor}
            onExport={exportPdf}
            onFontSizeChange={changeFontSize}
            onRedo={redo}
            onResetZoom={resetZoom}
            onStrokeWidthChange={setStrokeWidth}
            onToolChange={setTool}
            onUndo={undo}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            strokeWidth={strokeWidth}
            tool={tool}
            zoom={zoom}
          />
          <div className="flex min-h-0 flex-1 flex-col overflow-auto bg-muted">
            {doc && isFontReady ? (
              <PdfPageList
                actions={actions}
                annotations={annotations}
                doc={doc}
                onTextDraftChange={openDraft}
                selectedId={selectedId}
                settings={settings}
                textDraft={textDraft}
                zoom={zoom}
              />
            ) : (
              <EditorStatus status={status} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
