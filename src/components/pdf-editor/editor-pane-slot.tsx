import { type ReactNode, useCallback } from "react";
import { PANE_LABELS } from "@/config/pdf-editor";
import type { EditorPaneSide } from "@/lib/pdf-editor/types";

interface EditorPaneSlotProps {
  children: ReactNode;
  /** Framed in orange, which only means something while there are two. */
  isFocused: boolean;
  isSplit: boolean;
  onFocus: (side: EditorPaneSide) => void;
  /** The pane's part of the width, grown from nothing so the divider's own
   * width comes out of both. */
  share: number;
  side: EditorPaneSide;
}

/** Where one pane sits. Pressing or tabbing into it gives it focus, so the
 * toolbar and keys act on the file the reader is working in. */
export function EditorPaneSlot({
  children,
  isFocused,
  isSplit,
  onFocus,
  share,
  side,
}: EditorPaneSlotProps) {
  const handleFocus = useCallback(() => {
    if (isSplit && !isFocused) {
      onFocus(side);
    }
  }, [isFocused, isSplit, onFocus, side]);

  return (
    <section
      aria-label={isSplit ? PANE_LABELS[side] : undefined}
      className="relative flex min-h-0 min-w-0 flex-col"
      onFocusCapture={handleFocus}
      onPointerDownCapture={handleFocus}
      style={{ flex: `${share} 1 0` }}
    >
      {children}
      {isSplit && isFocused ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_0_3px_var(--primary)]"
        />
      ) : null}
    </section>
  );
}
