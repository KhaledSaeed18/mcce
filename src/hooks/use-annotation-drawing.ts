import { type PointerEvent, useCallback, useRef } from "react";
import { useShapeDrawing } from "@/hooks/use-shape-drawing";
import { useTextTool } from "@/hooks/use-text-tool";
import { toPagePoint } from "@/lib/pdf-editor/pointer";
import type {
  Annotation,
  PageSize,
  Point,
  TextDraft,
  ToolSettings,
} from "@/lib/pdf-editor/types";

interface AnnotationDrawingOptions {
  annotations: Annotation[];
  onAdd: (annotation: Annotation) => void;
  onErase: (pageIndex: number, point: Point) => void;
  onMoveText: (id: string, dx: number, dy: number) => void;
  onTextRequest: (draft: TextDraft) => void;
  pageIndex: number;
  settings: ToolSettings;
  size: PageSize;
  zoom: number;
}

/** Routes one page's pointer events to whichever tool is selected. */
export function useAnnotationDrawing({
  annotations,
  onAdd,
  onErase,
  onMoveText,
  onTextRequest,
  pageIndex,
  settings,
  size,
  zoom,
}: AnnotationDrawingOptions) {
  const text = useTextTool({
    annotations,
    onMoveText,
    onTextRequest,
    pageIndex,
    size,
    zoom,
  });
  const shapes = useShapeDrawing({ onAdd, pageIndex, settings, size, zoom });
  const isErasingRef = useRef(false);

  const handlePointerDown = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      // Text waits for the release: the click that follows a press would move
      // focus to the canvas and blur the new field away as it appeared.
      if (settings.tool === "text") {
        text.handleDown(event);
        return;
      }
      if (settings.tool === "eraser") {
        event.currentTarget.setPointerCapture(event.pointerId);
        isErasingRef.current = true;
        onErase(pageIndex, toPagePoint(event, zoom, size));
        return;
      }
      shapes.handleDown(event);
    },
    [onErase, pageIndex, settings.tool, shapes, size, text, zoom]
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      if (settings.tool === "text") {
        text.handleMove(event);
        return;
      }
      if (settings.tool === "eraser") {
        // biome-ignore lint/suspicious/noUnnecessaryConditions: set by the press handler, a sibling callback the analyzer cannot see across
        if (isErasingRef.current) {
          onErase(pageIndex, toPagePoint(event, zoom, size));
        }
        return;
      }
      shapes.handleMove(event);
    },
    [onErase, pageIndex, settings.tool, shapes, size, text, zoom]
  );

  const handlePointerUp = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      if (settings.tool === "text") {
        text.handleUp(event);
        return;
      }
      if (settings.tool === "eraser") {
        isErasingRef.current = false;
        return;
      }
      shapes.handleUp();
    },
    [settings.tool, shapes, text]
  );

  const handlePointerLeave = useCallback(() => text.handleLeave(), [text]);

  return {
    draft: shapes.draft,
    drag: text.drag,
    handlePointerDown,
    handlePointerLeave,
    handlePointerMove,
    handlePointerUp,
    hoveredTextId: settings.tool === "text" ? text.hoveredId : null,
  };
}
