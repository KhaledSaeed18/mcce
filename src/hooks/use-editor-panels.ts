import { useCallback, useState } from "react";

/** The two panels flanking the pages: the file list and the thumbnail rail. */
export function useEditorPanels() {
  const [isBrowserOpen, setIsBrowserOpen] = useState(true);
  const [isRailOpen, setIsRailOpen] = useState(false);

  const toggleBrowser = useCallback(
    () => setIsBrowserOpen((open) => !open),
    []
  );

  const toggleRail = useCallback(() => setIsRailOpen((open) => !open), []);

  return { isBrowserOpen, isRailOpen, toggleBrowser, toggleRail };
}
