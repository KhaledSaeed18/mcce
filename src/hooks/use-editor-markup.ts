import { useCallback } from "react";
import { useEditorDocument } from "@/hooks/use-editor-document";
import { useEditorHotkeys } from "@/hooks/use-editor-hotkeys";
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

  const deselect = useCallback(() => select(null), [select]);
  useEditorHotkeys({
    onDeselect: deselect,
    onRedo: redo,
    onRemove: removeSelected,
    onUndo: undo,
  });

  const actions: AnnotationActions = {
    add,
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
    draft,
    openDraft,
    pages,
    redo,
    removePage,
    reorderPage,
    rotatePage,
    selectedId,
    undo,
  };
}
