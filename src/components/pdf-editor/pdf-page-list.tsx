import type { PDFDocumentProxy } from "pdfjs-dist";
import { useMemo } from "react";
import { PdfPage } from "@/components/pdf-editor/pdf-page";
import type {
  Annotation,
  Point,
  TextDraft,
  ToolSettings,
} from "@/lib/pdf-editor/types";

interface PdfPageListProps {
  annotations: Annotation[];
  doc: PDFDocumentProxy;
  onAdd: (annotation: Annotation) => void;
  onErase: (pageIndex: number, point: Point) => void;
  onMoveText: (id: string, dx: number, dy: number) => void;
  onTextDraftChange: (draft: TextDraft | null) => void;
  settings: ToolSettings;
  textDraft: TextDraft | null;
  zoom: number;
}

export function PdfPageList({
  annotations,
  doc,
  onAdd,
  onErase,
  onMoveText,
  onTextDraftChange,
  settings,
  textDraft,
  zoom,
}: PdfPageListProps) {
  const pageIndexes = useMemo(
    () => Array.from({ length: doc.numPages }, (_, index) => index),
    [doc.numPages]
  );

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {pageIndexes.map((pageIndex) => (
        <PdfPage
          annotations={annotations.filter(
            (annotation) => annotation.pageIndex === pageIndex
          )}
          doc={doc}
          key={pageIndex}
          onAdd={onAdd}
          onErase={onErase}
          onMoveText={onMoveText}
          onTextDraftChange={onTextDraftChange}
          pageIndex={pageIndex}
          settings={settings}
          textDraft={textDraft?.pageIndex === pageIndex ? textDraft : null}
          zoom={zoom}
        />
      ))}
    </div>
  );
}
