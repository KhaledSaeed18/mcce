import { type RefObject, useEffect } from "react";

/** Focuses and selects a field each time the request count goes up, so asking
 * to search again lands in the field with the old query ready to replace. */
export function useFocusOnRequest(
  ref: RefObject<HTMLInputElement | null>,
  request: number
) {
  useEffect(() => {
    if (request === 0) {
      return;
    }
    ref.current?.focus();
    ref.current?.select();
  }, [ref, request]);
}
