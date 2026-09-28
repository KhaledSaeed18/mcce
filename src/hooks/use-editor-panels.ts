import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_EDITOR_PANELS,
  EDITOR_PANELS_STORAGE_KEY,
} from "@/config/pdf-editor";
import type { EditorPanels } from "@/lib/pdf-editor/types";
import { readJson, writeJson } from "@/lib/storage";

/** A layout stored before a panel existed leaves that panel at its default. */
function readStoredPanels(): EditorPanels {
  return {
    ...DEFAULT_EDITOR_PANELS,
    ...readJson<Partial<EditorPanels>>(EDITOR_PANELS_STORAGE_KEY, {}),
  };
}

/** The panels flanking the pages: the file list and the thumbnail rail on the
 * left, and the contents and bookmarks on the right. */
export function useEditorPanels() {
  const [panels, setPanels] = useState<EditorPanels | null>(null);
  // Restoring the stored layout is not the reader's doing, so motion comes on
  // one render after it. Turning it on in the toggle itself would be too late:
  // a closing panel keeps the transition it was last rendered with.
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => setPanels(readStoredPanels()), []);

  useEffect(() => {
    if (panels === null) {
      return;
    }
    writeJson(EDITOR_PANELS_STORAGE_KEY, panels);
    setIsAnimated(true);
  }, [panels]);

  const activePanels = panels ?? DEFAULT_EDITOR_PANELS;

  const toggle = useCallback((panel: keyof EditorPanels) => {
    setPanels((previous) => {
      const current = previous ?? DEFAULT_EDITOR_PANELS;
      return { ...current, [panel]: !current[panel] };
    });
  }, []);

  const toggleBrowser = useCallback(() => toggle("isBrowserOpen"), [toggle]);
  const toggleRail = useCallback(() => toggle("isRailOpen"), [toggle]);
  const toggleStudy = useCallback(() => toggle("isStudyOpen"), [toggle]);

  return {
    ...activePanels,
    isAnimated,
    toggleBrowser,
    toggleRail,
    toggleStudy,
  };
}
