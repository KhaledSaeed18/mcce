import type { MotionValue } from "motion/react";
import {
  type KeyboardEvent,
  type PointerEvent,
  useCallback,
  useRef,
  useState,
} from "react";
import { positionFromDialPercent } from "@/lib/drive/hero-radio-signal";

const STEP_BY_KEY: Record<string, number> = {
  ArrowDown: -1,
  ArrowLeft: -1,
  ArrowRight: 1,
  ArrowUp: 1,
};

interface HeroRadioDialOptions {
  count: number;
  position: MotionValue<number>;
  stationIndex: number;
  tuneTo: (index: number) => void;
}

export interface HeroRadioDial {
  handlers: {
    onBlur: () => void;
    onFocus: () => void;
    onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
    onPointerDown: (event: PointerEvent<HTMLDivElement>) => void;
    onPointerEnter: () => void;
    onPointerLeave: () => void;
    onPointerMove: (event: PointerEvent<HTMLDivElement>) => void;
    onPointerUp: () => void;
  };
  /** True while the reader is on the dial, which stops the radio seeking. */
  isHeld: boolean;
}

/** Drag or arrow keys to tune. A drag moves the needle freely through the
 * static and settles on the nearest station when let go. */
export function useHeroRadioDial({
  count,
  position,
  stationIndex,
  tuneTo,
}: HeroRadioDialOptions): HeroRadioDial {
  const isDragging = useRef(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const moveTo = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const percent = ((event.clientX - rect.left) / rect.width) * 100;
      position.stop();
      position.set(positionFromDialPercent(percent, count));
    },
    [count, position]
  );

  const onPointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      isDragging.current = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      moveTo(event);
    },
    [moveTo]
  );
  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      // biome-ignore lint/suspicious/noUnnecessaryConditions: set by onPointerDown between calls, which the analyzer cannot see
      if (isDragging.current) {
        moveTo(event);
      }
    },
    [moveTo]
  );
  const onPointerUp = useCallback(() => {
    isDragging.current = false;
    tuneTo(Math.round(position.get()));
  }, [position, tuneTo]);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const step = STEP_BY_KEY[event.key];
      if (step !== undefined) {
        event.preventDefault();
        tuneTo(stationIndex + step);
      } else if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        tuneTo(event.key === "Home" ? 0 : count - 1);
      }
    },
    [count, stationIndex, tuneTo]
  );

  return {
    handlers: {
      onBlur: useCallback(() => setIsFocused(false), []),
      onFocus: useCallback(() => setIsFocused(true), []),
      onKeyDown,
      onPointerDown,
      onPointerEnter: useCallback(() => setIsHovered(true), []),
      onPointerLeave: useCallback(() => setIsHovered(false), []),
      onPointerMove,
      onPointerUp,
    },
    isHeld: isHovered || isFocused,
  };
}
