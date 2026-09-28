import { type PointerEvent, useCallback, useRef, useState } from "react";
import {
  CLIP_DRAFT_COLOR,
  CLIP_DRAFT_WIDTH,
  CLIP_MIN_BOX,
} from "@/config/pdf-editor";
import { buildShape } from "@/lib/pdf-editor/build-annotation";
import { normalizeRect } from "@/lib/pdf-editor/geometry";
import { toPagePoint } from "@/lib/pdf-editor/pointer";
import type { Annotation, Box, PageSize, Point } from "@/lib/pdf-editor/types";

interface ClipToolOptions {
  onClip: (pageId: string, box: Box) => void;
  pageId: string;
  rotation: number;
  size: PageSize;
  zoom: number;
}

const DRAFT_SETTINGS = {
  color: CLIP_DRAFT_COLOR,
  fontSize: 0,
  strokeWidth: CLIP_DRAFT_WIDTH,
  tool: "clip",
} as const;

/** The clip tool: a box follows the pointer, and letting go clips it. */
export function useClipTool({
  onClip,
  pageId,
  rotation,
  size,
  zoom,
}: ClipToolOptions) {
  const [draft, setDraft] = useState<Annotation | null>(null);
  const startRef = useRef<Point | null>(null);
  const endRef = useRef<Point | null>(null);

  const handleDown = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      event.currentTarget.setPointerCapture(event.pointerId);
      startRef.current = toPagePoint(event, zoom, size, rotation);
      endRef.current = startRef.current;
    },
    [rotation, size, zoom]
  );

  const handleMove = useCallback(
    (event: PointerEvent<HTMLCanvasElement>) => {
      const start = startRef.current;
      if (!start) {
        return;
      }
      endRef.current = toPagePoint(event, zoom, size, rotation);
      setDraft(
        buildShape("rect", start, endRef.current, pageId, DRAFT_SETTINGS)
      );
    },
    [pageId, rotation, size, zoom]
  );

  const handleUp = useCallback(() => {
    const start = startRef.current;
    const end = endRef.current;
    startRef.current = null;
    setDraft(null);
    if (!(start && end)) {
      return;
    }
    const box = normalizeRect(start, end);
    if (box.width >= CLIP_MIN_BOX && box.height >= CLIP_MIN_BOX) {
      onClip(pageId, box);
    }
  }, [onClip, pageId]);

  return { draft, handleDown, handleMove, handleUp };
}
