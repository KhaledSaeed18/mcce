import { type PointerEvent, useCallback, useRef, useState } from "react";
import {
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

interface ShapeDrawingOptions {
  onAdd: (annotation: Annotation) => void;
  pageId: string;
  rotation: number;
  settings: ToolSettings;
  size: PageSize;
  zoom: number;
}

/** The pen and the two shapes: a draft follows the pointer and is committed on release. */
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
        settings.tool === "pen"
          ? buildStroke([point], pageId, settings)
          : buildShape("rect", point, point, pageId, settings)
      );
    },
    [pageId, rotation, settings, size, updateDraft, zoom]
  );

  const handleMove = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      const { current: origin } = startRef;
      // biome-ignore lint/suspicious/noUnnecessaryConditions: set by the press handler, a sibling callback the analyzer cannot see across
      if (!origin) {
        return;
      }
      const point = toPagePoint(event, zoom, size, rotation);

      if (settings.tool === "pen") {
        pointsRef.current = [...pointsRef.current, point];
        updateDraft(buildStroke(pointsRef.current, pageId, settings));
        return;
      }
      if (settings.tool === "rect" || settings.tool === "ellipse") {
        updateDraft(buildShape(settings.tool, origin, point, pageId, settings));
      }
    },
    [pageId, rotation, settings, size, updateDraft, zoom]
  );

  const handleUp = useCallback(() => {
    const { current } = draftRef;
    startRef.current = null;
    pointsRef.current = [];
    updateDraft(null);
    // biome-ignore lint/suspicious/noUnnecessaryConditions: the ref holds a draft only while a drag is in progress
    if (current && !isEmptyAnnotation(current)) {
      onAdd(current);
    }
  }, [onAdd, updateDraft]);

  return { draft, handleDown, handleMove, handleUp };
}
