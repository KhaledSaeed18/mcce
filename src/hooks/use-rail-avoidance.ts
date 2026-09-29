import { type RefObject, useCallback } from "react";
import { PAGE_RAIL_ATTRIBUTE } from "@/config/pdf-editor";
import { avoidBands } from "@/lib/pdf-editor/clips/avoid-bands";
import type { Box } from "@/lib/pdf-editor/types";

/** Keeps a card let go over an open page rail clear of it. Rails are
 * measured when a card settles, since panes and panels move them. */
export function useRailAvoidance(layerRef: RefObject<HTMLElement | null>) {
  return useCallback(
    (box: Box): Box => {
      const layer = layerRef.current;
      const pages = layer?.parentElement;
      if (!(layer && pages)) {
        return box;
      }
      const origin = layer.getBoundingClientRect();
      const bands = [
        ...pages.querySelectorAll<HTMLElement>(`[${PAGE_RAIL_ATTRIBUTE}]`),
      ].map((rail) => {
        const rect = rail.getBoundingClientRect();
        return {
          left: rect.left - origin.left,
          right: rect.right - origin.left,
        };
      });
      return avoidBands(box, bands, origin.width);
    },
    [layerRef]
  );
}
