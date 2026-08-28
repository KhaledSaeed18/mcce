import type { PDFDocumentProxy } from "pdfjs-dist";
import { useCallback, useRef } from "react";
import { AnnotationCanvas } from "@/components/pdf-editor/annotation-canvas";
import { TextDraftInput } from "@/components/pdf-editor/text-draft-input";
import { PLACEHOLDER_PAGE_SIZE } from "@/config/pdf-editor";
import { useInViewport } from "@/hooks/use-in-viewport";
import { usePdfPageRender } from "@/hooks/use-pdf-page-render";
import { buildText } from "@/lib/pdf-editor/build-annotation";
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

  const handleCancelText = useCallback(
    () => onTextDraftChange(null),
    [onTextDraftChange]
  );

  const handleMoveDraft = useCallback(
    (dx: number, dy: number) => {
      if (!textDraft) {
        return;
      }
      onTextDraftChange({
        ...textDraft,
        x: textDraft.x + dx,
        y: textDraft.y + dy,
      });
    },
    [onTextDraftChange, textDraft]
  );

  const handleCommitText = useCallback(
    (text: string) => {
      if (!textDraft) {
        return;
      }
      onAdd(
        buildText(text, { x: textDraft.x, y: textDraft.y }, pageIndex, settings)
      );
      onTextDraftChange(null);
    },
    [onAdd, onTextDraftChange, pageIndex, settings, textDraft]
  );

  return (
    <div
      className="relative border-2 bg-card shadow-md"
      ref={containerRef}
      style={{
        height: (size ?? PLACEHOLDER_PAGE_SIZE).height * zoom,
        width: (size ?? PLACEHOLDER_PAGE_SIZE).width * zoom,
      }}
    >
      <canvas className="block" ref={canvasRef} />
      {size ? (
        <AnnotationCanvas
          annotations={annotations}
          onAdd={onAdd}
          onErase={onErase}
          onMoveText={onMoveText}
          onTextRequest={onTextDraftChange}
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
          onCancel={handleCancelText}
          onCommit={handleCommitText}
          onMove={handleMoveDraft}
          zoom={zoom}
        />
      ) : null}
    </div>
  );
}
