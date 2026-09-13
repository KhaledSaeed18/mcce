import { useSyncExternalStore } from "react";
import { EDITOR_VIEWPORT_QUERY } from "@/config/pdf-editor";

export function useEditorViewport(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(EDITOR_VIEWPORT_QUERY);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia(EDITOR_VIEWPORT_QUERY).matches,
    () => false
  );
}
