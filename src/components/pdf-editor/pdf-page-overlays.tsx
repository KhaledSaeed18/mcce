import { PageOverlayLayer } from "@/components/pdf-editor/page-overlay-layer";
import { TextDraftField } from "@/components/pdf-editor/text-draft-field";
import { TextSelectionBox } from "@/components/pdf-editor/text-selection-box";
import type { PageTextEditing } from "@/hooks/use-page-text-editing";
import type { PageSize, TextDraft } from "@/lib/pdf-editor/types";

interface PdfPageOverlaysProps {
  editing: PageTextEditing;
  rotation: number;
  size: PageSize;
  textDraft: TextDraft | null;
  zoom: number;
}

/** What sits over a page's markup: the frame on selected text, and the field
 * text is typed into. */
export function PdfPageOverlays({
  editing,
  rotation,
  size,
  textDraft,
  zoom,
}: PdfPageOverlaysProps) {
  const { field, selected, selection } = editing;

  return (
    <PageOverlayLayer rotation={rotation} size={size} zoom={zoom}>
      {selected && !textDraft ? (
        <TextSelectionBox
          annotation={selection.preview ?? selected}
          onResize={selection.resize}
          onResizeEnd={selection.end}
          rotation={rotation}
          zoom={zoom}
        />
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
