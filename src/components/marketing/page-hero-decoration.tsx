import type { MotionProps } from "motion/react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const DRIFT: MotionProps = {
  animate: { rotate: [0, 5, -3, 0], y: [0, -8, 0] },
  transition: {
    duration: 7,
    ease: "easeInOut",
    repeat: Number.POSITIVE_INFINITY,
  },
};

interface PageHeroDecorationProps {
  dark: ReactNode;
  light: ReactNode;
  /** Width class, since the illustrations differ in aspect ratio. */
  width: string;
}

/** The drifting illustration a hero can carry, hidden below lg where there is no room. */
export function PageHeroDecoration({
  dark,
  light,
  width,
}: PageHeroDecorationProps) {
  return (
    <>
      <motion.div
        {...DRIFT}
        className={`absolute -top-4 right-6 hidden ${width} lg:block dark:hidden`}
      >
        {light}
      </motion.div>
      <motion.div
        {...DRIFT}
        className={`absolute -top-4 right-6 hidden ${width} lg:dark:block`}
      >
        {dark}
      </motion.div>
    </>
  );
}
