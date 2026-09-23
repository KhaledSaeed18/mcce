import type { PDFDocumentProxy } from "pdfjs-dist";
import { useMemo } from "react";
import { PdfPage } from "@/components/pdf-editor/pdf-page";
import { groupAnnotationsByPage } from "@/lib/pdf-editor/group-by-page";
import type {
  Annotation,
  AnnotationActions,
  EditorPage,
  SearchHit,
  TextDraft,
  ToolSettings,
} from "@/lib/pdf-editor/types";

/** Shared by every page with nothing on it, so they all hold the same empty list. */
const NO_ANNOTATIONS: Annotation[] = [];
const NO_HITS: SearchHit[] = [];

interface PdfPageListProps {
  actions: AnnotationActions;
  annotations: Annotation[];
  doc: PDFDocumentProxy;
  /** Search matches keyed by the position of the page they are on. */
  hitsByPosition: Map<number, SearchHit[]>;
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
  hitsByPosition,
  onTextDraftChange,
  pages,
  selectedId,
  settings,
  textDraft,
  zoom,
}: PdfPageListProps) {
  const byPage = useMemo(
    () => groupAnnotationsByPage(annotations),
    [annotations]
  );

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {pages.map((page, position) => (
        <PdfPage
          actions={actions}
          annotations={byPage.get(page.id) ?? NO_ANNOTATIONS}
          doc={doc}
          key={page.id}
          onTextDraftChange={onTextDraftChange}
          page={page}
          position={position}
          searchHits={hitsByPosition.get(position) ?? NO_HITS}
          selectedId={selectedId}
          settings={settings}
          textDraft={textDraft?.pageId === page.id ? textDraft : null}
          zoom={zoom}
        />
      ))}
    </div>
  );
}
