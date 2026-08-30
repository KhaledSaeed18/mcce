import { useCallback } from "react";
import { clampTextAnchor } from "@/lib/pdf-editor/bounds";
import { buildText } from "@/lib/pdf-editor/build-annotation";
import { getDraftBox, getTextBox } from "@/lib/pdf-editor/text-metrics";
import type {
  Annotation,
  PageSize,
  TextDraft,
  ToolSettings,
} from "@/lib/pdf-editor/types";

interface TextDraftOptions {
  draft: TextDraft | null;
  onAdd: (annotation: Annotation) => void;
  onChange: (draft: TextDraft | null) => void;
  pageIndex: number;
  settings: ToolSettings;
  size: PageSize;
  zoom: number;
}

/**
 * The field being typed into, kept on its page: the field itself while it is
 * open and placed, and the text it commits, which is measured and placed again.
 */
export function useTextDraft({
  draft,
  onAdd,
  onChange,
  pageIndex,
  settings,
  size,
  zoom,
}: TextDraftOptions) {
  const place = useCallback(
    (next: TextDraft) => {
      const anchor = clampTextAnchor(
        next,
        getDraftBox(next, settings.fontSize, zoom),
        size
      );
      onChange({ ...next, ...anchor });
    },
    [onChange, settings.fontSize, size, zoom]
  );

  const cancel = useCallback(() => onChange(null), [onChange]);

  const move = useCallback(
    (dx: number, dy: number) => {
      if (!draft) {
        return;
      }
      place({ ...draft, x: draft.x + dx, y: draft.y + dy });
    },
    [draft, place]
  );

  const commit = useCallback(
    (text: string) => {
      if (!draft) {
        return;
      }
      const annotation = buildText(text, draft, pageIndex, settings);
      const anchor = clampTextAnchor(annotation, getTextBox(annotation), size);
      onAdd({ ...annotation, ...anchor });
      onChange(null);
    },
    [draft, onAdd, onChange, pageIndex, settings, size]
  );

  return { cancel, commit, move, request: place };
}
