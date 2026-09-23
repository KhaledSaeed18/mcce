import { useCallback, useRef, useState } from "react";
import { getAnnotationBox } from "@/lib/pdf-editor/annotation-box";
import { resizeBox } from "@/lib/pdf-editor/resize-box";
import { scaleAnnotation } from "@/lib/pdf-editor/scale-annotation";
import type {
  Annotation,
  Box,
  FrameCorner,
  PageSize,
} from "@/lib/pdf-editor/types";

interface MarkupResizeOptions {
  annotation: Annotation | null;
  onReplace: (annotation: Annotation) => void;
  size: PageSize;
}

interface Resizing {
  box: Box;
  original: Annotation;
  start: Box;
}

/** Stretching selected markup by a corner of its frame. The markup follows
 * the pointer live, and only the release becomes an undo step. */
export function useMarkupResize({
  annotation,
  onReplace,
  size,
}: MarkupResizeOptions) {
  const [preview, setPreview] = useState<Annotation | null>(null);
  const resizingRef = useRef<Resizing | null>(null);

  const resize = useCallback(
    (corner: FrameCorner, dx: number, dy: number) => {
      const current =
        resizingRef.current ??
        (annotation && {
          box: getAnnotationBox(annotation),
          original: annotation,
          start: getAnnotationBox(annotation),
        });
      if (!current) {
        return;
      }
      const box = resizeBox(current.box, corner, dx, dy, size);
      resizingRef.current = { ...current, box };
      setPreview(scaleAnnotation(current.original, current.start, box));
    },
    [annotation, size]
  );

  const end = useCallback(() => {
    const { current } = resizingRef;
    resizingRef.current = null;
    setPreview(null);
    // biome-ignore lint/suspicious/noUnnecessaryConditions: the ref holds a resize only while a handle is being dragged
    if (current) {
      onReplace(scaleAnnotation(current.original, current.start, current.box));
    }
  }, [onReplace]);

  return { end, preview, resize };
}

export type MarkupResize = ReturnType<typeof useMarkupResize>;
