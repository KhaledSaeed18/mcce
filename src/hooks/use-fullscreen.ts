import { type RefObject, useCallback, useEffect, useState } from "react";
import { FULLSCREEN_HOTKEY_KEY } from "@/config/pdf-editor";
import { isEditableTarget } from "@/lib/is-editable-target";

/** Puts one element on the whole screen, on the button or on a bare "f". */
export function useFullscreen(targetRef: RefObject<HTMLElement | null>) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Read after mount: the server has no document to ask, and the answer must not differ on hydration.
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => setIsSupported(document.fullscreenEnabled), []);

  useEffect(() => {
    function handleChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  const toggle = useCallback(() => {
    // Both calls reject when the browser refuses the gesture, which costs nothing to ignore.
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => undefined);
      return;
    }
    targetRef.current?.requestFullscreen().catch(() => undefined);
  }, [targetRef]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const hasModifier =
        event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
      if (
        event.key.toLowerCase() !== FULLSCREEN_HOTKEY_KEY ||
        hasModifier ||
        isEditableTarget(event.target)
      ) {
        return;
      }
      event.preventDefault();
      toggle();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);

  return { isFullscreen, isSupported, toggle };
}
