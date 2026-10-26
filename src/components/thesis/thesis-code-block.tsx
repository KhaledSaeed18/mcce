import { CheckIcon, CopyIcon } from "lucide-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface ThesisCodeBlockProps {
  label: string;
  lines: readonly string[];
}

/** A prompt or query meant to be copied as written. */
export function ThesisCodeBlock({ label, lines }: ThesisCodeBlockProps) {
  const { copy, isCopied } = useCopyToClipboard();
  const text = lines.join("\n");
  const handleCopy = useCallback(() => copy(text), [copy, text]);

  return (
    <figure className="flex flex-col gap-2 rounded border-2 bg-foreground p-4 text-background shadow-md">
      <div className="flex items-center justify-between gap-2">
        <figcaption className="font-head text-primary text-xs uppercase tracking-wide">
          {label}
        </figcaption>
        <Button onClick={handleCopy} size="xs">
          {isCopied ? (
            <CheckIcon data-icon="inline-start" />
          ) : (
            <CopyIcon data-icon="inline-start" />
          )}
          {isCopied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed sm:text-sm">
        {text}
      </pre>
    </figure>
  );
}
