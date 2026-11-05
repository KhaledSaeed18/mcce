import { useCallback, useRef, useState } from "react";
import { useTextBoxTransform } from "@/hooks/use-text-box-transform";
import type { PageSize, TextAnnotation } from "@/lib/pdf-editor/types";

interface SelectedTextTransformOptions {
  annotation: TextAnnotation | null;
  onReplace: (annotation: TextAnnotation) => void;
  size: PageSize;
}

/**
 * Resizing selected text. The new size follows the pointer live so the wrap can
 * be seen, and only the release becomes an undo step.
 */
export function useSelectedTextTransform({
  annotation,
  onReplace,
  size,
}: SelectedTextTransformOptions) {
  const [preview, setPreview] = useState<TextAnnotation | null>(null);
  // Mirrors the preview so the release reads it outside a state updater.
  const previewRef = useRef<TextAnnotation | null>(null);

  const update = useCallback((next: TextAnnotation | null) => {
    previewRef.current = next;
    setPreview(next);
  }, []);

  const { finish, resizeCorner, resizeSide } = useTextBoxTransform({
    onUpdate: update,
    size,
    target: annotation,
  });

  const end = useCallback(() => {
    const { current } = previewRef;
    finish();
    update(null);
    if (current) {
      onReplace(current);
    }
  }, [finish, onReplace, update]);

  const fitWidth = useCallback(() => {
    if (annotation?.width !== undefined) {
      onReplace({ ...annotation, width: undefined });
    }
  }, [annotation, onReplace]);

  return { end, fitWidth, preview, resizeCorner, resizeSide };
}
