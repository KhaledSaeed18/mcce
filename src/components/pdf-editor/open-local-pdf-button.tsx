import { FileUpIcon, LoaderIcon } from "lucide-react";
import { type ChangeEvent, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { LOCAL_PDF_ACCEPT, LOCAL_PDF_OPEN_LABEL } from "@/config/pdf-editor";
import { useOpenLocalPdf } from "@/hooks/use-open-local-pdf";
import { cn } from "@/lib/utils";

interface OpenLocalPdfButtonProps {
  className?: string;
}

export function OpenLocalPdfButton({ className }: OpenLocalPdfButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { error, isOpening, openFile } = useOpenLocalPdf();

  const handleClick = useCallback(() => inputRef.current?.click(), []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const [file] = event.target.files ?? [];
      // Cleared so choosing the same file again still counts as a change.
      event.target.value = "";
      if (file) {
        openFile(file);
      }
    },
    [openFile]
  );

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Button disabled={isOpening} onClick={handleClick} variant="outline">
        {isOpening ? (
          <LoaderIcon className="animate-spin" data-icon="inline-start" />
        ) : (
          <FileUpIcon data-icon="inline-start" />
        )}
        {LOCAL_PDF_OPEN_LABEL}
      </Button>
      <input
        accept={LOCAL_PDF_ACCEPT}
        className="sr-only"
        onChange={handleChange}
        ref={inputRef}
        tabIndex={-1}
        type="file"
      />
      {error ? (
        <p className="text-destructive text-xs" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
