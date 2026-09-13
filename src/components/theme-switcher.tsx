import { MoonIcon, SunIcon } from "lucide-react";
import { useCallback, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { useSound } from "@/hooks/use-sound";
import {
  getToggledTheme,
  setThemeWithTransition,
  useTheme,
} from "@/hooks/use-theme";
import { useThemeHotkey } from "@/hooks/use-theme-hotkey";
import { clickSoftSound } from "@/lib/click-soft";

import { cn } from "@/lib/utils";

// Reads the dark class that THEME_INIT_SCRIPT already set on <html> before
// first paint. Using the class directly keeps the icon in sync without an
// additional round-trip through localStorage.
function subscribeToDarkClass(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributeFilter: ["class"],
    attributes: true,
  });
  return () => observer.disconnect();
}

function getIsDark() {
  return document.documentElement.classList.contains("dark");
}

function useIsDark() {
  const systemPrefersDark = useSyncExternalStore(
    subscribeToDarkClass,
    getIsDark,
    // Server snapshot: always false. THEME_INIT_SCRIPT sets the class before
    // first paint, so the real value is available immediately on the client.
    // suppressHydrationWarning on <html> prevents React from warning about
    // the mismatch in the icon between SSR and the first client render.
    () => false
  );
  return systemPrefersDark;
}

interface ThemeSwitcherProps {
  className?: string;
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps = {}) {
  const { theme, setTheme } = useTheme();
  const isDark = useIsDark();
  const [playClick] = useSound(clickSoftSound, { volume: 0.4 });

  const handleToggle = useCallback(() => {
    playClick();
    setThemeWithTransition(getToggledTheme(theme), setTheme);
  }, [theme, setTheme, playClick]);

  useThemeHotkey();

  return (
    <Button
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn("size-8 p-0", className)}
      onClick={handleToggle}
      size="sm"
      title={`${isDark ? "Switch to light theme" : "Switch to dark theme"} (D)`}
      variant="outline"
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
