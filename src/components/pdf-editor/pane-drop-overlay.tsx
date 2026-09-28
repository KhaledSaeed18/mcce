import { PANE_DROP_LABELS } from "@/config/pdf-editor";
import type { EditorPaneSide } from "@/lib/pdf-editor/types";
import { cn } from "@/lib/utils";

const SIDES: readonly EditorPaneSide[] = ["primary", "beside"];

interface PaneDropOverlayProps {
  isSplit: boolean;
  target: EditorPaneSide;
}

/** Two halves over the pages while a tab is dragged there, the one it
 * would land in lit, each saying what dropping there does. */
export function PaneDropOverlay({ isSplit, target }: PaneDropOverlayProps) {
  const labels = PANE_DROP_LABELS[isSplit ? "split" : "single"];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-40 flex gap-2 p-3"
    >
      {SIDES.map((side) => (
        <div
          className={cn(
            "flex flex-1 items-center justify-center rounded border-2 border-dashed font-head text-sm transition-colors",
            side === target
              ? "border-border bg-primary/80 text-primary-foreground"
              : "border-border/40 bg-background/60 text-muted-foreground"
          )}
          key={side}
        >
          {labels[side]}
        </div>
      ))}
    </div>
  );
}
