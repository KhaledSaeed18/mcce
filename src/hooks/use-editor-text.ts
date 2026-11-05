import { useCallback, useState } from "react";
import { toDraft } from "@/lib/pdf-editor/build-draft";
import { findText } from "@/lib/pdf-editor/move";
import { pasteAnnotation } from "@/lib/pdf-editor/paste-annotation";
import type { Annotation, TextDraft, TextStyle } from "@/lib/pdf-editor/types";

interface EditorTextOptions {
  annotations: Annotation[];
  onAdd: (annotation: Annotation) => void;
  onRemove: (id: string) => void;
  onReplace: (annotation: Annotation) => void;
  onStyleChange: (style: Partial<TextStyle>) => void;
}

/**
 * The one piece of text the editor is working on, in either of its two states:
 * selected, which is what the Delete key acts on, or open for typing. Entering
 * one leaves the other, and the text toolbar serves both.
 */
export function useEditorText({
  annotations,
  onAdd,
  onRemove,
  onReplace,
  onStyleChange,
}: EditorTextOptions) {
  const [draft, setDraft] = useState<TextDraft | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected =
    annotations.find((annotation) => annotation.id === selectedId) ?? null;
  const selectedText = findText(annotations, selectedId);

  const openDraft = useCallback((next: TextDraft | null) => {
    if (next) {
      setSelectedId(null);
    }
    setDraft(next);
  }, []);

  const select = useCallback((id: string | null) => setSelectedId(id), []);
  const deselect = useCallback(() => setSelectedId(null), []);

  const restyle = useCallback(
    (style: Partial<TextStyle>) => {
      setDraft((current) => (current ? { ...current, ...style } : current));
      if (selectedText) {
        onReplace({ ...selectedText, ...style });
      }
      // A fill is for the one box it was put behind, not for all that follow.
      const { background: _background, ...sticky } = style;
      onStyleChange(sticky);
    },
    [onReplace, onStyleChange, selectedText]
  );

  const removeSelected = useCallback(() => {
    if (selectedId) {
      onRemove(selectedId);
      setSelectedId(null);
    }
  }, [onRemove, selectedId]);

  /** The toolbar's delete, which also throws away what is being typed. */
  const removeActive = useCallback(() => {
    if (draft?.id) {
      onRemove(draft.id);
    }
    setDraft(null);
    removeSelected();
  }, [draft, onRemove, removeSelected]);

  const duplicateSelected = useCallback(() => {
    if (selected) {
      const copy = pasteAnnotation(selected, selected.pageId, 1);
      onAdd(copy);
      setSelectedId(copy.id);
    }
  }, [onAdd, selected]);

  const editSelected = useCallback(() => {
    if (selectedText) {
      openDraft(toDraft(selectedText));
    }
  }, [openDraft, selectedText]);

  return {
    activeText: draft ?? selectedText,
    deselect,
    draft,
    duplicateSelected,
    editSelected,
    openDraft,
    removeActive,
    removeSelected,
    restyle,
    select,
    selected,
    selectedId,
  };
}
