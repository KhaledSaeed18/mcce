import type { MotionProps } from "motion/react";

export const HERO_DECORATION_POSITION = "absolute -top-4 right-6";

/** The slow wander every hero illustration shares, so they read as one family. */
export const HERO_DRIFT: MotionProps = {
  animate: { rotate: [0, 5, -3, 0], y: [0, -8, 0] },
  transition: {
    duration: 7,
    ease: "easeInOut",
    repeat: Number.POSITIVE_INFINITY,
  },
};
