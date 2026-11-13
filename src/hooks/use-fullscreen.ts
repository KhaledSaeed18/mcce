import { useCallback, useEffect, useState } from "react";
import { FULLSCREEN_HOTKEY_KEY } from "@/config/pdf-editor";
import { isEditableTarget } from "@/lib/is-editable-target";
import { isPopupTarget } from "@/lib/is-popup-target";

/** Both calls reject when the browser refuses the gesture, which costs nothing to ignore. */
function exitFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => undefined);
  }
}

/**
 * Puts the whole page on the screen, on the button or on a bare "f". The whole
 * document rather than the editor's own element, because menus, popovers and
 * dialogs render at the end of the body, and full screen only paints what sits
 * inside the element it was asked for.
 */
export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  // Read after mount: the server has no document to ask, and the answer must not differ on hydration.
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => setIsSupported(document.fullscreenEnabled), []);

  useEffect(() => {
    function handleChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", handleChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleChange);
      // The rest of the site has no way out of full screen, so leaving the editor ends it.
      exitFullscreen();
    };
  }, []);

  const toggle = useCallback(() => {
    if (document.fullscreenElement) {
      exitFullscreen();
      return;
    }
    document.documentElement.requestFullscreen().catch(() => undefined);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const hasModifier =
        event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
      if (
        event.key.toLowerCase() !== FULLSCREEN_HOTKEY_KEY ||
        hasModifier ||
        isEditableTarget(event.target) ||
        isPopupTarget(event.target)
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
