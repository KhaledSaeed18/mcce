import { type KeyboardEvent, useCallback } from "react";
import { readRailPosition } from "@/lib/pdf-editor/rail-position";

/** Alt and an arrow key move the focused page, for anyone not using a pointer. */
export function usePageReorderKeys(onMove: (from: number, to: number) => void) {
  return useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      const isArrow = event.key === "ArrowUp" || event.key === "ArrowDown";
      const from = readRailPosition(event.target);
      if (!(event.altKey && isArrow) || from === null) {
        return;
      }
      event.preventDefault();
      onMove(from, from + (event.key === "ArrowUp" ? -1 : 1));
    },
    [onMove]
  );
}
