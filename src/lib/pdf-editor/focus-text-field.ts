import { TEXT_FIELD_ATTRIBUTE } from "@/config/pdf-editor";

/** Back to the text being typed, once a toolbar control that needed the focus is done. */
export function focusTextField(): void {
  document
    .querySelector<HTMLTextAreaElement>(`[${TEXT_FIELD_ATTRIBUTE}]`)
    ?.focus({ preventScroll: true });
}
