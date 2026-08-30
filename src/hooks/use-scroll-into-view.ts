import { type RefObject, useEffect } from "react";

/** Keeps whatever is current in sight, without pulling it away from where it sits. */
export function useScrollIntoView(
  ref: RefObject<HTMLElement | null>,
  isActive: boolean
): void {
  useEffect(() => {
    if (isActive) {
      ref.current?.scrollIntoView({ block: "nearest" });
    }
  }, [isActive, ref]);
}
