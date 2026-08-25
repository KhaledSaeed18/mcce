import { motion } from "motion/react";
import type { ReactNode } from "react";
import { HERO_DECORATION_POSITION, HERO_DRIFT } from "@/config/page-hero";
import { useIsLargeScreen } from "@/hooks/use-is-large-screen";

interface PageHeroMotionProps {
  /** A theme-aware illustration, so it needs no light and dark variants. */
  children: ReactNode;
  /** Width class, since the illustrations differ in aspect ratio. */
  width: string;
}

/** The animated counterpart to `PageHeroDecoration`. It mounts nothing below
 * `lg`, so a phone never runs a loop it has no room to show. */
export function PageHeroMotion({ children, width }: PageHeroMotionProps) {
  const isLargeScreen = useIsLargeScreen();

  if (!isLargeScreen) {
    return null;
  }

  return (
    <motion.div
      {...HERO_DRIFT}
      className={`${HERO_DECORATION_POSITION} ${width}`}
    >
      {children}
    </motion.div>
  );
}
