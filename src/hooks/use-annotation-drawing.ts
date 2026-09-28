import { useEraser } from "@/hooks/use-eraser";
import { useHandTool } from "@/hooks/use-hand-tool";
import { useNoteTool } from "@/hooks/use-note-tool";
import { useShapeDrawing } from "@/hooks/use-shape-drawing";
import { useTextTool } from "@/hooks/use-text-tool";
import { pickPointerTool } from "@/lib/pdf-editor/pointer-tools";
import type {
  Annotation,
  AnnotationActions,
  PageSize,
  TextDraft,
  ToolSettings,
} from "@/lib/pdf-editor/types";

interface AnnotationDrawingOptions {
  actions: AnnotationActions;
  annotations: Annotation[];
  onDraft: (draft: TextDraft) => void;
  pageId: string;
  rotation: number;
  settings: ToolSettings;
  size: PageSize;
  zoom: number;
}

/** Routes one page's pointer events to whichever tool is selected. */
export function useAnnotationDrawing({
  actions,
  annotations,
  onDraft,
  pageId,
  settings,
  rotation,
  size,
  zoom,
}: AnnotationDrawingOptions) {
  const text = useTextTool({
    annotations,
    onDraft,
    onMoveText: actions.moveText,
    onSelect: actions.select,
    pageId,
    rotation,
    settings,
    size,
    zoom,
  });
  const eraser = useEraser({
    onBatchErase: actions.batchErase,
    pageId,
    rotation,
    size,
    zoom,
  });
  const shapes = useShapeDrawing({
    onAdd: actions.add,
    pageId,
    rotation,
    settings,
    size,
    zoom,
  });
  const note = useNoteTool({
    annotations,
    onAdd: actions.add,
    onSelect: actions.select,
    pageId,
    rotation,
    size,
    zoom,
  });
  const hand = useHandTool();
  const active = pickPointerTool(settings.tool, {
    eraser,
    hand,
    note,
    shapes,
    text,
  });

  return {
    draft: shapes.draft,
    drag: text.drag,
    handleDoubleClick: text.handleDoubleClick,
    handlePointerDown: active.handleDown,
    handlePointerLeave: text.handleLeave,
    handlePointerMove: active.handleMove,
    handlePointerUp: active.handleUp,
    hoveredTextId: settings.tool === "text" ? text.hoveredId : null,
  };
}
