import {
  animate,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useEffect } from "react";

export interface LoopingProgress {
  durationSeconds: number;
  /** Blanks the drawing so the rewind back to rest is never seen. */
  opacity: readonly number[];
  opacityTimes: readonly number[];
  /** Drives the drawing itself, 0 at rest and 1 at the finished state. */
  progress: readonly number[];
  progressTimes: readonly number[];
}

export interface LoopingProgressValues {
  opacity: MotionValue<number>;
  progress: MotionValue<number>;
}

/** Runs a drawing on its own clock rather than the reader's scroll position.
 * When motion is reduced it settles on the finished state instead of cycling. */
export function useLoopingProgress(
  loop: LoopingProgress
): LoopingProgressValues {
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
      duration: loop.durationSeconds,
      ease: "easeInOut",
      repeat: Number.POSITIVE_INFINITY,
    } as const;

    const runs = [
      animate(progress, [...loop.progress], {
        ...options,
        times: [...loop.progressTimes],
      }),
      animate(opacity, [...loop.opacity], {
        ...options,
        times: [...loop.opacityTimes],
      }),
    ];

    return () => {
      for (const run of runs) {
        run.stop();
      }
    };
  }, [shouldReduceMotion, progress, opacity, loop]);

  return { opacity, progress };
}
