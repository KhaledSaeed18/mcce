import { useEditorDocument } from "@/hooks/use-editor-document";
import { useEditorText } from "@/hooks/use-editor-text";
import type { AnnotationActions, TextStyle } from "@/lib/pdf-editor/types";

interface EditorMarkupOptions {
  fileId: string | undefined;
  onTextStyleChange: (style: Partial<TextStyle>) => void;
  /** The file's own page count, which a stored page list is checked against. */
  pageCount: number;
}

/** One file's markup: what is on the page, what is selected, and the keys for both. */
export function useEditorMarkup({
  fileId,
  onTextStyleChange,
  pageCount,
}: EditorMarkupOptions) {
  const {
    add,
    addMany,
    annotations,
    batchErase,
    canRedo,
    canUndo,
    clear,
    isOriginal,
    isSaved,
    move,
    pageActions,
    pages,
    redo,
    remove,
    restore,
    replace,
    undo,
  } = useEditorDocument(fileId, pageCount);
  const {
    activeText,
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
  } = useEditorText({
    annotations,
    onAdd: add,
    onRemove: remove,
    onReplace: replace,
    onStyleChange: onTextStyleChange,
  });

  const actions: Omit<AnnotationActions, "clip"> = {
    add,
    addMany,
    batchErase,
    duplicateSelected,
    moveText: move,
    remove,
    replace,
    restyleText: restyle,
    select,
  };

  return {
    actions,
    activeText,
    annotations,
    canRedo,
    canUndo,
    clear,
    deselect,
    draft,
    editSelected,
    isOriginal,
    isSaved,
    openDraft,
    pageActions,
    pages,
    redo,
    removeActive,
    removeSelected,
    restore,
    selected,
    selectedId,
    undo,
  };
}

export type EditorMarkup = ReturnType<typeof useEditorMarkup>;
