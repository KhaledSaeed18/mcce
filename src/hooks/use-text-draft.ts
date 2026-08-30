import { useCallback } from "react";
import { clampTextAnchor } from "@/lib/pdf-editor/bounds";
import { buildText } from "@/lib/pdf-editor/build-annotation";
import { getTextBox } from "@/lib/pdf-editor/text-metrics";
import type {
  AnnotationActions,
  PageSize,
  TextDraft,
} from "@/lib/pdf-editor/types";

interface TextDraftOptions {
  actions: AnnotationActions;
  draft: TextDraft | null;
  onChange: (draft: TextDraft | null) => void;
  size: PageSize;
}

/**
 * The field being typed into, and what its release does: write new text, rewrite
 * the text it was opened on, or remove that text once it has been emptied.
 */
export function useTextDraft({
  actions,
  draft,
  onChange,
  size,
}: TextDraftOptions) {
  const place = useCallback(
    (next: TextDraft) =>
      onChange({ ...next, ...clampTextAnchor(next, getTextBox(next), size) }),
    [onChange, size]
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
    (value: string) => {
      if (!draft) {
        return;
      }
      const text = value.trim();
      onChange(null);
      if (!text) {
        // Emptying a field is how text already on the page is taken off it.
        if (draft.id) {
          actions.remove(draft.id);
        }
        return;
      }
      const annotation = buildText(draft, text);
      const anchor = clampTextAnchor(annotation, getTextBox(annotation), size);
      const placed = { ...annotation, ...anchor };
      if (draft.id) {
        actions.replace(placed);
        return;
      }
      actions.add(placed);
    },
    [actions, draft, onChange, size]
  );

  return { cancel, commit, move, request: place };
}
