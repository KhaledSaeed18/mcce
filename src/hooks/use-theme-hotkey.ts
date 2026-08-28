import { useEffect } from "react";
import { THEME_HOTKEY_KEY } from "@/config/navigation";
import {
  getToggledTheme,
  setThemeWithTransition,
  useTheme,
} from "@/hooks/use-theme";
import { isEditableTarget } from "@/lib/is-editable-target";

/** Toggles dark mode on bare "d", or on Cmd/Ctrl+Shift+D. */
export function useThemeHotkey() {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() !== THEME_HOTKEY_KEY || event.altKey) {
        return;
      }

      const hasModifier = event.metaKey || event.ctrlKey;
      const isBareKey = !(hasModifier || event.shiftKey);
      const isModifiedKey = hasModifier && event.shiftKey;
      if (!(isBareKey || isModifiedKey)) {
        return;
      }

      if (isEditableTarget(event.target)) {
        return;
      }

      event.preventDefault();
      setThemeWithTransition(getToggledTheme(theme), setTheme);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [theme, setTheme]);
}
