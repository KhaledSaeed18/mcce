import {
  animate,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useEffect } from "react";
import {
  SYNC_LOOP_OPACITY,
  SYNC_LOOP_OPACITY_TIMES,
  SYNC_LOOP_PROGRESS,
  SYNC_LOOP_PROGRESS_TIMES,
  SYNC_LOOP_SECONDS,
} from "@/config/sync-diagram";

export interface SyncLoop {
  opacity: MotionValue<number>;
  progress: MotionValue<number>;
}

/** Runs the sync diagram on its own clock, not on the reader's scroll position,
 * so it keeps cycling wherever the page happens to be. When motion is reduced
 * it settles on the finished state instead of cycling. */
export function useSyncLoop(): SyncLoop {
  const shouldReduceMotion = useReducedMotion();
  const progress = useMotionValue(0);
  const opacity = useMotionValue(1);

  useEffect(() => {
    if (shouldReduceMotion) {
      progress.set(1);
      opacity.set(1);
      return;
    }

    const options = {
      duration: SYNC_LOOP_SECONDS,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
    } as const;

    const runs = [
      animate(progress, [...SYNC_LOOP_PROGRESS], {
        ...options,
        times: [...SYNC_LOOP_PROGRESS_TIMES],
      }),
      animate(opacity, [...SYNC_LOOP_OPACITY], {
        ...options,
        times: [...SYNC_LOOP_OPACITY_TIMES],
      }),
    ];

    return () => {
      for (const run of runs) {
        run.stop();
      }
    };
  }, [shouldReduceMotion, progress, opacity]);

  return { opacity, progress };
}
