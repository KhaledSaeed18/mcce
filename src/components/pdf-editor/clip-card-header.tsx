import { ArrowUpRightIcon, MinusIcon, XIcon } from "lucide-react";
import type { KeyboardEventHandler, PointerEventHandler } from "react";
import { ClipCardMenu } from "@/components/pdf-editor/clip-card-menu";
import { ClipTitle } from "@/components/pdf-editor/clip-title";
import { Button } from "@/components/ui/button";
import {
  CLIP_CLOSE_LABEL,
  CLIP_FOLD_LABEL,
  CLIP_MOVE_HINT,
  CLIP_OPEN_SOURCE_LABEL,
} from "@/config/pdf-editor";
import type { TabLabel } from "@/lib/pdf-editor/types";

interface ClipCardHeaderProps {
  canOpenSource: boolean;
  canRedraw: boolean;
  label: TabLabel | undefined;
  moveHandlers: {
    onKeyDown: KeyboardEventHandler<HTMLElement>;
    onPointerCancel: PointerEventHandler<HTMLElement>;
    onPointerDown: PointerEventHandler<HTMLElement>;
    onPointerMove: PointerEventHandler<HTMLElement>;
    onPointerUp: PointerEventHandler<HTMLElement>;
  };
  onClose: () => void;
  onFold: () => void;
  onOpenSource: () => void;
  onRedraw: () => void;
  pageNumber: number | null;
}

/** The card's title, which drags it, folds it on a double click, and moves
 * it with the arrow keys, and its buttons. */
export function ClipCardHeader({
  canOpenSource,
  canRedraw,
  label,
  moveHandlers,
  onClose,
  onFold,
  onOpenSource,
  onRedraw,
  pageNumber,
}: ClipCardHeaderProps) {
  return (
    <div className="flex h-8 shrink-0 items-center gap-0.5 border-b-2 pr-1">
      <button
        {...moveHandlers}
        aria-label={`${label?.text ?? ""} ${CLIP_MOVE_HINT}`}
        className="flex h-full min-w-0 flex-1 cursor-grab touch-none items-center pl-2 text-left text-xs outline-none focus-visible:bg-accent active:cursor-grabbing"
        onDoubleClick={onFold}
        title={CLIP_MOVE_HINT}
        type="button"
      >
        <ClipTitle label={label} pageNumber={pageNumber} />
      </button>
      <Button
        aria-label={CLIP_OPEN_SOURCE_LABEL}
        disabled={!canOpenSource}
        onClick={onOpenSource}
        size="icon-xs"
        title={CLIP_OPEN_SOURCE_LABEL}
        variant="ghost"
      >
        <ArrowUpRightIcon />
      </Button>
      <ClipCardMenu canRedraw={canRedraw} onRedraw={onRedraw} />
      <Button
        aria-label={CLIP_FOLD_LABEL}
        onClick={onFold}
        size="icon-xs"
        title={CLIP_FOLD_LABEL}
        variant="ghost"
      >
        <MinusIcon />
      </Button>
      <Button
        aria-label={CLIP_CLOSE_LABEL}
        onClick={onClose}
        size="icon-xs"
        title={CLIP_CLOSE_LABEL}
        variant="ghost"
      >
        <XIcon />
      </Button>
    </div>
  );
}
