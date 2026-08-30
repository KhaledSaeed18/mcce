import type { PDFDocumentProxy } from "pdfjs-dist";
import { PdfPage } from "@/components/pdf-editor/pdf-page";
import type {
  Annotation,
  AnnotationActions,
  EditorPage,
  TextDraft,
  ToolSettings,
} from "@/lib/pdf-editor/types";

interface PdfPageListProps {
  actions: AnnotationActions;
  annotations: Annotation[];
  doc: PDFDocumentProxy;
  onTextDraftChange: (draft: TextDraft | null) => void;
  pages: EditorPage[];
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
  pages,
  selectedId,
  settings,
  textDraft,
  zoom,
}: PdfPageListProps) {
  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {pages.map((page, position) => (
        <PdfPage
          actions={actions}
          annotations={annotations.filter(
            (annotation) => annotation.pageId === page.id
          )}
          doc={doc}
          key={page.id}
          onTextDraftChange={onTextDraftChange}
          page={page}
          position={position}
          selectedId={selectedId}
          settings={settings}
          textDraft={textDraft?.pageId === page.id ? textDraft : null}
          zoom={zoom}
        />
      ))}
    </div>
  );
}
