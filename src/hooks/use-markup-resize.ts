import { useCallback, useRef, useState } from "react";
import { getAnnotationBox } from "@/lib/pdf-editor/annotation-box";
import { clampPoint } from "@/lib/pdf-editor/bounds";
import { resizeBox } from "@/lib/pdf-editor/resize-box";
import { scaleAnnotation } from "@/lib/pdf-editor/scale-annotation";
import type {
  Annotation,
  ArrowEnd,
  FrameCorner,
  PageSize,
} from "@/lib/pdf-editor/types";

interface MarkupResizeOptions {
  annotation: Annotation | null;
  onReplace: (annotation: Annotation) => void;
  size: PageSize;
}

interface Travel {
  dx: number;
  dy: number;
  original: Annotation;
}

/**
 * Stretching selected markup by a corner of its frame, or an arrow by either
 * end. It follows the pointer live, and only the release becomes an undo step.
 * Each move is worked out from where the drag began, so a pointer that runs past
 * the page's edge lines up with the handle again when it comes back.
 */
export function useMarkupResize({
  annotation,
  onReplace,
  size,
}: MarkupResizeOptions) {
  const [preview, setPreview] = useState<Annotation | null>(null);
  const travelRef = useRef<Travel | null>(null);
  // Mirrors the preview so the release reads it outside a state updater.
  const previewRef = useRef<Annotation | null>(null);

  const update = useCallback((next: Annotation | null) => {
    previewRef.current = next;
    setPreview(next);
  }, []);

  const advance = useCallback(
    (dx: number, dy: number): Travel | null => {
      const travel =
        travelRef.current ??
        (annotation && { dx: 0, dy: 0, original: annotation });
      if (travel) {
        travel.dx += dx;
        travel.dy += dy;
        travelRef.current = travel;
      }
      return travel;
    },
    [annotation]
  );

  const resize = useCallback(
    (corner: FrameCorner, dx: number, dy: number) => {
      const travel = advance(dx, dy);
      if (!travel) {
        return;
      }
      const start = getAnnotationBox(travel.original);
      const box = resizeBox(start, corner, travel.dx, travel.dy, size);
      update(scaleAnnotation(travel.original, start, box));
    },
    [advance, size, update]
  );

  const moveArrowEnd = useCallback(
    (side: ArrowEnd, dx: number, dy: number) => {
      const travel = advance(dx, dy);
      if (travel?.original.type !== "arrow") {
        return;
      }
      const start = travel.original[side];
      update({
        ...travel.original,
        [side]: clampPoint(
          { x: start.x + travel.dx, y: start.y + travel.dy },
          size
        ),
      });
    },
    [advance, size, update]
  );

  const end = useCallback(() => {
    const { current } = previewRef;
    travelRef.current = null;
    update(null);
    if (current) {
      onReplace(current);
    }
  }, [onReplace, update]);

  return { end, moveArrowEnd, preview, resize };
}

export type MarkupResize = ReturnType<typeof useMarkupResize>;
