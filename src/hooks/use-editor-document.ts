import { useEffect, useRef } from "react";
import { useAnnotationActions } from "@/hooks/use-annotation-actions";
import { useEditorHistory } from "@/hooks/use-editor-history";
import { usePageActions } from "@/hooks/use-page-actions";
import { readDocument, writeDocument } from "@/lib/pdf-editor/storage";

/** One file's markup and pages, kept per file so reopening it restores both. */
export function useEditorDocument(
  fileId: string | undefined,
  pageCount: number
) {
  const { canRedo, canUndo, commit, redo, reset, snapshot, undo } =
    useEditorHistory();
  const hydratedIdRef = useRef<string | null>(null);
  const annotations = useAnnotationActions(commit);
  const pages = usePageActions(commit);

  useEffect(() => {
    // The file's own page count is what a stored list is checked against.
    if (!(fileId && pageCount)) {
      return;
    }
    hydratedIdRef.current = fileId;
    reset(readDocument(fileId, pageCount));
  }, [fileId, pageCount, reset]);

  useEffect(() => {
    // Writing before hydration would overwrite what is stored with an empty file.
    if (!fileId || hydratedIdRef.current !== fileId) {
      return;
    }
    writeDocument(fileId, snapshot);
  }, [fileId, snapshot]);

  return {
    annotations: snapshot.annotations,
    canRedo,
    canUndo,
    pages: snapshot.pages,
    redo,
    undo,
    ...annotations,
    ...pages,
  };
}
