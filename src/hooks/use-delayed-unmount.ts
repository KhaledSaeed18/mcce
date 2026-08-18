import { useEffect, useRef, useState } from "react";

/** Keeps an overlay mounted for the length of its close animation. Motion's
 * AnimatePresence does not release its child on this version, so the exit is
 * timed here instead. */
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
