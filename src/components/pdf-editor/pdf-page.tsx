import type { PDFDocumentProxy } from "pdfjs-dist";
import { useRef } from "react";
import { AnnotationCanvas } from "@/components/pdf-editor/annotation-canvas";
import { TextDraftField } from "@/components/pdf-editor/text-draft-field";
import { TextSelectionBox } from "@/components/pdf-editor/text-selection-box";
import { PLACEHOLDER_PAGE_SIZE } from "@/config/pdf-editor";
import { useInViewport } from "@/hooks/use-in-viewport";
import { usePdfPageRender } from "@/hooks/use-pdf-page-render";
import { useTextBoxResize } from "@/hooks/use-text-box-resize";
import { useTextDraft } from "@/hooks/use-text-draft";
import { findText } from "@/lib/pdf-editor/move";
import type {
  Annotation,
  AnnotationActions,
  TextDraft,
  ToolSettings,
} from "@/lib/pdf-editor/types";

interface PdfPageProps {
  actions: AnnotationActions;
  annotations: Annotation[];
  doc: PDFDocumentProxy;
  onTextDraftChange: (draft: TextDraft | null) => void;
  pageIndex: number;
  selectedId: string | null;
  settings: ToolSettings;
  textDraft: TextDraft | null;
  zoom: number;
}

export function PdfPage({
  actions,
  annotations,
  doc,
  onTextDraftChange,
  pageIndex,
  selectedId,
  settings,
  textDraft,
  zoom,
}: PdfPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInViewport(containerRef);
  const { canvasRef, size } = usePdfPageRender(doc, pageIndex, zoom, isVisible);
  const pageSize = size ?? PLACEHOLDER_PAGE_SIZE;
  const selected = findText(annotations, selectedId);
  const { cancel, commit, edit, move, request, resize } = useTextDraft({
    actions,
    draft: textDraft,
    onChange: onTextDraftChange,
    size: pageSize,
  });
  const selection = useTextBoxResize({
    annotation: selected,
    onReplace: actions.replace,
    size: pageSize,
  });

  return (
    /* Nothing may spill past the sheet: the markup layers stop where the page does. */
    <div
      className="relative overflow-hidden border-2 bg-card shadow-md"
      ref={containerRef}
      style={{ height: pageSize.height * zoom, width: pageSize.width * zoom }}
    >
      <canvas className="block" ref={canvasRef} />
      {size ? (
        <AnnotationCanvas
          actions={actions}
          annotations={annotations}
          editingId={textDraft?.id ?? null}
          onDraft={request}
          pageIndex={pageIndex}
          preview={selection.preview}
          selectedId={selectedId}
          settings={settings}
          size={size}
          zoom={zoom}
        />
      ) : null}
      {selected && !textDraft ? (
        <TextSelectionBox
          annotation={selection.preview ?? selected}
          onResize={selection.resize}
          onResizeEnd={selection.end}
          zoom={zoom}
        />
      ) : null}
      {textDraft ? (
        <TextDraftField
          draft={textDraft}
          onCancel={cancel}
          onCommit={commit}
          onEdit={edit}
          onMove={move}
          onResize={resize}
          zoom={zoom}
        />
      ) : null}
    </div>
  );
}
