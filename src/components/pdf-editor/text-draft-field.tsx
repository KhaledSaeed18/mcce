import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useRef,
} from "react";
import { TextBoxResizer } from "@/components/pdf-editor/text-box-resizer";
import { TextDraftHandle } from "@/components/pdf-editor/text-draft-handle";
import { ANNOTATION_FONT_FAMILY } from "@/config/pdf-editor";
import { useAutoGrow } from "@/hooks/use-auto-grow";
import { getFieldWidth } from "@/lib/pdf-editor/text-box";
import { layoutText } from "@/lib/pdf-editor/text-layout";
import type { TextBoxEdge, TextDraft } from "@/lib/pdf-editor/types";

interface TextDraftFieldProps {
  draft: TextDraft;
  onCancel: () => void;
  onCommit: () => void;
  onEdit: (text: string) => void;
  onMove: (dx: number, dy: number) => void;
  onResize: (edge: TextBoxEdge, dx: number) => void;
  rotation: number;
  zoom: number;
}

/** Typed in the font, size and colour the text will keep, over the box it will fill. */
export function TextDraftField({
  draft,
  onCancel,
  onCommit,
  onEdit,
  onMove,
  onResize,
  rotation,
  zoom,
}: TextDraftFieldProps) {
  const fieldRef = useRef<HTMLTextAreaElement>(null);
  const { box, lineHeight } = layoutText(draft);
  const width = getFieldWidth(draft);
  useAutoGrow(fieldRef);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => onEdit(event.target.value),
    [onEdit]
  );

  /** Enter belongs to the text now, so the field is left rather than submitted. */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Escape") {
        onCancel();
        return;
      }
      if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onCommit();
      }
    },
    [onCancel, onCommit]
  );

  return (
    <div
      className="pointer-events-auto absolute z-10"
      style={{ left: box.x * zoom, top: box.y * zoom, width: width * zoom }}
    >
      <TextDraftHandle onMove={onMove} rotation={rotation} zoom={zoom} />
      <TextBoxResizer
        edge="left"
        onResize={onResize}
        rotation={rotation}
        zoom={zoom}
      />
      <TextBoxResizer
        edge="right"
        onResize={onResize}
        rotation={rotation}
        zoom={zoom}
      />
      <textarea
        aria-label="Annotation text"
        autoFocus
        className="block w-full resize-none overflow-hidden rounded-none border-0 bg-card/90 p-0 outline-2 outline-border outline-offset-2 focus-visible:outline-primary"
        onBlur={onCommit}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type here"
        ref={fieldRef}
        rows={1}
        style={{
          color: draft.color,
          fontFamily: ANNOTATION_FONT_FAMILY,
          fontSize: draft.fontSize * zoom,
          lineHeight: `${lineHeight * zoom}px`,
        }}
        value={draft.text}
      />
    </div>
  );
}
