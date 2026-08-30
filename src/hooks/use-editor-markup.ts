import { useCallback } from "react";
import { useEditorHotkeys } from "@/hooks/use-editor-hotkeys";
import { useEditorText } from "@/hooks/use-editor-text";
import { usePdfAnnotations } from "@/hooks/use-pdf-annotations";
import type { AnnotationActions } from "@/lib/pdf-editor/types";

interface EditorMarkupOptions {
  fileId: string | undefined;
  setColor: (color: string) => void;
  setFontSize: (fontSize: number) => void;
}

/** One file's markup: what is on the page, what is selected, and the keys for both. */
export function useEditorMarkup({
  fileId,
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
    redo,
    remove,
    replace,
    undo,
  } = usePdfAnnotations(fileId);
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
    draft,
    openDraft,
    redo,
    selectedId,
    undo,
  };
}
