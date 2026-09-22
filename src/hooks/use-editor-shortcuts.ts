import { useCallback } from "react";
import { useEditorHotkeys } from "@/hooks/use-editor-hotkeys";
import type { useEditorMarkup } from "@/hooks/use-editor-markup";
import type { usePdfZoom } from "@/hooks/use-pdf-zoom";
import type { EditorTool, PageNavigation } from "@/lib/pdf-editor/types";

interface EditorShortcutOptions {
  markup: ReturnType<typeof useEditorMarkup>;
  navigation: PageNavigation;
  onExport: () => void;
  onToolChange: (tool: EditorTool) => void;
  zoom: ReturnType<typeof usePdfZoom>;
}

/** Binds the editor's keyboard shortcuts to the open document's actions. */
export function useEditorShortcuts({
  markup,
  navigation,
  onExport,
  onToolChange,
  zoom,
}: EditorShortcutOptions) {
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

  useEditorHotkeys({
    onDeselect: markup.deselect,
    onExport,
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
