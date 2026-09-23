import { FileUpIcon } from "lucide-react";
import type { ReactNode } from "react";
import { LOCAL_PDF_DROP_LABEL } from "@/config/pdf-editor";
import { useLocalPdfDrop } from "@/hooks/use-local-pdf-drop";

interface EditorDropZoneProps {
  children: ReactNode;
}

/** Lets a PDF be dropped anywhere on the editor. It lays out as if it were not
 * there, so the editor's own layout is untouched, while drag events from any
 * part of it still bubble up through it. */
export function EditorDropZone({ children }: EditorDropZoneProps) {
  const { error, handlers, isDragging } = useLocalPdfDrop();

  return (
    <div className="contents" {...handlers}>
      {children}
      {isDragging ? (
        <div className="pointer-events-none fixed inset-3 z-40 flex items-center justify-center rounded border-2 border-primary border-dashed bg-background/80">
          <p className="flex items-center gap-2 font-head text-lg">
            <FileUpIcon aria-hidden="true" className="size-5" />
            {LOCAL_PDF_DROP_LABEL}
          </p>
        </div>
      ) : null}
      {error ? (
        <p
          className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded border-2 bg-card px-4 py-2 text-destructive text-sm shadow-md"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
