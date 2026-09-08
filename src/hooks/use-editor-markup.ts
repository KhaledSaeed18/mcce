import { useEditorDocument } from "@/hooks/use-editor-document";
import { useEditorText } from "@/hooks/use-editor-text";
import type { AnnotationActions } from "@/lib/pdf-editor/types";

interface EditorMarkupOptions {
  fileId: string | undefined;
  /** The file's own page count, which a stored page list is checked against. */
  pageCount: number;
  setColor: (color: string) => void;
  setFontSize: (fontSize: number) => void;
}

/** One file's markup: what is on the page, what is selected, and the keys for both. */
export function useEditorMarkup({
  fileId,
  pageCount,
  setColor,
  setFontSize,
}: EditorMarkupOptions) {
  const {
    add,
    annotations,
    batchEraseAt,
    canRedo,
    canUndo,
    clear,
    eraseAt,
    move,
    pages,
    redo,
    remove,
    copyPage,
    removePage,
    reorderPage,
    rotatePage,
    replace,
    undo,
  } = useEditorDocument(fileId, pageCount);
  const {
    changeColor,
    changeFontSize,
    deselect,
    draft,
    openDraft,
    removeSelected,
    select,
    selectedId,
  } = useEditorText({
    annotations,
    onRemove: remove,
    onReplace: replace,
    setColor,
    setFontSize,
  });

  const actions: AnnotationActions = {
    add,
    batchErase: batchEraseAt,
    erase: eraseAt,
    moveText: move,
    remove,
    replace,
    select,
  };

  return {
    actions,
    annotations,
    canRedo,
    canUndo,
    changeColor,
    changeFontSize,
    clear,
    copyPage,
    deselect,
    draft,
    openDraft,
    pages,
    redo,
    removePage,
    removeSelected,
    reorderPage,
    rotatePage,
    selectedId,
    undo,
  };
}
