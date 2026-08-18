import { useEffect, useRef, useState } from "react";

/** Keeps an overlay mounted for the length of its close animation, so the
 * element can play its exit before it leaves the tree. */
export function useDelayedUnmount(isOpen: boolean, exitMs: number) {
  const [isExiting, setIsExiting] = useState(false);
  const wasOpen = useRef(isOpen);

  useEffect(() => {
    const justClosed = wasOpen.current && !isOpen;
    wasOpen.current = isOpen;
    if (!justClosed) {
      return;
    }
    setIsExiting(true);
    const timeout = setTimeout(() => setIsExiting(false), exitMs);
    return () => clearTimeout(timeout);
  }, [isOpen, exitMs]);

  return isOpen || isExiting;
}
