import type { Transition, Variants } from "motion/react";

export const REVEAL_DURATION_SECONDS = 0.45;
export const REVEAL_OFFSET_PX = 16;
export const REVEAL_STAGGER_SECONDS = 0.05;

/** Fires once, slightly before the element is fully on screen, so the reveal
 * reads as part of the scroll instead of a reaction to it. */
export const REVEAL_VIEWPORT = { amount: 0.15, once: true } as const;

export const REVEAL_TRANSITION: Transition = {
  duration: REVEAL_DURATION_SECONDS,
  ease: "easeOut",
};

export const REVEAL_VARIANTS: Variants = {
  hidden: { opacity: 0, y: REVEAL_OFFSET_PX },
  visible: { opacity: 1, transition: REVEAL_TRANSITION, y: 0 },
};

/** Holds no visual state of its own: it only paces the children's reveal. */
export const REVEAL_GROUP_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: REVEAL_STAGGER_SECONDS } },
};
