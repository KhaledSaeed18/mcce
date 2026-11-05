import { type ChangeEvent, useCallback, useRef } from "react";
import { TextBoxFrame } from "@/components/pdf-editor/text-box-frame";
import { TextMoveStrip } from "@/components/pdf-editor/text-move-strip";
import {
  TEXT_CARET_ROOM_PX,
  TEXT_FIELD_ATTRIBUTE,
  TEXT_FILL_PADDING_RATIO,
  TEXT_FONTS,
  TEXT_LINE_HEIGHT_RATIO,
  TEXT_PLACEHOLDER,
} from "@/config/pdf-editor";
import { useTextDraftDismiss } from "@/hooks/use-text-draft-dismiss";
import { useTextFieldFocus } from "@/hooks/use-text-field-focus";
import { useTextFieldKeys } from "@/hooks/use-text-field-keys";
import { getFieldBox } from "@/lib/pdf-editor/text-box";
import { getFieldBaselineShift } from "@/lib/pdf-editor/text-metrics";
import type {
  FrameCorner,
  TextBoxEdge,
  TextDraft,
  TextStyle,
} from "@/lib/pdf-editor/types";

interface TextDraftFieldProps {
  draft: TextDraft;
  onCommit: (shouldKeepSelected: boolean) => void;
  onEdit: (text: string) => void;
  onFit: () => void;
  onMove: (dx: number, dy: number) => void;
  onResizeCorner: (corner: FrameCorner, dx: number, dy: number) => void;
  onResizeEnd: () => void;
  onResizeSide: (edge: TextBoxEdge, dx: number) => void;
  onRestyle: (style: Partial<TextStyle>) => void;
  rotation: number;
  zoom: number;
}

const FIELD_MARKER = { [TEXT_FIELD_ATTRIBUTE]: "" };

/** Typed right on the page, transparent over it, in the very font, size, color,
 * and place the text keeps afterward. */
export function TextDraftField({
  draft,
  onCommit,
  onEdit,
  onFit,
  onMove,
  onResizeCorner,
  onResizeEnd,
  onResizeSide,
  onRestyle,
  rotation,
  zoom,
}: TextDraftFieldProps) {
  const fieldRef = useRef<HTMLTextAreaElement>(null);
  const isAutoWidth = draft.width === undefined;
  const fillInset = draft.fontSize * TEXT_FILL_PADDING_RATIO * zoom;

  useTextFieldFocus(fieldRef, draft.caret);
  const handleFinish = useCallback(() => onCommit(true), [onCommit]);
  const handleDismiss = useCallback(() => onCommit(false), [onCommit]);
  useTextDraftDismiss(handleDismiss);
  const handleKeyDown = useTextFieldKeys({
    onFinish: handleFinish,
    onRestyle,
    style: draft,
  });
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => onEdit(event.target.value),
    [onEdit]
  );

  return (
    <TextBoxFrame
      box={getFieldBox(draft)}
      isEditing
      onFit={onFit}
      onResizeCorner={onResizeCorner}
      onResizeEnd={onResizeEnd}
      onResizeSide={onResizeSide}
      rotation={rotation}
      zoom={zoom}
    >
      {draft.background ? (
        <span
          className="absolute inset-y-0"
          style={{
            backgroundColor: draft.background,
            left: -fillInset,
            right: -fillInset,
          }}
        />
      ) : null}
      <textarea
        {...FIELD_MARKER}
        aria-label="Annotation text"
        className="pointer-events-auto absolute top-0 left-0 block h-full resize-none overflow-hidden border-0 bg-transparent p-0 outline-none placeholder:text-current placeholder:opacity-50"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={TEXT_PLACEHOLDER}
        ref={fieldRef}
        rows={1}
        spellCheck={false}
        style={{
          caretColor: draft.color,
          color: draft.color,
          fontFamily: TEXT_FONTS[draft.fontFamily ?? "sans"].stack,
          fontSize: draft.fontSize * zoom,
          fontStyle: draft.italic ? "italic" : "normal",
          fontWeight: draft.bold ? 700 : 400,
          lineHeight: `${draft.fontSize * TEXT_LINE_HEIGHT_RATIO * zoom}px`,
          overflowWrap: "anywhere",
          textAlign: draft.align ?? "left",
          textDecoration: draft.underline ? "underline" : "none",
          transform: `translateY(${getFieldBaselineShift(draft, draft.fontSize) * zoom}px)`,
          whiteSpace: isAutoWidth ? "pre" : "pre-wrap",
          width: isAutoWidth ? `calc(100% + ${TEXT_CARET_ROOM_PX}px)` : "100%",
        }}
        value={draft.text}
        wrap={isAutoWidth ? "off" : "soft"}
      />
      <TextMoveStrip
        edge="top"
        onMove={onMove}
        rotation={rotation}
        zoom={zoom}
      />
      <TextMoveStrip
        edge="bottom"
        onMove={onMove}
        rotation={rotation}
        zoom={zoom}
      />
    </TextBoxFrame>
  );
}
