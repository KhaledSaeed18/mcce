import type { PDFDocumentProxy } from "pdfjs-dist";
import { useMemo } from "react";
import { PdfPage } from "@/components/pdf-editor/pdf-page";
import type {
  Annotation,
  AnnotationActions,
  TextDraft,
  ToolSettings,
} from "@/lib/pdf-editor/types";

interface PdfPageListProps {
  actions: AnnotationActions;
  annotations: Annotation[];
  doc: PDFDocumentProxy;
  onTextDraftChange: (draft: TextDraft | null) => void;
  selectedId: string | null;
  settings: ToolSettings;
  textDraft: TextDraft | null;
  zoom: number;
}

export function PdfPageList({
  actions,
  annotations,
  doc,
  onTextDraftChange,
  selectedId,
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
          actions={actions}
          annotations={annotations.filter(
            (annotation) => annotation.pageIndex === pageIndex
          )}
          doc={doc}
          key={pageIndex}
          onTextDraftChange={onTextDraftChange}
          pageIndex={pageIndex}
          selectedId={selectedId}
          settings={settings}
          textDraft={textDraft?.pageIndex === pageIndex ? textDraft : null}
          zoom={zoom}
        />
      ))}
    </div>
  );
}
