import { EllipsisIcon, RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CLIP_MORE_LABEL,
  CLIP_REDRAW_LABEL,
  CLIP_REDRAW_UNAVAILABLE,
} from "@/config/pdf-editor";

interface ClipCardMenuProps {
  /** Only a file on screen can be drawn from again. */
  canRedraw: boolean;
  onRedraw: () => void;
}

export function ClipCardMenu({ canRedraw, onRedraw }: ClipCardMenuProps) {
  const redrawLabel = canRedraw ? CLIP_REDRAW_LABEL : CLIP_REDRAW_UNAVAILABLE;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            aria-label={CLIP_MORE_LABEL}
            size="icon-xs"
            title={CLIP_MORE_LABEL}
            variant="ghost"
          />
        }
      >
        <EllipsisIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-auto">
        <DropdownMenuItem disabled={!canRedraw} onClick={onRedraw}>
          <RefreshCwIcon />
          {redrawLabel}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
