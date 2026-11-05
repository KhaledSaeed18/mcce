import type { PointerEvent } from "react";
import { useCallback } from "react";
import { useClipTool } from "@/hooks/use-clip-tool";
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
  /** During an exam, when the eraser must not take a cover away. */
  areCoversLocked: boolean;
  onDraft: (draft: TextDraft) => void;
  pageId: string;
  rotation: number;
  settings: ToolSettings;
  size: PageSize;
  zoom: number;
}

/** The markup the tool in hand is drawing right now. */
function pickDraft(
  tool: ToolSettings["tool"],
  clipDraft: Annotation | null,
  shapeDraft: Annotation | null,
  textBoxDraft: Annotation | null
): Annotation | null {
  if (tool === "clip") {
    return clipDraft;
  }
  return tool === "text" ? textBoxDraft : shapeDraft;
}

/** Routes one page's pointer events to whichever tool is selected. */
export function useAnnotationDrawing({
  actions,
  annotations,
  areCoversLocked,
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
    annotations: areCoversLocked
      ? annotations.filter((annotation) => annotation.type !== "cover")
      : annotations,
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
  const clip = useClipTool({
    onClip: actions.clip,
    pageId,
    rotation,
    size,
    zoom,
  });
  const hand = useHandTool();
  const tools = { clip, eraser, hand, note, shapes, text };
  const active = pickPointerTool(settings.tool, tools);
  const { handleDown } = active;

  // Only the main button draws. A right click, or Ctrl and a click on a Mac,
  // is for the context menu, whose release a tool might never hear about.
  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      if (event.button === 0 && !event.ctrlKey) {
        handleDown(event);
      }
    },
    [handleDown]
  );

  return {
    draft: pickDraft(settings.tool, clip.draft, shapes.draft, text.boxDraft),
    drag: text.drag,
    erasedIds: eraser.erasedIds,
    handlePointerDown,
    handlePointerLeave: text.handleLeave,
    handlePointerMove: active.handleMove,
    handlePointerUp: active.handleUp,
    hoveredTextId: settings.tool === "text" ? text.hoveredId : null,
  };
}
