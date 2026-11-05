import { useCallback } from "react";
import { buildText } from "@/lib/pdf-editor/build-annotation";
import { keepTextOnPage } from "@/lib/pdf-editor/text-box";
import { cleanTypedText, isSameText } from "@/lib/pdf-editor/text-compare";
import type {
  Annotation,
  AnnotationActions,
  PageSize,
  TextDraft,
} from "@/lib/pdf-editor/types";

interface TextCommitOptions {
  actions: AnnotationActions;
  annotations: Annotation[];
  draft: TextDraft | null;
  onChange: (draft: TextDraft | null) => void;
  size: PageSize;
}

/** Leaving a box: write it, rewrite what it was opened on, or take that off the
 * page. Opening text and leaving it untouched adds no undo step. */
export function useTextCommit({
  actions,
  annotations,
  draft,
  onChange,
  size,
}: TextCommitOptions) {
  return useCallback(
    (shouldKeepSelected: boolean) => {
      if (!draft) {
        return;
      }
      const text = cleanTypedText(draft.text);
      onChange(null);

      // Emptying a box is how text already on the page is removed.
      if (!text) {
        if (draft.id) {
          actions.remove(draft.id);
        }
        return;
      }

      const placed = keepTextOnPage(buildText(draft, text), size);
      const original = annotations.find((item) => item.id === draft.id);
      if (!draft.id) {
        actions.add(placed);
      } else if (!(original?.type === "text" && isSameText(original, placed))) {
        actions.replace(placed);
      }
      actions.select(shouldKeepSelected ? placed.id : null);
    },
    [actions, annotations, draft, onChange, size]
  );
}
