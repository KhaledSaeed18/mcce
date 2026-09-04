import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_EDITOR_PANELS,
  EDITOR_PANELS_STORAGE_KEY,
} from "@/config/pdf-editor";
import type { EditorPanels } from "@/lib/pdf-editor/types";
import { readJson, writeJson } from "@/lib/storage";

function readStoredPanels(): EditorPanels {
  return readJson<EditorPanels>(
    EDITOR_PANELS_STORAGE_KEY,
    DEFAULT_EDITOR_PANELS
  );
}

/** The two panels flanking the pages: the file list and the thumbnail rail. */
export function useEditorPanels() {
  const [panels, setPanels] = useState<EditorPanels | null>(null);

  useEffect(() => setPanels(readStoredPanels()), []);

  useEffect(() => {
    if (panels === null) {
      return;
    }
    writeJson(EDITOR_PANELS_STORAGE_KEY, panels);
  }, [panels]);

  const activePanels = panels ?? DEFAULT_EDITOR_PANELS;

  const toggleBrowser = useCallback(() => {
    setPanels((previous) => {
      const current = previous ?? DEFAULT_EDITOR_PANELS;
      return { ...current, isBrowserOpen: !current.isBrowserOpen };
    });
  }, []);

  const toggleRail = useCallback(() => {
    setPanels((previous) => {
      const current = previous ?? DEFAULT_EDITOR_PANELS;
      return { ...current, isRailOpen: !current.isRailOpen };
    });
  }, []);

  return {
    isBrowserOpen: activePanels.isBrowserOpen,
    isRailOpen: activePanels.isRailOpen,
    toggleBrowser,
    toggleRail,
  };
}
