import { useCallback } from "react";
import { ClipTitle } from "@/components/pdf-editor/clip-title";
import { CLIP_UNFOLD_LABEL } from "@/config/pdf-editor";
import type { TabLabel } from "@/lib/pdf-editor/types";

interface ClipFoldChipProps {
  id: string;
  label: TabLabel | undefined;
  onFold: (id: string, isFolded: boolean) => void;
  pageNumber: number | null;
}

/** A folded clip, a click away from opening where it was. */
export function ClipFoldChip({
  id,
  label,
  onFold,
  pageNumber,
}: ClipFoldChipProps) {
  const handleClick = useCallback(() => onFold(id, false), [id, onFold]);

  return (
    <button
      className="flex h-7 max-w-64 shrink-0 items-center rounded border-2 bg-card px-2 text-xs shadow-sm hover:bg-accent"
      onClick={handleClick}
      title={CLIP_UNFOLD_LABEL}
      type="button"
    >
      <ClipTitle label={label} pageNumber={pageNumber} />
    </button>
  );
}
