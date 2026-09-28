import {
  ArrowLeftRightIcon,
  Columns2Icon,
  EllipsisIcon,
  Maximize2Icon,
  XIcon,
} from "lucide-react";
import { useCallback } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PANE_ALONE_LABEL,
  PANE_CLOSE_LABEL,
  PANE_MENU_LABEL,
  PANE_SWAP_LABEL,
} from "@/config/pdf-editor";
import type { EditorPaneSide } from "@/lib/pdf-editor/types";

interface EditorPaneMenuProps {
  /** What the pane's match item says, when it has a match not on screen. */
  matchLabel: string | null;
  onClose: (side: EditorPaneSide) => void;
  onOpenMatch: () => void;
  onSwap: () => void;
  side: EditorPaneSide;
}

const OTHER_SIDE: Record<EditorPaneSide, EditorPaneSide> = {
  beside: "primary",
  primary: "beside",
};

export function EditorPaneMenu({
  matchLabel,
  onClose,
  onOpenMatch,
  onSwap,
  side,
}: EditorPaneMenuProps) {
  const handleClose = useCallback(() => onClose(side), [onClose, side]);
  // On its own means the other pane goes, whichever side this one is on.
  const handleAlone = useCallback(
    () => onClose(OTHER_SIDE[side]),
    [onClose, side]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={PANE_MENU_LABEL}
        className="grid size-5 shrink-0 cursor-pointer place-items-center rounded-sm hover:bg-foreground/10"
        title={PANE_MENU_LABEL}
      >
        <EllipsisIcon className="size-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto">
        {matchLabel ? (
          <DropdownMenuItem onClick={onOpenMatch}>
            <Columns2Icon />
            {matchLabel}
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem onClick={onSwap}>
          <ArrowLeftRightIcon />
          {PANE_SWAP_LABEL}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleAlone}>
          <Maximize2Icon />
          {PANE_ALONE_LABEL}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleClose}>
          <XIcon />
          {PANE_CLOSE_LABEL}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
