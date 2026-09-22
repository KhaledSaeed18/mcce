import { type MotionProps, useReducedMotion } from "motion/react";
import {
  REVEAL_GROUP_VARIANTS,
  REVEAL_VARIANTS,
  REVEAL_VIEWPORT,
} from "@/config/motion";
import { useIsServerRendered } from "@/hooks/use-is-server-rendered";

export interface RevealProps {
  /** A container whose children reveal one after another. */
  group: MotionProps;
  /** A direct child of a `group` container. */
  item: MotionProps;
  /** An element that reveals on its own. */
  single: MotionProps;
}

const STATIC_REVEAL: RevealProps = { group: {}, item: {}, single: {} };

export function useReveal(): RevealProps {
  const shouldReduceMotion = useReducedMotion();
  const isServerRendered = useIsServerRendered();

  if (shouldReduceMotion || isServerRendered) {
    return STATIC_REVEAL;
  }

  return {
    group: {
      initial: "hidden",
      variants: REVEAL_GROUP_VARIANTS,
      viewport: REVEAL_VIEWPORT,
      whileInView: "visible",
    },
    item: { variants: REVEAL_VARIANTS },
    single: {
      initial: "hidden",
      variants: REVEAL_VARIANTS,
      viewport: REVEAL_VIEWPORT,
      whileInView: "visible",
    },
  };
}
