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

/** Nav panels open on their own, so their children pace off the panel mount
 * rather than the scroll position the reveal variants above key on. */
export const NAV_CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: "easeOut" },
    y: 0,
  },
};

export const NAV_CARD_GROUP_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.04, staggerChildren: 0.03 } },
};

/** Group panels collapse on a tween so the unmount can be timed against it. */
export const NAV_GROUP_EXIT_MS = 280;
export const NAV_GROUP_TRANSITION: Transition = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1],
};

export const NAV_SHEET_ROW_VARIANTS: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" }, x: 0 },
};

export const NAV_SHEET_GROUP_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.06, staggerChildren: 0.05 } },
};
