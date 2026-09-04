import { motion, useReducedMotion } from "motion/react";
import { HERO_SEARCH_ROW_COUNT } from "@/config/hero-search";

const PULSE_SECONDS = 0.9;
const ROW_COUNT = HERO_SEARCH_ROW_COUNT;
const ROWS = Array.from({ length: ROW_COUNT }, (_row, index) => index);
const BAR_WIDTHS = ["70%", "52%", "64%", "44%"];

export function HeroSearchSkeleton() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <ul className="flex flex-col gap-2">
      {ROWS.map((row) => (
        <motion.li
          animate={
            shouldReduceMotion ? undefined : { opacity: [0.35, 0.7, 0.35] }
          }
          className="flex items-center gap-2.5 rounded border-2 border-dashed px-2 py-1.5"
          key={row}
          transition={{
            delay: row * 0.08,
            duration: PULSE_SECONDS,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          <span className="size-7 shrink-0 rounded border-2 border-dashed" />
          <span className="flex min-w-0 flex-1 flex-col gap-1">
            <span
              className="h-2 rounded-full bg-muted-foreground/30"
              style={{ width: BAR_WIDTHS[row] }}
            />
            <span className="h-1.5 w-[30%] rounded-full bg-muted-foreground/20" />
          </span>
        </motion.li>
      ))}
    </ul>
  );
}
