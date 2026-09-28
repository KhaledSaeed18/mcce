import { Link2Icon, Link2OffIcon } from "lucide-react";
import type { PointerEvent } from "react";
import {
  SCROLL_LOCK_OFF_LABEL,
  SCROLL_LOCK_ON_LABEL,
  SHORTCUT_HINTS,
} from "@/config/pdf-editor";
import { formatPageGap } from "@/lib/pdf-editor/page-gap";
import { withShortcut } from "@/lib/pdf-editor/shortcut-label";
import { cn } from "@/lib/utils";

interface ScrollLockButtonProps {
  /** Pages the right pane leads the left by, while locked. */
  gap: number | null;
  onToggle: () => void;
}

/** Pressing it on the divider should not start dragging the divider. */
function keepFromDivider(event: PointerEvent) {
  event.stopPropagation();
}

/** Sits on the divider, the one place that belongs to both files. */
export function ScrollLockButton({ gap, onToggle }: ScrollLockButtonProps) {
  const isLocked = gap !== null;
  const label = isLocked ? SCROLL_LOCK_OFF_LABEL : SCROLL_LOCK_ON_LABEL;
  const Icon = isLocked ? Link2Icon : Link2OffIcon;

  return (
    <div className="absolute top-1/2 left-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1">
      <button
        aria-label={SCROLL_LOCK_ON_LABEL}
        aria-pressed={isLocked}
        className={cn(
          "grid size-7 cursor-pointer place-items-center rounded border-2 shadow-sm transition-colors",
          isLocked
            ? "bg-primary text-primary-foreground"
            : "bg-card hover:bg-primary hover:text-primary-foreground"
        )}
        onClick={onToggle}
        onPointerDown={keepFromDivider}
        title={withShortcut(label, SHORTCUT_HINTS.scrollLock)}
        type="button"
      >
        <Icon className="size-4" />
      </button>
      {isLocked ? (
        <span className="whitespace-nowrap rounded-sm border-2 bg-card px-1 font-head text-[0.6rem]">
          {formatPageGap(gap)}
        </span>
      ) : null}
    </div>
  );
}
