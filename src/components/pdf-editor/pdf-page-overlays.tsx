import { MarkupResizeHandle } from "@/components/pdf-editor/markup-resize-handle";
import { MarkupSelectionFrame } from "@/components/pdf-editor/markup-selection-frame";
import { PageOverlayLayer } from "@/components/pdf-editor/page-overlay-layer";
import { TextDraftField } from "@/components/pdf-editor/text-draft-field";
import { TextSelectionBox } from "@/components/pdf-editor/text-selection-box";
import type { MarkupResize } from "@/hooks/use-markup-resize";
import type { PageTextEditing } from "@/hooks/use-page-text-editing";
import { getAnnotationBox } from "@/lib/pdf-editor/annotation-box";
import { isResizable } from "@/lib/pdf-editor/scale-annotation";
import type {
  Annotation,
  FrameCorner,
  PageSize,
  TextDraft,
} from "@/lib/pdf-editor/types";

const CORNERS: readonly FrameCorner[] = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

interface PdfPageOverlaysProps {
  editing: PageTextEditing;
  resize: MarkupResize;
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
  resize,
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
        <MarkupSelectionFrame
          box={getAnnotationBox(resize.preview ?? shown)}
          zoom={zoom}
        >
          {isResizable(shown)
            ? CORNERS.map((corner) => (
                <MarkupResizeHandle
                  corner={corner}
                  key={corner}
                  onEnd={resize.end}
                  onResize={resize.resize}
                  rotation={rotation}
                  zoom={zoom}
                />
              ))
            : null}
        </MarkupSelectionFrame>
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
