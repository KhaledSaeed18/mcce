import { type PointerEvent, useCallback, useRef, useState } from "react";
import {
  buildArrow,
  buildHighlight,
  buildShape,
  buildStroke,
  isEmptyAnnotation,
} from "@/lib/pdf-editor/build-annotation";
import { toPagePoint } from "@/lib/pdf-editor/pointer";
import type {
  Annotation,
  PageSize,
  Point,
  ToolSettings,
} from "@/lib/pdf-editor/types";

/** What a drag from `start` to `end` draws with the tool in hand. */
function buildDraft(
  start: Point,
  end: Point,
  pageId: string,
  settings: ToolSettings
): Annotation | null {
  if (settings.tool === "arrow") {
    return buildArrow(start, end, pageId, settings);
  }
  if (settings.tool === "rect" || settings.tool === "ellipse") {
    return buildShape(settings.tool, start, end, pageId, settings);
  }
  return null;
}

/** A freehand line through every point the pointer has passed, in the tool's own ink. */
function buildFreehand(
  points: Point[],
  pageId: string,
  settings: ToolSettings
): Annotation {
  return settings.tool === "highlight"
    ? buildHighlight(points, pageId, settings)
    : buildStroke(points, pageId, settings);
}

function isFreehand(tool: ToolSettings["tool"]): boolean {
  return tool === "pen" || tool === "highlight";
}

interface ShapeDrawingOptions {
  onAdd: (annotation: Annotation) => void;
  pageId: string;
  rotation: number;
  settings: ToolSettings;
  size: PageSize;
  zoom: number;
}

/** The pen, the highlighter, the two shapes, and the arrow: a draft follows the pointer and is committed on release. */
export function useShapeDrawing({
  onAdd,
  pageId,
  settings,
  rotation,
  size,
  zoom,
}: ShapeDrawingOptions) {
  const [draft, setDraft] = useState<Annotation | null>(null);
  const startRef = useRef<Point | null>(null);
  const pointsRef = useRef<Point[]>([]);
  // Mirrors the draft so the commit on release stays outside the state updater.
  const draftRef = useRef<Annotation | null>(null);

  const updateDraft = useCallback((next: Annotation | null) => {
    draftRef.current = next;
    setDraft(next);
  }, []);

  const handleDown = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      const point = toPagePoint(event, zoom, size, rotation);
      event.currentTarget.setPointerCapture(event.pointerId);
      startRef.current = point;
      pointsRef.current = [point];
      updateDraft(
        isFreehand(settings.tool)
          ? buildFreehand([point], pageId, settings)
          : buildDraft(point, point, pageId, settings)
      );
    },
    [pageId, rotation, settings, size, updateDraft, zoom]
  );

  const handleMove = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      const { current: origin } = startRef;
      if (!origin) {
        return;
      }
      const point = toPagePoint(event, zoom, size, rotation);

      if (isFreehand(settings.tool)) {
        pointsRef.current = [...pointsRef.current, point];
        updateDraft(buildFreehand(pointsRef.current, pageId, settings));
        return;
      }
      updateDraft(buildDraft(origin, point, pageId, settings));
    },
    [pageId, rotation, settings, size, updateDraft, zoom]
  );

  const handleUp = useCallback(() => {
    const { current } = draftRef;
    startRef.current = null;
    pointsRef.current = [];
    updateDraft(null);
    if (current && !isEmptyAnnotation(current)) {
      onAdd(current);
    }
  }, [onAdd, updateDraft]);

  return { draft, handleDown, handleMove, handleUp };
}
