import { useCallback } from "react";
import { clampTextAnchor } from "@/lib/pdf-editor/bounds";
import { buildText } from "@/lib/pdf-editor/build-annotation";
import { getTextBox } from "@/lib/pdf-editor/text-layout";
import type {
  AnnotationActions,
  PageSize,
  TextDraft,
} from "@/lib/pdf-editor/types";

interface TextCommitOptions {
  actions: AnnotationActions;
  draft: TextDraft | null;
  onChange: (draft: TextDraft | null) => void;
  size: PageSize;
}

/** Leaving a box: write it, rewrite what it was opened on, or take that off the page. */
export function useTextCommit({
  actions,
  draft,
  onChange,
  size,
}: TextCommitOptions) {
  return useCallback(() => {
    if (!draft) {
      return;
    }
    const text = draft.text.trim();
    onChange(null);

    // Emptying a box is how text already on the page is removed.
    if (!text) {
      if (draft.id) {
        actions.remove(draft.id);
      }
      return;
    }

    const annotation = buildText(draft, text);
    const placed = {
      ...annotation,
      ...clampTextAnchor(annotation, getTextBox(annotation), size),
    };
    if (draft.id) {
      actions.replace(placed);
    } else {
      actions.add(placed);
    }
    // What was just written stays selected, the way it does elsewhere.
    actions.select(placed.id);
  }, [actions, draft, onChange, size]);
}
