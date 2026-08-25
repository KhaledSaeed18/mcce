import { type MotionProps, useReducedMotion } from "motion/react";
import { HERO_DRIFT } from "@/config/page-hero";

/** The wander every hero illustration shares, dropped when the reader asks for
 * less motion. The drawings inside settle on their finished state on their own,
 * so without this the page would sit still while its artwork kept moving. */
export function useHeroDrift(): MotionProps {
  const shouldReduceMotion = useReducedMotion();
  return shouldReduceMotion ? {} : HERO_DRIFT;
}
