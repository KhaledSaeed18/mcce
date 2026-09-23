import { useTextBoxResize } from "@/hooks/use-text-box-resize";
import { useTextDraft } from "@/hooks/use-text-draft";
import { findText } from "@/lib/pdf-editor/move";
import type {
  Annotation,
  AnnotationActions,
  PageSize,
  TextDraft,
} from "@/lib/pdf-editor/types";

interface PageTextEditingOptions {
  actions: AnnotationActions;
  annotations: Annotation[];
  draft: TextDraft | null;
  onDraftChange: (draft: TextDraft | null) => void;
  selectedId: string | null;
  size: PageSize;
}

/** One page's text work: the field being typed into, and the selected text
 * with its width handles. */
export function usePageTextEditing({
  actions,
  annotations,
  draft,
  onDraftChange,
  selectedId,
  size,
}: PageTextEditingOptions) {
  const field = useTextDraft({
    actions,
    draft,
    onChange: onDraftChange,
    size,
  });
  const selected = findText(annotations, selectedId);
  const selection = useTextBoxResize({
    annotation: selected,
    onReplace: actions.replace,
    size,
  });
  return { field, selected, selection };
}

export type PageTextEditing = ReturnType<typeof usePageTextEditing>;
