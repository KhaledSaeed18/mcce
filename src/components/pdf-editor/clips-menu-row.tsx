import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import { useCallback } from "react";
import { ClipTitle } from "@/components/pdf-editor/clip-title";
import { Button } from "@/components/ui/button";
import {
  CLIP_CLOSE_LABEL,
  CLIP_FOLD_LABEL,
  CLIP_UNFOLD_LABEL,
} from "@/config/pdf-editor";
import type { EditorClip } from "@/lib/pdf-editor/clips/types";
import type { TabLabel } from "@/lib/pdf-editor/types";

interface ClipsMenuRowProps {
  clip: EditorClip;
  label: TabLabel | undefined;
  onClose: (id: string) => void;
  onFold: (id: string, isFolded: boolean) => void;
  pageNumber: number | null;
}

/** A clip on screen in the clips menu, to fold or unfold, or close. */
export function ClipsMenuRow({
  clip,
  label,
  onClose,
  onFold,
  pageNumber,
}: ClipsMenuRowProps) {
  const { id, isFolded } = clip;
  const handleFold = useCallback(
    () => onFold(id, !isFolded),
    [id, isFolded, onFold]
  );
  const handleClose = useCallback(() => onClose(id), [id, onClose]);
  const foldLabel = isFolded ? CLIP_UNFOLD_LABEL : CLIP_FOLD_LABEL;

  return (
    <li className="flex items-center gap-1 py-1 pr-1 pl-3 text-sm">
      <span className="min-w-0 flex-1">
        <ClipTitle label={label} pageNumber={pageNumber} />
      </span>
      <Button
        aria-label={foldLabel}
        onClick={handleFold}
        size="icon-xs"
        title={foldLabel}
        variant="ghost"
      >
        {isFolded ? <PlusIcon /> : <MinusIcon />}
      </Button>
      <Button
        aria-label={CLIP_CLOSE_LABEL}
        onClick={handleClose}
        size="icon-xs"
        title={CLIP_CLOSE_LABEL}
        variant="ghost"
      >
        <XIcon />
      </Button>
    </li>
  );
}
