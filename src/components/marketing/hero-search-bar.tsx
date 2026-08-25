import { SearchIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { HeroSearchPhase } from "@/hooks/use-hero-search-demo";

const CARET_BLINK_SECONDS = 1.1;

interface HeroSearchBarProps {
  phase: HeroSearchPhase;
  typed: string;
}

export function HeroSearchBar({ phase, typed }: HeroSearchBarProps) {
  const shouldReduceMotion = useReducedMotion();
  // A caret that blinks forever is motion too, so it holds still alongside the
  // characters when the reader asks for less of it.
  const isSteady =
    shouldReduceMotion || phase === "typing" || phase === "clearing";

  return (
    <div className="flex items-center gap-2 rounded border-2 bg-background px-2.5 py-2 shadow-sm">
      <SearchIcon className="size-3.5 shrink-0 text-muted-foreground" />

      <span className="flex min-w-0 flex-1 items-center font-head text-xs sm:text-sm">
        <span className="truncate">{typed}</span>
        {/* Holds still while characters land, so the caret never reads as a
         * glitch mid-word, and blinks only once the query is sitting there. */}
        <motion.span
          animate={isSteady ? { opacity: 1 } : { opacity: [1, 1, 0, 0, 1] }}
          aria-hidden="true"
          className="ml-px inline-block h-3.5 w-px shrink-0 bg-primary sm:h-4"
          transition={
            isSteady
              ? { duration: 0.1 }
              : {
                  duration: CARET_BLINK_SECONDS,
                  repeat: Number.POSITIVE_INFINITY,
                  times: [0, 0.45, 0.5, 0.95, 1],
                }
          }
        />
      </span>

      <kbd className="shrink-0 rounded border bg-muted px-1 py-0.5 font-head text-[9px] text-muted-foreground">
        ⌘K
      </kbd>
    </div>
  );
}
