import { useCallback, useEffect, useRef } from "react";
import { useAnnotationHistory } from "@/hooks/use-annotation-history";
import { isAnnotationHit } from "@/lib/pdf-editor/geometry";
import { shiftAnnotation } from "@/lib/pdf-editor/move";
import { readAnnotations, writeAnnotations } from "@/lib/pdf-editor/storage";
import type { Annotation, Point } from "@/lib/pdf-editor/types";

/** Markup is kept per file in localStorage, so reopening a PDF restores it. */
export function usePdfAnnotations(fileId: string | undefined) {
  const { annotations, canRedo, canUndo, commit, redo, reset, undo } =
    useAnnotationHistory();
  const hydratedIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!fileId) {
      return;
    }
    hydratedIdRef.current = fileId;
    reset(readAnnotations(fileId));
  }, [fileId, reset]);

  useEffect(() => {
    // Writing before hydration would overwrite stored markup with an empty list.
    if (!fileId || hydratedIdRef.current !== fileId) {
      return;
    }
    writeAnnotations(fileId, annotations);
  }, [annotations, fileId]);

  const add = useCallback(
    (annotation: Annotation) => commit((current) => [...current, annotation]),
    [commit]
  );

  const eraseAt = useCallback(
    (pageIndex: number, point: Point) =>
      commit((current) =>
        current.filter(
          (annotation) =>
            annotation.pageIndex !== pageIndex ||
            !isAnnotationHit(annotation, point)
        )
      ),
    [commit]
  );

  const remove = useCallback(
    (id: string) =>
      commit((current) => current.filter((annotation) => annotation.id !== id)),
    [commit]
  );

  /** Editing keeps the annotation's id, so the rewritten text stays in drawing order. */
  const replace = useCallback(
    (next: Annotation) =>
      commit((current) =>
        current.map((annotation) =>
          annotation.id === next.id ? next : annotation
        )
      ),
    [commit]
  );

  const move = useCallback(
    (id: string, dx: number, dy: number) =>
      commit((current) =>
        current.map((annotation) =>
          annotation.id === id
            ? shiftAnnotation(annotation, dx, dy)
            : annotation
        )
      ),
    [commit]
  );

  const clear = useCallback(() => commit(() => []), [commit]);

  return {
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
  };
}
