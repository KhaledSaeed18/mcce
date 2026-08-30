import { useCallback, useState } from "react";
import { findTextAt } from "@/lib/pdf-editor/move";
import type { Annotation, Point } from "@/lib/pdf-editor/types";

/** Which text the pointer is over, so the canvas can offer to move it. */
export function useTextHover(annotations: Annotation[], pageIndex: number) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const update = useCallback(
    (point: Point) => {
      const target = findTextAt(annotations, pageIndex, point);
      setHoveredId(target ? target.id : null);
    },
    [annotations, pageIndex]
  );

  const clear = useCallback(() => setHoveredId(null), []);

  return { clear, hoveredId, update };
}
