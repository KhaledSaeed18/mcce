import { useCallback, useEffect, useRef, useState } from "react";

/** A file on its way into a pane to sit beside another: the page it should
 * open on, which is the one the other is on, so the two can scroll locked. */
export interface MatchArrival {
  fileId: string;
  page: number;
}

/** The arrival asked for last. It is dropped once it has been used, or once
 * its file has come and gone from the panes without being used. */
export function useMatchArrival(shownIds: (string | undefined)[]) {
  const [arrival, setArrival] = useState<MatchArrival | null>(null);
  const seenRef = useRef<boolean>(false);
  const isShown = arrival !== null && shownIds.includes(arrival.fileId);

  useEffect(() => {
    if (!arrival) {
      seenRef.current = false;
      return;
    }
    if (isShown) {
      seenRef.current = true;
    } else if (seenRef.current) {
      setArrival(null);
    }
  }, [arrival, isShown]);

  const request = useCallback(
    (fileId: string, page: number) => setArrival({ fileId, page }),
    []
  );
  const settle = useCallback(() => setArrival(null), []);

  return { arrival, request, settle };
}
