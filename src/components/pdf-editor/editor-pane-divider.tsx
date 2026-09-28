import type { ReactNode } from "react";
import { SPLIT_DIVIDER_LABEL } from "@/config/pdf-editor";
import type { useSplitResize } from "@/hooks/use-split-resize";

interface EditorPaneDividerProps {
  /** What sits on the divider, the one place that belongs to both panes. */
  children?: ReactNode;
  handlers: ReturnType<typeof useSplitResize>["handlers"];
  ratio: number;
}

const PERCENT = 100;

export function EditorPaneDivider({
  children,
  handlers,
  ratio,
}: EditorPaneDividerProps) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: a draggable divider has no element of its own; hr cannot take focus or hold the lock button
    <div
      {...handlers}
      aria-label={SPLIT_DIVIDER_LABEL}
      aria-orientation="vertical"
      aria-valuemax={PERCENT}
      aria-valuemin={0}
      aria-valuenow={Math.round(ratio * PERCENT)}
      className="relative w-2.5 shrink-0 cursor-col-resize touch-none border-x-2 bg-card transition-colors hover:bg-primary/40 focus-visible:bg-primary/40 focus-visible:outline-none"
      role="separator"
      tabIndex={0}
      title={SPLIT_DIVIDER_LABEL}
    >
      {children}
    </div>
  );
}
