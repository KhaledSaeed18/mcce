import { useTextDrag } from "@/hooks/use-text-drag";
import { useTextHover } from "@/hooks/use-text-hover";
import { useTextOpen } from "@/hooks/use-text-open";
import { useTextPointerHandlers } from "@/hooks/use-text-pointer-handlers";
import type {
  Annotation,
  PageSize,
  TextDraft,
  ToolSettings,
} from "@/lib/pdf-editor/types";

interface TextToolOptions {
  annotations: Annotation[];
  onDraft: (draft: TextDraft) => void;
  onMoveText: (id: string, dx: number, dy: number) => void;
  onSelect: (id: string | null) => void;
  pageId: string;
  rotation: number;
  settings: ToolSettings;
  size: PageSize;
  zoom: number;
}

/**
 * Pressing text already on the page picks it up: drag to move it, release
 * without moving to select it, press again to open it for typing. Pressing
 * anywhere else writes new text.
 *
 * Every field opens on the release, because the click that follows a press would
 * move focus to the canvas and blur the new field away as it appeared.
 */
export function useTextTool({
  annotations,
  onDraft,
  onMoveText,
  onSelect,
  pageId,
  settings,
  rotation,
  size,
  zoom,
}: TextToolOptions) {
  const { drag, end, move, start } = useTextDrag({
    annotations,
    onMove: onMoveText,
    pageId,
    size,
  });
  const hover = useTextHover(annotations, pageId);
  const open = useTextOpen({
    annotations,
    onDraft,
    pageId,
    rotation,
    settings,
    size,
    zoom,
  });

  const { handleDown, handleMove, handleUp } = useTextPointerHandlers({
    end,
    hover,
    move,
    onSelect,
    open,
    rotation,
    size,
    start,
    zoom,
  });

  return {
    drag,
    handleDoubleClick: open.openOn,
    handleDown,
    handleLeave: hover.clear,
    handleMove,
    handleUp,
    hoveredId: hover.hoveredId,
  };
}
