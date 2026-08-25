import { motion } from "motion/react";
import type { ReactNode } from "react";
import { HERO_DECORATION_POSITION, HERO_DRIFT } from "@/config/page-hero";

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
        {...HERO_DRIFT}
        className={`${HERO_DECORATION_POSITION} hidden ${width} lg:block dark:hidden`}
      >
        {light}
      </motion.div>
      <motion.div
        {...HERO_DRIFT}
        className={`${HERO_DECORATION_POSITION} hidden ${width} lg:dark:block`}
      >
        {dark}
      </motion.div>
    </>
  );
}
