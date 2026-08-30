import type { MouseEvent } from "react";

/** Keeps a press from moving focus, so a field being typed into stays open. */
export function preventFocus(event: MouseEvent<HTMLElement>): void {
  event.preventDefault();
}
