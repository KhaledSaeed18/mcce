import { useEffect, useRef } from "react";
import { TEXT_CONTROLS_ATTRIBUTE } from "@/config/pdf-editor";
import { consumePress } from "@/lib/pdf-editor/consumed-press";

/**
 * A press outside the text and its controls finishes it. This watches presses
 * rather than focus, since focus also leaves for the toolbar's size field, the
 * color picker, and other windows, none of which mean the reader is done.
 */
export function useTextDraftDismiss(onDismiss: () => void): void {
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  useEffect(() => {
    const handlePress = (event: PointerEvent) => {
      const { target } = event;
      if (
        target instanceof Element &&
        target.closest(`[${TEXT_CONTROLS_ATTRIBUTE}]`)
      ) {
        return;
      }
      consumePress(event);
      onDismissRef.current();
    };
    document.addEventListener("pointerdown", handlePress, true);
    return () => document.removeEventListener("pointerdown", handlePress, true);
  }, []);
}
