import { type MotionValue, motion, useReducedMotion } from "motion/react";
import {
  CONTACT_DOT_CENTER_Y,
  CONTACT_DOT_PULSE_DELAY,
  CONTACT_DOT_PULSE_OPACITY,
  CONTACT_DOT_PULSE_SECONDS,
  CONTACT_DOT_RADIUS,
  CONTACT_DOT_WINDOW,
  CONTACT_DOT_X,
} from "@/config/contact-mark";
import { useStaggeredEntry } from "@/hooks/use-staggered-entry";

interface ContactTypingDotProps {
  index: number;
  progress: MotionValue<number>;
}

/** The loop pops the dot into place; the pulse then runs on its own clock, so
 * scale and opacity never fight over the same property. */
export function ContactTypingDot({ index, progress }: ContactTypingDotProps) {
  const shouldReduceMotion = useReducedMotion();
  const entry = useStaggeredEntry(progress, index, CONTACT_DOT_WINDOW);

  return (
    <motion.circle
      animate={
        shouldReduceMotion
          ? undefined
          : { opacity: [...CONTACT_DOT_PULSE_OPACITY] }
      }
      cx={CONTACT_DOT_X[index]}
      cy={CONTACT_DOT_CENTER_Y}
      fill="var(--primary-foreground)"
      r={CONTACT_DOT_RADIUS}
      style={{ scale: entry }}
      transition={{
        delay: index * CONTACT_DOT_PULSE_DELAY,
        duration: CONTACT_DOT_PULSE_SECONDS,
        repeat: Number.POSITIVE_INFINITY,
      }}
    />
  );
}
