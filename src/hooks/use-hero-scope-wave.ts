import {
  type MotionValue,
  useAnimationFrame,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";
import { HERO_SCOPE_PHASE_MS } from "@/config/hero-radio";
import { nearestStation, signalStrength } from "@/lib/drive/hero-radio-signal";
import {
  buildWavePath,
  silentNoise,
  waveCycles,
  whiteNoise,
} from "@/lib/drive/hero-scope-wave";

/** Redraws the scope trace every frame straight onto the SVG path, since a
 * React render per frame would be wasted work for a decorative line. The
 * previous frame is kept on a second path as phosphor afterglow. */
export function useHeroScopeWave(
  position: MotionValue<number>,
  fileCounts: number[]
) {
  const traceRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useAnimationFrame((time) => {
    const trace = traceRef.current;
    if (!trace) {
      return;
    }
    const value = position.get();
    const fileCount = fileCounts[nearestStation(value, fileCounts.length)] ?? 0;
    const previous = trace.getAttribute("d");
    if (previous) {
      glowRef.current?.setAttribute("d", previous);
    }
    trace.setAttribute(
      "d",
      buildWavePath({
        cycles: waveCycles(fileCount),
        noise: shouldReduceMotion ? silentNoise : whiteNoise,
        phase: shouldReduceMotion ? 0 : time / HERO_SCOPE_PHASE_MS,
        strength: signalStrength(value),
      })
    );
  });

  return { glowRef, traceRef };
}
