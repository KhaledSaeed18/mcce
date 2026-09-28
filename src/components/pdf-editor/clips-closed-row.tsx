import { useCallback } from "react";
import { ClipTitle } from "@/components/pdf-editor/clip-title";
import { CLIPS_REOPEN_LABEL } from "@/config/pdf-editor";
import type { TabLabel } from "@/lib/pdf-editor/types";

interface ClipsClosedRowProps {
  id: string;
  label: TabLabel | undefined;
  onReopen: (id: string) => void;
  pageNumber: number | null;
}

/** A clip closed recently, to bring back where it was. */
export function ClipsClosedRow({
  id,
  label,
  onReopen,
  pageNumber,
}: ClipsClosedRowProps) {
  const handleClick = useCallback(() => onReopen(id), [id, onReopen]);

  return (
    <li>
      <button
        className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm hover:bg-accent"
        onClick={handleClick}
        type="button"
      >
        <span className="min-w-0 flex-1">
          <ClipTitle label={label} pageNumber={pageNumber} />
        </span>
        <span className="shrink-0 text-muted-foreground text-xs">
          {CLIPS_REOPEN_LABEL}
        </span>
      </button>
    </li>
  );
}
