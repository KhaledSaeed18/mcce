import { useEffect, useState } from "react";
import { ANNOTATION_FONT_NAME, DEFAULT_FONT_SIZE } from "@/config/pdf-editor";

/**
 * Text is measured on a canvas, and a canvas measures whatever font is loaded
 * at the time. Waiting for the real one keeps wrapping from being computed
 * against a fallback and then reflowing under the reader.
 */
export function useAnnotationFont(): boolean {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const finish = () => {
      if (!cancelled) {
        setIsReady(true);
      }
    };

    // A font that fails to load still lets the editor open, on fallback metrics.
    document.fonts
      .load(`${DEFAULT_FONT_SIZE}px "${ANNOTATION_FONT_NAME}"`)
      .then(finish, finish);

    return () => {
      cancelled = true;
    };
  }, []);

  return isReady;
}
