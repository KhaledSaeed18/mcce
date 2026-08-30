import type { PDFDocumentProxy } from "pdfjs-dist";
import { useRef } from "react";
import { AnnotationCanvas } from "@/components/pdf-editor/annotation-canvas";
import { TextDraftInput } from "@/components/pdf-editor/text-draft-input";
import { PLACEHOLDER_PAGE_SIZE } from "@/config/pdf-editor";
import { useInViewport } from "@/hooks/use-in-viewport";
import { usePdfPageRender } from "@/hooks/use-pdf-page-render";
import { useTextDraft } from "@/hooks/use-text-draft";
import type {
  Annotation,
  Point,
  TextDraft,
  ToolSettings,
} from "@/lib/pdf-editor/types";

interface PdfPageProps {
  annotations: Annotation[];
  doc: PDFDocumentProxy;
  onAdd: (annotation: Annotation) => void;
  onErase: (pageIndex: number, point: Point) => void;
  onMoveText: (id: string, dx: number, dy: number) => void;
  onTextDraftChange: (draft: TextDraft | null) => void;
  pageIndex: number;
  settings: ToolSettings;
  textDraft: TextDraft | null;
  zoom: number;
}

export function PdfPage({
  annotations,
  doc,
  onAdd,
  onErase,
  onMoveText,
  onTextDraftChange,
  pageIndex,
  settings,
  textDraft,
  zoom,
}: PdfPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInViewport(containerRef);
  const { canvasRef, size } = usePdfPageRender(doc, pageIndex, zoom, isVisible);
  const pageSize = size ?? PLACEHOLDER_PAGE_SIZE;
  const { cancel, commit, move, request } = useTextDraft({
    draft: textDraft,
    onAdd,
    onChange: onTextDraftChange,
    pageIndex,
    settings,
    size: pageSize,
    zoom,
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
          annotations={annotations}
          onAdd={onAdd}
          onErase={onErase}
          onMoveText={onMoveText}
          onTextRequest={request}
          pageIndex={pageIndex}
          settings={settings}
          size={size}
          zoom={zoom}
        />
      ) : null}
      {textDraft ? (
        <TextDraftInput
          draft={textDraft}
          fontSize={settings.fontSize}
          onCancel={cancel}
          onCommit={commit}
          onMove={move}
          zoom={zoom}
        />
      ) : null}
    </div>
  );
}
