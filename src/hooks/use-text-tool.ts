import { useCallback, useMemo } from "react";
import { TEXT_BOX_DRAFT_COLOR } from "@/config/pdf-editor";
import { useTextBoxDraw } from "@/hooks/use-text-box-draw";
import { type TextDragResult, useTextDrag } from "@/hooks/use-text-drag";
import { useTextHover } from "@/hooks/use-text-hover";
import { useTextPointerHandlers } from "@/hooks/use-text-pointer-handlers";
import {
  buildBoxDraft,
  buildDraft,
  toDraft,
} from "@/lib/pdf-editor/build-draft";
import { getCaretOffset } from "@/lib/pdf-editor/text-caret";
import type {
  Annotation,
  Box,
  PageSize,
  Point,
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

/** The text tool on one page. */
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
  const handleLift = useCallback(() => onSelect(null), [onSelect]);
  const textDrag = useTextDrag({
    annotations,
    onLift: handleLift,
    onMove: onMoveText,
    pageId,
    size,
  });
  const hover = useTextHover(annotations, pageId);
  const boxDraw = useTextBoxDraw();
  const { textStyle } = settings;

  const actions = useMemo(
    () => ({
      beginBox: boxDraw.begin,
      endBox: boxDraw.end,
      endDrag: textDrag.end,
      moveBox: boxDraw.move,
      moveDrag: textDrag.move,
      onHover: hover.update,
      onOpenAt: (point: Point) => onDraft(buildDraft(point, pageId, textStyle)),
      onOpenBox: (box: Box) => onDraft(buildBoxDraft(box, pageId, textStyle)),
      onOpenOn: ({ target }: TextDragResult, point: Point) =>
        onDraft(toDraft(target, getCaretOffset(target, point))),
      onSelect,
      startDrag: textDrag.start,
    }),
    [
      boxDraw.begin,
      boxDraw.end,
      boxDraw.move,
      hover.update,
      onDraft,
      onSelect,
      pageId,
      textDrag.end,
      textDrag.move,
      textDrag.start,
      textStyle,
    ]
  );
  const { handleDown, handleMove, handleUp } = useTextPointerHandlers({
    actions,
    rotation,
    size,
    zoom,
  });
  const boxDraft = useMemo<Annotation | null>(
    () =>
      boxDraw.box && {
        ...boxDraw.box,
        color: TEXT_BOX_DRAFT_COLOR,
        id: "text-box-draft",
        pageId,
        strokeWidth: 1,
        type: "rect",
      },
    [boxDraw.box, pageId]
  );

  return {
    boxDraft,
    drag: textDrag.drag,
    handleDown,
    handleLeave: hover.clear,
    handleMove,
    handleUp,
    hoveredId: hover.hoveredId,
  };
}
