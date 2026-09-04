import { useCallback, useRef, useState } from "react";
import { resizeTextBox } from "@/lib/pdf-editor/text-box";
import type {
  PageSize,
  TextAnnotation,
  TextBoxEdge,
} from "@/lib/pdf-editor/types";

interface TextBoxResizeOptions {
  annotation: TextAnnotation | null;
  onReplace: (annotation: TextAnnotation) => void;
  size: PageSize;
}

/**
 * Resizing selected text. The new width follows the pointer live so the wrap
 * can be seen, and only the release becomes an undo step.
 */
export function useTextBoxResize({
  annotation,
  onReplace,
  size,
}: TextBoxResizeOptions) {
  const [preview, setPreview] = useState<TextAnnotation | null>(null);
  // Mirrors the preview so the release reads it outside a state updater.
  const previewRef = useRef<TextAnnotation | null>(null);

  const update = useCallback((next: TextAnnotation | null) => {
    previewRef.current = next;
    setPreview(next);
  }, []);

  const resize = useCallback(
    (edge: TextBoxEdge, dx: number) => {
      const current = previewRef.current ?? annotation;
      if (current) {
        update(resizeTextBox(current, edge, dx, size));
      }
    },
    [annotation, size, update]
  );

  const end = useCallback(() => {
    const { current } = previewRef;
    update(null);
    // biome-ignore lint/suspicious/noUnnecessaryConditions: the ref holds a box only while a handle is being dragged
    if (current) {
      onReplace(current);
    }
  }, [onReplace, update]);

  return { end, preview, resize };
}
