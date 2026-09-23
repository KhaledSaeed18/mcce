import { MarkupSelectionFrame } from "@/components/pdf-editor/markup-selection-frame";
import { PageOverlayLayer } from "@/components/pdf-editor/page-overlay-layer";
import { TextDraftField } from "@/components/pdf-editor/text-draft-field";
import { TextSelectionBox } from "@/components/pdf-editor/text-selection-box";
import type { PageTextEditing } from "@/hooks/use-page-text-editing";
import { getAnnotationBox } from "@/lib/pdf-editor/annotation-box";
import type { Annotation, PageSize, TextDraft } from "@/lib/pdf-editor/types";

interface PdfPageOverlaysProps {
  editing: PageTextEditing;
  rotation: number;
  /** The selected markup as it should be framed, carried along by a drag. */
  shown: Annotation | null;
  size: PageSize;
  textDraft: TextDraft | null;
  zoom: number;
}

/** What sits over a page's markup: the frame on whatever is selected, and the
 * field text is typed into. */
export function PdfPageOverlays({
  editing,
  rotation,
  shown,
  size,
  textDraft,
  zoom,
}: PdfPageOverlaysProps) {
  const { field, selected, selection } = editing;

  return (
    <PageOverlayLayer rotation={rotation} size={size} zoom={zoom}>
      {selected && !textDraft ? (
        <TextSelectionBox
          annotation={
            selection.preview ?? (shown?.type === "text" ? shown : selected)
          }
          onResize={selection.resize}
          onResizeEnd={selection.end}
          rotation={rotation}
          zoom={zoom}
        />
      ) : null}
      {shown && shown.type !== "text" ? (
        <MarkupSelectionFrame box={getAnnotationBox(shown)} zoom={zoom} />
      ) : null}
      {textDraft ? (
        <TextDraftField
          draft={textDraft}
          onCancel={field.cancel}
          onCommit={field.commit}
          onEdit={field.edit}
          onMove={field.move}
          onResize={field.resize}
          rotation={rotation}
          zoom={zoom}
        />
      ) : null}
    </PageOverlayLayer>
  );
}
