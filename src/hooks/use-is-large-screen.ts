import { useSyncExternalStore } from "react";
import { LARGE_SCREEN_QUERY } from "@/config/page-hero";

/** Gates decoration that only earns its place when there is room for it. The
 * server snapshot is false, so a small screen never mounts the work at all
 * rather than mounting it and hiding it with a class. */
export function useIsLargeScreen(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(LARGE_SCREEN_QUERY);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia(LARGE_SCREEN_QUERY).matches,
    () => false
  );
}
