import { useCallback } from "react";
import { useTextCommit } from "@/hooks/use-text-commit";
import { clampTextAnchor } from "@/lib/pdf-editor/bounds";
import {
  getFieldBox,
  getFieldWidth,
  resizeTextBox,
  withBoundedWidth,
} from "@/lib/pdf-editor/text-box";
import type {
  AnnotationActions,
  PageSize,
  TextBoxEdge,
  TextDraft,
} from "@/lib/pdf-editor/types";

interface TextDraftOptions {
  actions: AnnotationActions;
  draft: TextDraft | null;
  onChange: (draft: TextDraft | null) => void;
  size: PageSize;
}

/**
 * The box being typed into, and what leaving it does: write new text, rewrite
 * the text it was opened on, or remove that text once it has been emptied.
 */
export function useTextDraft({
  actions,
  draft,
  onChange,
  size,
}: TextDraftOptions) {
  const commit = useTextCommit({ actions, draft, onChange, size });

  const place = useCallback(
    (next: TextDraft) => {
      const bounded = withBoundedWidth(next, size);
      onChange({
        ...bounded,
        ...clampTextAnchor(bounded, getFieldBox(bounded), size),
      });
    },
    [onChange, size]
  );

  const cancel = useCallback(() => onChange(null), [onChange]);

  const withDraft = useCallback(
    (change: (current: TextDraft) => TextDraft) => {
      if (draft) {
        place(change(draft));
      }
    },
    [draft, place]
  );

  const edit = useCallback(
    (text: string) => withDraft((current) => ({ ...current, text })),
    [withDraft]
  );

  const move = useCallback(
    (dx: number, dy: number) =>
      withDraft((current) => ({
        ...current,
        x: current.x + dx,
        y: current.y + dy,
      })),
    [withDraft]
  );

  const resize = useCallback(
    (edge: TextBoxEdge, dx: number) =>
      withDraft((current) =>
        resizeTextBox(
          // The field shows a minimum width, so a drag starts from that.
          { ...current, width: current.width ?? getFieldWidth(current) },
          edge,
          dx,
          size
        )
      ),
    [size, withDraft]
  );

  return { cancel, commit, edit, move, request: place, resize };
}
