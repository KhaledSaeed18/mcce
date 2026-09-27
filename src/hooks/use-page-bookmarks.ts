import { useCallback, useEffect, useMemo, useState } from "react";
import { BOOKMARK_HOTKEY_KEY } from "@/config/pdf-editor";
import { useKeyHotkey } from "@/hooks/use-key-hotkey";
import {
  listBookmarkedPositions,
  readBookmarks,
  toggleBookmark,
  writeBookmarks,
} from "@/lib/pdf-editor/bookmarks";
import type { EditorPage } from "@/lib/pdf-editor/types";

interface StoredBookmarks {
  fileId: string | undefined;
  ids: string[];
}

const NOTHING_MARKED: StoredBookmarks = { fileId: undefined, ids: [] };

/** The pages the reader bookmarked in the open file, kept in this browser. A
 * bookmark follows its page wherever it moves. B marks the page being read. */
export function usePageBookmarks(
  fileId: string | undefined,
  pages: EditorPage[],
  activeIndex: number
) {
  const [stored, setStored] = useState<StoredBookmarks>(NOTHING_MARKED);

  useEffect(() => {
    setStored(fileId ? { fileId, ids: readBookmarks(fileId) } : NOTHING_MARKED);
  }, [fileId]);

  // Until the new file's bookmarks are read, the last file's are not its own.
  const ids = stored.fileId === fileId ? stored.ids : NOTHING_MARKED.ids;
  const activeId = pages[activeIndex]?.id;

  const toggle = useCallback(
    (pageId: string) => {
      if (!fileId) {
        return;
      }
      const next = toggleBookmark(ids, pageId);
      writeBookmarks(fileId, next);
      setStored({ fileId, ids: next });
    },
    [fileId, ids]
  );

  const toggleActive = useCallback(() => {
    if (activeId) {
      toggle(activeId);
    }
  }, [activeId, toggle]);

  useKeyHotkey(BOOKMARK_HOTKEY_KEY, toggleActive);

  const positions = useMemo(
    () => listBookmarkedPositions(ids, pages),
    [ids, pages]
  );

  return {
    isActiveMarked: activeId !== undefined && ids.includes(activeId),
    positions,
    toggle,
    toggleActive,
  };
}

export type PageBookmarks = ReturnType<typeof usePageBookmarks>;
