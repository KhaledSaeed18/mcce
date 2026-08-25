import { motion } from "motion/react";
import type { ReactNode } from "react";
import { HERO_DECORATION_POSITION } from "@/config/page-hero";
import { useHeroDrift } from "@/hooks/use-hero-drift";

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
  const drift = useHeroDrift();

  return (
    <>
      <motion.div
        {...drift}
        className={`${HERO_DECORATION_POSITION} hidden ${width} lg:block dark:hidden`}
      >
        {light}
      </motion.div>
      <motion.div
        {...drift}
        className={`${HERO_DECORATION_POSITION} hidden ${width} lg:dark:block`}
      >
        {dark}
      </motion.div>
    </>
  );
}
