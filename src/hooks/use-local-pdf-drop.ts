import {
  type DragEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { LOCAL_PDF_DROP_ERROR_MS } from "@/config/pdf-editor";
import { useOpenLocalPdf } from "@/hooks/use-open-local-pdf";

/** Text or a link dragged over the editor is not a file, and is left alone. */
function hasFiles(event: DragEvent): boolean {
  return event.dataTransfer.types.includes("Files");
}

/** Opens a PDF dropped anywhere on the editor. Entering and leaving are
 * counted because every child the drag crosses fires both. */
export function useLocalPdfDrop() {
  const { error, openFile } = useOpenLocalPdf();
  const [isDragging, setIsDragging] = useState(false);
  const [shownError, setShownError] = useState<string | null>(null);
  const depthRef = useRef(0);

  useEffect(() => {
    setShownError(error);
    if (!error) {
      return;
    }
    const timeout = setTimeout(
      () => setShownError(null),
      LOCAL_PDF_DROP_ERROR_MS
    );
    return () => clearTimeout(timeout);
  }, [error]);

  const handleDragEnter = useCallback((event: DragEvent) => {
    if (!hasFiles(event)) {
      return;
    }
    depthRef.current += 1;
    setIsDragging(true);
  }, []);

  const handleDragOver = useCallback((event: DragEvent) => {
    if (!hasFiles(event)) {
      return;
    }
    // Without this the browser opens the dropped file itself, leaving the editor.
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  }, []);

  const handleDragLeave = useCallback((event: DragEvent) => {
    if (!hasFiles(event)) {
      return;
    }
    depthRef.current = Math.max(depthRef.current - 1, 0);
    if (depthRef.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (event: DragEvent) => {
      if (!hasFiles(event)) {
        return;
      }
      event.preventDefault();
      depthRef.current = 0;
      setIsDragging(false);
      const [file] = event.dataTransfer.files;
      if (file) {
        openFile(file);
      }
    },
    [openFile]
  );

  return {
    error: shownError,
    handlers: {
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
    },
    isDragging,
  };
}
