import { MoonIcon, SunIcon } from "lucide-react";
import { useCallback, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { useIsHydrated } from "@/hooks/use-is-hydrated";
import { useSound } from "@/hooks/use-sound";
import {
  getToggledTheme,
  setThemeWithTransition,
  useTheme,
} from "@/hooks/use-theme";
import { useThemeHotkey } from "@/hooks/use-theme-hotkey";
import { clickSoftSound } from "@/lib/click-soft";

import { cn } from "@/lib/utils";

const DARK_QUERY = "(prefers-color-scheme: dark)";

function useSystemPrefersDark() {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(DARK_QUERY);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia(DARK_QUERY).matches,
    () => false
  );
}

interface ThemeSwitcherProps {
  className?: string;
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps = {}) {
  const { theme, setTheme } = useTheme();
  const isHydrated = useIsHydrated();
  const systemPrefersDark = useSystemPrefersDark();
  const [playClick] = useSound(clickSoftSound, { volume: 0.4 });

  const isDark = theme === "system" ? systemPrefersDark : theme === "dark";

  const handleToggle = useCallback(() => {
    playClick();
    setThemeWithTransition(getToggledTheme(theme), setTheme);
  }, [theme, setTheme, playClick]);

  useThemeHotkey();

  // The theme is only known once the stored choice has been read on the
  // client, so the label stays neutral until then. The icon does not have to
  // wait: the head script sets the `dark` class before first paint.
  let label = "Toggle theme";
  if (isHydrated) {
    label = isDark ? "Switch to light theme" : "Switch to dark theme";
  }

  return (
    <Button
      aria-label={label}
      className={cn("size-8 p-0", className)}
      onClick={handleToggle}
      size="sm"
      title={`${label} (D)`}
      variant="outline"
    >
      <SunIcon className="dark:hidden" />
      <MoonIcon className="hidden dark:block" />
    </Button>
  );
}
