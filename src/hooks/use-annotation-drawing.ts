import type { PointerEvent } from "react";
import { useEraser } from "@/hooks/use-eraser";
import { useShapeDrawing } from "@/hooks/use-shape-drawing";
import { useTextTool } from "@/hooks/use-text-tool";
import type {
  Annotation,
  AnnotationActions,
  EditorTool,
  PageSize,
  TextDraft,
  ToolSettings,
} from "@/lib/pdf-editor/types";

interface PointerHandlers {
  handleDown: (event: PointerEvent<HTMLCanvasElement>) => void;
  handleMove: (event: PointerEvent<HTMLCanvasElement>) => void;
  handleUp: (event: PointerEvent<HTMLCanvasElement>) => void;
}

interface Tools {
  eraser: PointerHandlers;
  shapes: PointerHandlers;
  text: PointerHandlers;
}

function pickTool(tool: EditorTool, tools: Tools): PointerHandlers {
  if (tool === "text") {
    return tools.text;
  }
  if (tool === "eraser") {
    return tools.eraser;
  }
  return tools.shapes;
}

interface AnnotationDrawingOptions {
  actions: AnnotationActions;
  annotations: Annotation[];
  onDraft: (draft: TextDraft) => void;
  pageIndex: number;
  settings: ToolSettings;
  size: PageSize;
  zoom: number;
}

/** Routes one page's pointer events to whichever tool is selected. */
export function useAnnotationDrawing({
  actions,
  annotations,
  onDraft,
  pageIndex,
  settings,
  size,
  zoom,
}: AnnotationDrawingOptions) {
  const text = useTextTool({
    annotations,
    onDraft,
    onMoveText: actions.moveText,
    onSelect: actions.select,
    pageIndex,
    settings,
    size,
    zoom,
  });
  const eraser = useEraser({ onErase: actions.erase, pageIndex, size, zoom });
  const shapes = useShapeDrawing({
    onAdd: actions.add,
    pageIndex,
    settings,
    size,
    zoom,
  });
  const active = pickTool(settings.tool, { eraser, shapes, text });

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
