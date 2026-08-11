import { MoonIcon, SunIcon } from "lucide-react";
import { useCallback, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { useSound } from "@/hooks/use-sound";
import { useTheme } from "@/hooks/use-theme";
import { clickSoftSound } from "@/lib/click-soft";

const DARK_QUERY = "(prefers-color-scheme: dark)";

function useIsMounted() {
  return useSyncExternalStore(
    () => () => {
      // no-op: nothing to subscribe to, React switches this hook's snapshot
      // from server to client automatically once hydration completes.
    },
    () => true,
    () => false
  );
}

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

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();
  const systemPrefersDark = useSystemPrefersDark();
  const [playClick] = useSound(clickSoftSound, { volume: 0.4 });

  const isDark = theme === "system" ? systemPrefersDark : theme === "dark";

  const handleToggle = useCallback(() => {
    playClick();
    const next = isDark ? "light" : "dark";
    if (typeof document.startViewTransition !== "function") {
      setTheme(next);
      return;
    }
    document.startViewTransition(() => setTheme(next));
  }, [isDark, setTheme, playClick]);

  // biome-ignore lint/suspicious/noUnnecessaryConditions: useIsMounted's getSnapshot/getServerSnapshot pair intentionally differ -- the documented useSyncExternalStore pattern for a hydration-safe "mounted" flag -- which Biome's static analysis can't see across the client/server split.
  if (!isMounted) {
    return <div className="size-8" />;
  }

  return (
    <Button
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="size-8 p-0"
      onClick={handleToggle}
      size="sm"
      variant="outline"
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
