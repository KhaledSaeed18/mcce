import { useCallback, useRef } from "react";
import { resizeTextBox } from "@/lib/pdf-editor/text-box";
import { scaleTextBox } from "@/lib/pdf-editor/text-scale";
import type {
  FrameCorner,
  PageSize,
  TextBoxEdge,
  TextGeometry,
} from "@/lib/pdf-editor/types";

interface TextBoxTransformOptions<T extends TextGeometry> {
  onUpdate: (next: T) => void;
  size: PageSize;
  target: T | null;
}

interface Travel<T> {
  dx: number;
  dy: number;
  start: T;
}

/**
 * Dragging a text frame's handles. Each move is worked out from where the drag
 * began rather than from the last move, so a pointer that runs past the page's
 * edge lines up with the handle again when it comes back.
 */
export function useTextBoxTransform<T extends TextGeometry>({
  onUpdate,
  size,
  target,
}: TextBoxTransformOptions<T>) {
  const travelRef = useRef<Travel<T> | null>(null);

  const advance = useCallback(
    (dx: number, dy: number): Travel<T> | null => {
      const travel =
        travelRef.current ?? (target && { dx: 0, dy: 0, start: target });
      if (travel) {
        travel.dx += dx;
        travel.dy += dy;
        travelRef.current = travel;
      }
      return travel;
    },
    [target]
  );

  const resizeSide = useCallback(
    (edge: TextBoxEdge, dx: number) => {
      const travel = advance(dx, 0);
      if (travel) {
        onUpdate(resizeTextBox(travel.start, edge, travel.dx, size));
      }
    },
    [advance, onUpdate, size]
  );

  const resizeCorner = useCallback(
    (corner: FrameCorner, dx: number, dy: number) => {
      const travel = advance(dx, dy);
      if (travel) {
        onUpdate(
          scaleTextBox(travel.start, corner, travel.dx, travel.dy, size)
        );
      }
    },
    [advance, onUpdate, size]
  );

  const finish = useCallback(() => {
    travelRef.current = null;
  }, []);

  return { finish, resizeCorner, resizeSide };
}
