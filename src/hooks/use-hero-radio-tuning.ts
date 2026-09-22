import {
  animate,
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";
import { useCallback, useState } from "react";
import {
  HERO_RADIO_LOCK_STRENGTH,
  HERO_RADIO_SNAP_SPRING,
} from "@/config/hero-radio";
import {
  clampPosition,
  nearestStation,
  signalStrength,
} from "@/lib/drive/hero-radio-signal";

export interface HeroRadioTuning {
  isLocked: boolean;
  /** Where the needle is, in stations. Moves every frame, so it stays a motion value. */
  position: MotionValue<number>;
  /** The station the needle is nearest, locked or not. */
  stationIndex: number;
  tuneTo: (index: number) => void;
}

export function useHeroRadioTuning(count: number): HeroRadioTuning {
  const position = useMotionValue(0);
  const [stationIndex, setStationIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(true);

  useMotionValueEvent(position, "change", (value) => {
    setStationIndex(nearestStation(value, count));
    setIsLocked(signalStrength(value) >= HERO_RADIO_LOCK_STRENGTH);
  });

  const tuneTo = useCallback(
    (index: number) => {
      animate(position, clampPosition(index, count), HERO_RADIO_SNAP_SPRING);
    },
    [count, position]
  );

  return { isLocked, position, stationIndex, tuneTo };
}
