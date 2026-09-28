import { useCallback } from "react";
import { BOOKMARK_HOTKEY_KEY } from "@/config/pdf-editor";
import { useEditorHotkeys } from "@/hooks/use-editor-hotkeys";
import type { EditorSession } from "@/hooks/use-editor-session";
import { useKeyHotkey } from "@/hooks/use-key-hotkey";
import { useMarkupClipboard } from "@/hooks/use-markup-clipboard";
import { useSearchHotkey } from "@/hooks/use-search-hotkey";
import type { EditorTool } from "@/lib/pdf-editor/types";

/** Binds the editor's keyboard shortcuts to one session's file. Called once,
 * with the session that has focus, so a key never reaches two files. */
export function useEditorShortcuts(
  session: EditorSession,
  onToolChange: (tool: EditorTool) => void
) {
  const { bookmarks, exportPdf, markup, navigation, search, zoom } = session;

  const goToNextPage = useCallback(() => {
    if (navigation.activeIndex < navigation.pageCount - 1) {
      navigation.goToPage(navigation.activeIndex + 1);
    }
  }, [navigation]);

  const goToPrevPage = useCallback(() => {
    if (navigation.activeIndex > 0) {
      navigation.goToPage(navigation.activeIndex - 1);
    }
  }, [navigation]);

  useMarkupClipboard({
    activeIndex: navigation.activeIndex,
    annotations: markup.annotations,
    onAdd: markup.actions.add,
    onSelect: markup.actions.select,
    pages: markup.pages,
    selectedId: markup.selectedId,
  });

  useKeyHotkey(BOOKMARK_HOTKEY_KEY, bookmarks.toggleActive);
  useSearchHotkey(search.open);

  useEditorHotkeys({
    onDeselect: markup.deselect,
    onExport: exportPdf,
    onFitWidth: zoom.fitWidth,
    onNextPage: goToNextPage,
    onPrevPage: goToPrevPage,
    onRedo: markup.redo,
    onRemove: markup.removeSelected,
    onToolChange,
    onUndo: markup.undo,
    onZoomIn: zoom.zoomIn,
    onZoomOut: zoom.zoomOut,
  });
}
