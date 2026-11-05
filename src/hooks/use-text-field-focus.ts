import { type RefObject, useLayoutEffect, useRef } from "react";

/** Puts the caret in a field as it opens: where the reader clicked, or at the end. */
export function useTextFieldFocus(
  fieldRef: RefObject<HTMLTextAreaElement | null>,
  caret: number | undefined
): void {
  const caretRef = useRef(caret);

  useLayoutEffect(() => {
    const field = fieldRef.current;
    if (!field) {
      return;
    }
    const place = caretRef.current ?? field.value.length;
    field.focus({ preventScroll: true });
    field.setSelectionRange(place, place);
  }, [fieldRef]);
}
