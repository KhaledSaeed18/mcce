import { createContext, type RefObject, useContext } from "react";

const NO_SCROLLER: RefObject<HTMLDivElement | null> = { current: null };

/** The scroller a page sits in. Each pane has its own, so a page drags the
 * one it is in rather than whichever was mounted last. */
export const PageScrollerContext =
  createContext<RefObject<HTMLDivElement | null>>(NO_SCROLLER);

export function usePageScroller(): RefObject<HTMLDivElement | null> {
  return useContext(PageScrollerContext);
}
