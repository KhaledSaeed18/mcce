import { useCallback, useState } from "react";
import { EditorFileBar } from "@/components/pdf-editor/editor-file-bar";
import { EditorStatus } from "@/components/pdf-editor/editor-status";
import { EditorToolbar } from "@/components/pdf-editor/editor-toolbar";
import { FileBrowserPanel } from "@/components/pdf-editor/file-browser-panel";
import { PdfPageList } from "@/components/pdf-editor/pdf-page-list";
import { DEFAULT_EXPORT_NAME, EDITOR_HEIGHT_CLASS } from "@/config/pdf-editor";
import { useEditorTools } from "@/hooks/use-editor-tools";
import { usePdfAnnotations } from "@/hooks/use-pdf-annotations";
import { usePdfDocument } from "@/hooks/use-pdf-document";
import { usePdfExport } from "@/hooks/use-pdf-export";
import { usePdfZoom } from "@/hooks/use-pdf-zoom";
import type { DriveNode } from "@/lib/drive/types";
import type { TextDraft } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

interface PdfEditorWorkspaceProps {
  node: DriveNode | null;
  nodes: DriveNode[];
}

export function PdfEditorWorkspace({ node, nodes }: PdfEditorWorkspaceProps) {
  const [isBrowserOpen, setIsBrowserOpen] = useState(true);
  const [textDraft, setTextDraft] = useState<TextDraft | null>(null);

  const { bytes, doc, status } = usePdfDocument(node?.id);
  const {
    add,
    annotations,
    canRedo,
    canUndo,
    clear,
    eraseAt,
    move,
    redo,
    undo,
  } = usePdfAnnotations(node?.id);
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
    <main className={cn("flex flex-col", EDITOR_HEIGHT_CLASS)}>
      <EditorFileBar
        isBrowserOpen={isBrowserOpen}
        node={node}
        onToggleBrowser={toggleBrowser}
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
            onColorChange={setColor}
            onExport={exportPdf}
            onFontSizeChange={setFontSize}
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
            {doc ? (
              <PdfPageList
                annotations={annotations}
                doc={doc}
                onAdd={add}
                onErase={eraseAt}
                onMoveText={move}
                onTextDraftChange={setTextDraft}
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
