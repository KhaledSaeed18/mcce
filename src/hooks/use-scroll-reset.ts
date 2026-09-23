import { type RefObject, useEffect } from "react";

/** The scroller outlives the file in it, so a newly opened file would
 * otherwise start at the offset the last one was left at. */
export function useScrollReset(
  scrollRef: RefObject<HTMLElement | null>,
  fileId: string | undefined
) {
  useEffect(() => {
    const scroller = scrollRef.current;
    if (!(scroller && fileId)) {
      return;
    }
    scroller.scrollTo({ left: 0, top: 0 });
  }, [fileId, scrollRef]);
}
