import { MARKUP_OVERLAY_ATTRIBUTE } from "@/config/pdf-editor";

/** Lets go of a field floating over a page, so it writes what it holds
 * before a press somewhere else closes it. */
export function blurFocusedOverlay(): void {
  const focused = document.activeElement;
  if (
    focused instanceof HTMLElement &&
    focused.closest(`[${MARKUP_OVERLAY_ATTRIBUTE}]`)
  ) {
    focused.blur();
  }
}
