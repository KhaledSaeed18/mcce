import { RAIL_POSITION_ATTRIBUTE } from "@/config/pdf-editor";

/** Which page a thumbnail stands for, when the element is part of one at all. */
export function readRailPosition(target: EventTarget | null): number | null {
  if (!(target instanceof Element)) {
    return null;
  }
  const position = target
    .closest(`[${RAIL_POSITION_ATTRIBUTE}]`)
    ?.getAttribute(RAIL_POSITION_ATTRIBUTE);
  return position ? Number(position) : null;
}

/** The gap between thumbnails the pointer is nearest, in the list as it stands. */
export function readInsertAt(root: HTMLElement, clientY: number): number {
  const items = root.querySelectorAll(`[${RAIL_POSITION_ATTRIBUTE}]`);
  let insertAt = 0;
  for (const item of items) {
    const rect = item.getBoundingClientRect();
    if (clientY > rect.top + rect.height / 2) {
      insertAt += 1;
    }
  }
  return insertAt;
}
