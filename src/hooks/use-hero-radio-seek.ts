import { animate, type MotionValue, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import {
  HERO_RADIO_DWELL_MS,
  HERO_RADIO_SEEK_BASE_SECONDS,
  HERO_RADIO_SEEK_PER_STATION_SECONDS,
} from "@/config/hero-radio";

/** Left alone, the radio seeks from station to station on its own, passing
 * through the static between them. It stops while the reader has the dial. */
export function useHeroRadioSeek(
  position: MotionValue<number>,
  count: number,
  isHeld: boolean
): void {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || isHeld || count < 2) {
      return;
    }
    let seek: ReturnType<typeof animate> | undefined;
    const timer = window.setInterval(() => {
      const from = Math.round(position.get());
      const to = (from + 1) % count;
      seek = animate(position, to, {
        duration:
          HERO_RADIO_SEEK_BASE_SECONDS +
          Math.abs(to - from) * HERO_RADIO_SEEK_PER_STATION_SECONDS,
        ease: "easeInOut",
      });
    }, HERO_RADIO_DWELL_MS);

    return () => {
      window.clearInterval(timer);
      seek?.stop();
    };
  }, [count, isHeld, position, shouldReduceMotion]);
}
