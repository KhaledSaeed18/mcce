import type { PDFDocumentProxy } from "pdfjs-dist";
import { useRef } from "react";
import { AnnotationCanvas } from "@/components/pdf-editor/annotation-canvas";
import { PageOverlayLayer } from "@/components/pdf-editor/page-overlay-layer";
import { TextDraftField } from "@/components/pdf-editor/text-draft-field";
import { TextSelectionBox } from "@/components/pdf-editor/text-selection-box";
import {
  PAGE_INDEX_ATTRIBUTE,
  PLACEHOLDER_PAGE_SIZE,
} from "@/config/pdf-editor";
import { useInViewport } from "@/hooks/use-in-viewport";
import { usePdfPageRender } from "@/hooks/use-pdf-page-render";
import { useTextBoxResize } from "@/hooks/use-text-box-resize";
import { useTextDraft } from "@/hooks/use-text-draft";
import { findText } from "@/lib/pdf-editor/move";
import { getRenderedSize } from "@/lib/pdf-editor/rotation";
import type {
  Annotation,
  AnnotationActions,
  EditorPage,
  TextDraft,
  ToolSettings,
} from "@/lib/pdf-editor/types";

interface PdfPageProps {
  actions: AnnotationActions;
  annotations: Annotation[];
  doc: PDFDocumentProxy;
  onTextDraftChange: (draft: TextDraft | null) => void;
  page: EditorPage;
  /** Where the page sits in the document now, which is what the scroller counts. */
  position: number;
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
  page,
  position,
  selectedId,
  settings,
  textDraft,
  zoom,
}: PdfPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInViewport(containerRef);
  const { canvasRef, size } = usePdfPageRender(
    doc,
    page.sourceIndex,
    zoom,
    isVisible,
    page.rotation
  );
  const pageSize = size ?? PLACEHOLDER_PAGE_SIZE;
  const rendered = getRenderedSize(pageSize, page.rotation);
  const selected = findText(annotations, selectedId);
  const pageMarker = { [PAGE_INDEX_ATTRIBUTE]: position };
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
      {...pageMarker}
      className="relative scroll-mt-6 overflow-hidden border-2 bg-card shadow-md"
      ref={containerRef}
      style={{ height: rendered.height * zoom, width: rendered.width * zoom }}
    >
      <canvas className="block" ref={canvasRef} />
      {size ? (
        <AnnotationCanvas
          actions={actions}
          annotations={annotations}
          editingId={textDraft?.id ?? null}
          onDraft={request}
          pageId={page.id}
          preview={selection.preview}
          rotation={page.rotation}
          selectedId={selectedId}
          settings={settings}
          size={size}
          zoom={zoom}
        />
      ) : null}
      <PageOverlayLayer rotation={page.rotation} size={pageSize} zoom={zoom}>
        {selected && !textDraft ? (
          <TextSelectionBox
            annotation={selection.preview ?? selected}
            onResize={selection.resize}
            onResizeEnd={selection.end}
            rotation={page.rotation}
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
            rotation={page.rotation}
            zoom={zoom}
          />
        ) : null}
      </PageOverlayLayer>
    </div>
  );
}
