import { useCallback, useLayoutEffect } from "react";
import type { MarkupPress } from "@/hooks/use-markup-drag";
import { useSelectedTextKeys } from "@/hooks/use-selected-text-keys";
import { useSelectedTextTransform } from "@/hooks/use-selected-text-transform";
import { useTextDraft } from "@/hooks/use-text-draft";
import { toDraft } from "@/lib/pdf-editor/build-draft";
import { findText } from "@/lib/pdf-editor/move";
import { keepTextOnPage } from "@/lib/pdf-editor/text-box";
import { getCaretOffset } from "@/lib/pdf-editor/text-caret";
import type {
  Annotation,
  AnnotationActions,
  PageSize,
  TextAnnotation,
  TextDraft,
} from "@/lib/pdf-editor/types";

interface PageTextEditingOptions {
  actions: AnnotationActions;
  annotations: Annotation[];
  draft: TextDraft | null;
  /** False until the page is measured, when its size is only a placeholder. */
  isMeasured: boolean;
  onDraftChange: (draft: TextDraft | null) => void;
  /** A press on markup that is not selected text, which is how a cover is opened. */
  onOtherPress: (id: string) => void;
  selectedId: string | null;
  size: PageSize;
}

/** One page's text work: the field being typed into, and the selected text
 * with its handles and keys. */
export function usePageTextEditing({
  actions,
  annotations,
  draft,
  isMeasured,
  onDraftChange,
  onOtherPress,
  selectedId,
  size,
}: PageTextEditingOptions) {
  const field = useTextDraft({
    actions,
    annotations,
    draft,
    onChange: onDraftChange,
    size,
  });
  const selected = findText(annotations, selectedId);
  const selection = useSelectedTextTransform({
    annotation: selected,
    onReplace: actions.replace,
    size,
  });

  // Typing and restyling both change how much room text takes, so this one
  // place keeps it on the page rather than every change doing so.
  useLayoutEffect(() => {
    if (!isMeasured) {
      return;
    }
    if (draft) {
      const fitted = keepTextOnPage(draft, size);
      if (fitted !== draft) {
        onDraftChange(fitted);
      }
    } else if (selected) {
      const fitted = keepTextOnPage(selected, size);
      if (fitted !== selected) {
        actions.replace(fitted);
      }
    }
  }, [actions, draft, isMeasured, onDraftChange, selected, size]);

  const handleEdit = useCallback(
    (text: TextAnnotation) => onDraftChange(toDraft(text)),
    [onDraftChange]
  );
  useSelectedTextKeys({ actions, onEdit: handleEdit, selected, size });

  /** With the select tool, a press on selected text opens it where it was pressed. */
  const handlePress = useCallback(
    ({ id, point, wasSelected }: MarkupPress) => {
      const text = findText(annotations, id);
      if (!text) {
        onOtherPress(id);
      } else if (wasSelected) {
        onDraftChange(toDraft(text, getCaretOffset(text, point)));
      }
    },
    [annotations, onDraftChange, onOtherPress]
  );

  return { field, handlePress, request: onDraftChange, selected, selection };
}

export type PageTextEditing = ReturnType<typeof usePageTextEditing>;
