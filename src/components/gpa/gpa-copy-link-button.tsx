import { CheckIcon, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGpaShareLink } from "@/hooks/use-gpa-share-link";
import type { GpaSemester } from "@/lib/gpa/entries";

interface GpaCopyLinkButtonProps {
  semesters: GpaSemester[];
}

export function GpaCopyLinkButton({ semesters }: GpaCopyLinkButtonProps) {
  const { copy, error, isCopied } = useGpaShareLink(semesters);

  return (
    <div className="flex flex-col gap-1">
      <Button onClick={copy} size="sm" variant="outline">
        {isCopied ? (
          <CheckIcon data-icon="inline-start" />
        ) : (
          <LinkIcon data-icon="inline-start" />
        )}
        {isCopied ? "Copied" : "Copy link"}
      </Button>

      {error ? (
        <p className="text-destructive text-xs" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
