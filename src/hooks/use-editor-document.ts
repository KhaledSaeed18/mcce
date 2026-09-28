import { useCallback, useEffect, useState } from "react";
import { useAnnotationActions } from "@/hooks/use-annotation-actions";
import { useEditorHistory } from "@/hooks/use-editor-history";
import { usePageActions } from "@/hooks/use-page-actions";
import { buildPages, isOriginalLayout } from "@/lib/pdf-editor/pages";
import { readDocument, writeDocument } from "@/lib/pdf-editor/storage";

/** One file's markup and pages, kept per file so reopening it restores both. */
export function useEditorDocument(
  fileId: string | undefined,
  pageCount: number
) {
  const { canRedo, canUndo, commit, isOpen, open, redo, snapshot, undo } =
    useEditorHistory(fileId);
  const [isSaved, setIsSaved] = useState(true);
  const annotations = useAnnotationActions(commit);
  const pageActions = usePageActions(commit);

  useEffect(() => {
    // The file's own page count is what a stored list is checked against. A
    // file already open this visit is not read again, which keeps its undo steps.
    if (!(fileId && pageCount) || isOpen) {
      return;
    }
    open(readDocument(fileId, pageCount));
  }, [fileId, isOpen, open, pageCount]);

  useEffect(() => {
    // Writing before the file is read would overwrite what is stored with an empty file.
    if (!(fileId && isOpen)) {
      return;
    }
    setIsSaved(writeDocument(fileId, snapshot));
  }, [fileId, isOpen, snapshot]);

  /** One undo step, so a restore pressed by mistake is taken back like any edit. */
  const restore = useCallback(
    () => commit(() => ({ annotations: [], pages: buildPages(pageCount) })),
    [commit, pageCount]
  );

  return {
    annotations: snapshot.annotations,
    canRedo,
    canUndo,
    isOriginal:
      snapshot.annotations.length === 0 &&
      isOriginalLayout(snapshot.pages, pageCount),
    isSaved,
    pageActions,
    pages: snapshot.pages,
    redo,
    restore,
    undo,
    ...annotations,
  };
}
