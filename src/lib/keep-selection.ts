import type { MouseEvent } from "react";

/** A press on a control that acts on selected text would otherwise clear the
 * selection before the control could read it. */
export function keepSelection(event: MouseEvent) {
  event.preventDefault();
}
