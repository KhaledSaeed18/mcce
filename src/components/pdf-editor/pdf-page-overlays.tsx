import { useCallback } from "react";
import { ArrowEndHandle } from "@/components/pdf-editor/arrow-end-handle";
import { MarkupResizeHandle } from "@/components/pdf-editor/markup-resize-handle";
import { MarkupSelectionFrame } from "@/components/pdf-editor/markup-selection-frame";
import { NoteCard } from "@/components/pdf-editor/note-card";
import { PageOverlayLayer } from "@/components/pdf-editor/page-overlay-layer";
import { TextBoxFrame } from "@/components/pdf-editor/text-box-frame";
import { TextDraftField } from "@/components/pdf-editor/text-draft-field";
import type { MarkupResize } from "@/hooks/use-markup-resize";
import type { PageTextEditing } from "@/hooks/use-page-text-editing";
import { getAnnotationBox } from "@/lib/pdf-editor/annotation-box";
import { isResizable } from "@/lib/pdf-editor/scale-annotation";
import { getFieldBox } from "@/lib/pdf-editor/text-box";
import type {
  Annotation,
  AnnotationActions,
  ArrowEnd,
  FrameCorner,
  PageSize,
  TextDraft,
} from "@/lib/pdf-editor/types";

const ARROW_ENDS: readonly ArrowEnd[] = ["from", "to"];

const CORNERS: readonly FrameCorner[] = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

interface PdfPageOverlaysProps {
  actions: AnnotationActions;
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
  actions,
  editing,
  resize,
  rotation,
  shown,
  size,
  textDraft,
  zoom,
}: PdfPageOverlaysProps) {
  const { field, selected, selection } = editing;
  const { select } = actions;
  const handleClose = useCallback(() => select(null), [select]);
  const { preview } = selection;
  const shownNow = resize.preview ?? shown;
  const arrow = shownNow?.type === "arrow" ? shownNow : null;

  return (
    <>
      <PageOverlayLayer rotation={rotation} size={size} zoom={zoom}>
        {selected && !textDraft ? (
          <TextBoxFrame
            box={getFieldBox(
              preview ?? (shown?.type === "text" ? shown : selected)
            )}
            isEditing={false}
            onFit={selection.fitWidth}
            onResizeCorner={selection.resizeCorner}
            onResizeEnd={selection.end}
            onResizeSide={selection.resizeSide}
            rotation={rotation}
            sizeLabel={
              preview && preview.fontSize !== selected.fontSize
                ? `${preview.fontSize} px`
                : undefined
            }
            zoom={zoom}
          />
        ) : null}
        {shown && shown.type !== "text" && shown.type !== "note" ? (
          <MarkupSelectionFrame
            box={getAnnotationBox(arrow ?? resize.preview ?? shown)}
            zoom={zoom}
          >
            {isResizable(shown) && shown.type !== "arrow"
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
        {arrow
          ? ARROW_ENDS.map((end) => (
              <ArrowEndHandle
                end={end}
                key={end}
                onEnd={resize.end}
                onMove={resize.moveArrowEnd}
                point={arrow[end]}
                rotation={rotation}
                zoom={zoom}
              />
            ))
          : null}
        {textDraft ? (
          <TextDraftField
            draft={textDraft}
            key={textDraft.id ?? "new"}
            onCommit={field.commit}
            onEdit={field.edit}
            onFit={field.fitWidth}
            onMove={field.move}
            onResizeCorner={field.resizeCorner}
            onResizeEnd={field.finish}
            onResizeSide={field.resizeSide}
            onRestyle={actions.restyleText}
            rotation={rotation}
            zoom={zoom}
          />
        ) : null}
      </PageOverlayLayer>
      {shown?.type === "note" ? (
        <NoteCard
          key={shown.id}
          note={shown}
          onClose={handleClose}
          onRemove={actions.remove}
          onReplace={actions.replace}
          rotation={rotation}
          size={size}
          zoom={zoom}
        />
      ) : null}
    </>
  );
}
