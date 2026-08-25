import { useCallback, useState } from "react";

export const NO_ROW = -1;

export interface HeroSearchPointer {
  /** The row being pointed at, or NO_ROW. */
  hoverIndex: number;
  /** True while the reader is on the panel, which holds the loop in place. */
  isHeld: boolean;
  onHoverRow: (index: number) => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

export function useHeroSearchPointer(): HeroSearchPointer {
  const [hoverIndex, setHoverIndex] = useState(NO_ROW);
  const [isHeld, setIsHeld] = useState(false);

  const onPointerEnter = useCallback(() => setIsHeld(true), []);
  const onHoverRow = useCallback((index: number) => setHoverIndex(index), []);
  const onPointerLeave = useCallback(() => {
    setIsHeld(false);
    setHoverIndex(NO_ROW);
  }, []);

  return { hoverIndex, isHeld, onHoverRow, onPointerEnter, onPointerLeave };
}
