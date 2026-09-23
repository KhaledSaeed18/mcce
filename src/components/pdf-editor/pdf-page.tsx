import type { PDFDocumentProxy } from "pdfjs-dist";
import { useRef } from "react";
import { AnnotationCanvas } from "@/components/pdf-editor/annotation-canvas";
import { PdfPageOverlays } from "@/components/pdf-editor/pdf-page-overlays";
import { PdfSearchHighlights } from "@/components/pdf-editor/pdf-search-highlights";
import { PdfTextLayer } from "@/components/pdf-editor/pdf-text-layer";
import {
  PAGE_INDEX_ATTRIBUTE,
  PLACEHOLDER_PAGE_SIZE,
} from "@/config/pdf-editor";
import { usePageTextEditing } from "@/hooks/use-page-text-editing";
import { usePdfPageLayers } from "@/hooks/use-pdf-page-layers";
import { useSearchHighlights } from "@/hooks/use-search-highlights";
import { getRenderedSize } from "@/lib/pdf-editor/rotation";
import type {
  Annotation,
  AnnotationActions,
  EditorPage,
  SearchHit,
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
  /** The search matches on this page, drawn over its text. */
  searchHits: SearchHit[];
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
  searchHits,
  selectedId,
  settings,
  textDraft,
  zoom,
}: PdfPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { canvasRef, size, textDivs, textLayerRef } = usePdfPageLayers(
    containerRef,
    doc,
    page,
    zoom
  );
  const highlights = useSearchHighlights(containerRef, textDivs, searchHits);
  const pageSize = size ?? PLACEHOLDER_PAGE_SIZE;
  const rendered = getRenderedSize(pageSize, page.rotation);
  const pageMarker = { [PAGE_INDEX_ATTRIBUTE]: position };
  const editing = usePageTextEditing({
    actions,
    annotations,
    draft: textDraft,
    onDraftChange: onTextDraftChange,
    selectedId,
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
      <PdfTextLayer
        isSelectable={settings.tool === "select"}
        layerRef={textLayerRef}
      />
      <PdfSearchHighlights
        boxes={highlights.boxes}
        currentRef={highlights.currentRef}
      />
      {size ? (
        <AnnotationCanvas
          actions={actions}
          annotations={annotations}
          editingId={textDraft?.id ?? null}
          onDraft={editing.field.request}
          pageId={page.id}
          preview={editing.selection.preview}
          rotation={page.rotation}
          selectedId={selectedId}
          settings={settings}
          size={size}
          zoom={zoom}
        />
      ) : null}
      <PdfPageOverlays
        editing={editing}
        rotation={page.rotation}
        size={pageSize}
        textDraft={textDraft}
        zoom={zoom}
      />
    </div>
  );
}
