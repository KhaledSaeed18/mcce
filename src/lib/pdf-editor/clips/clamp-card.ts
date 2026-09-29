import type { Box, PageSize } from "../types";

/** Keeps a card's box on the pages, above any room kept along the bottom. */
export function clampCard(box: Box, area: PageSize, bottomInset: number): Box {
  const bottom = area.height - bottomInset;
  return {
    ...box,
    x: Math.max(0, Math.min(box.x, area.width - box.width)),
    y: Math.max(0, Math.min(box.y, bottom - box.height)),
  };
}
