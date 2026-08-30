import { useCallback } from "react";
import { isAnnotationHit } from "@/lib/pdf-editor/geometry";
import { shiftAnnotation } from "@/lib/pdf-editor/move";
import type { Annotation, EditorSnapshot, Point } from "@/lib/pdf-editor/types";

type Commit = (next: (current: EditorSnapshot) => EditorSnapshot) => void;

/** Every change the markup tools make, each landing as one undo step. */
export function useAnnotationActions(commit: Commit) {
  const withAnnotations = useCallback(
    (next: (current: Annotation[]) => Annotation[]) =>
      commit((current) => ({
        ...current,
        annotations: next(current.annotations),
      })),
    [commit]
  );

  const add = useCallback(
    (annotation: Annotation) =>
      withAnnotations((current) => [...current, annotation]),
    [withAnnotations]
  );

  const eraseAt = useCallback(
    (pageId: string, point: Point) =>
      withAnnotations((current) =>
        current.filter(
          (annotation) =>
            annotation.pageId !== pageId || !isAnnotationHit(annotation, point)
        )
      ),
    [withAnnotations]
  );

  const move = useCallback(
    (id: string, dx: number, dy: number) =>
      withAnnotations((current) =>
        current.map((annotation) =>
          annotation.id === id
            ? shiftAnnotation(annotation, dx, dy)
            : annotation
        )
      ),
    [withAnnotations]
  );

  const remove = useCallback(
    (id: string) =>
      withAnnotations((current) =>
        current.filter((annotation) => annotation.id !== id)
      ),
    [withAnnotations]
  );

  /** Editing keeps the annotation's id, so the rewritten text stays in drawing order. */
  const replace = useCallback(
    (next: Annotation) =>
      withAnnotations((current) =>
        current.map((annotation) =>
          annotation.id === next.id ? next : annotation
        )
      ),
    [withAnnotations]
  );

  const clear = useCallback(() => withAnnotations(() => []), [withAnnotations]);

  return { add, clear, eraseAt, move, remove, replace };
}
