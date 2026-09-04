import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import type { HeroSearchQuery } from "@/components/marketing/types";
import {
  HERO_CLEAR_MS,
  HERO_FOCUS_MS,
  HERO_HOLD_MS,
  HERO_SETTLE_MS,
  HERO_TYPE_MS,
} from "@/config/hero-search";
import { NO_ROW, useHeroSearchPointer } from "@/hooks/use-hero-search-pointer";

export type HeroSearchPhase = "typing" | "settling" | "results" | "clearing";

export interface HeroSearchDemo {
  /** The row the panel is calling out, whether the loop walked to it or the
   * reader is pointing at it. NO_ROW when nothing is called out. */
  activeIndex: number;
  onHoverRow: (index: number) => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  phase: HeroSearchPhase;
  query: HeroSearchQuery;
  typed: string;
}

/** Cycles the hero panel through a few real searches: type the term, settle,
 * reveal the rows, walk down them, then clear and move to the next term. */
export function useHeroSearchDemo(queries: HeroSearchQuery[]): HeroSearchDemo {
  const shouldReduceMotion = useReducedMotion();
  const [queryIndex, setQueryIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<HeroSearchPhase>("typing");
  const [focusIndex, setFocusIndex] = useState(NO_ROW);
  const pointer = useHeroSearchPointer();

  const query = queries[queryIndex];

  useEffect(() => {
    if (!shouldReduceMotion) {
      return;
    }
    setCharCount(queries[0].term.length);
    setPhase("results");
    setFocusIndex(0);
  }, [queries, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion || pointer.isHeld) {
      return;
    }

    const next = (delay: number, run: () => void) => {
      const timer = setTimeout(run, delay);
      return () => clearTimeout(timer);
    };

    if (phase === "typing") {
      return charCount < query.term.length
        ? next(HERO_TYPE_MS, () => setCharCount((count) => count + 1))
        : next(HERO_SETTLE_MS, () => setPhase("settling"));
    }

    if (phase === "settling") {
      return next(HERO_SETTLE_MS, () => {
        setPhase("results");
        setFocusIndex(NO_ROW);
      });
    }

    if (phase === "results") {
      return focusIndex < query.results.length - 1
        ? next(HERO_FOCUS_MS, () => setFocusIndex((index) => index + 1))
        : next(HERO_HOLD_MS, () => setPhase("clearing"));
    }

    return charCount > 0
      ? next(HERO_CLEAR_MS, () => setCharCount((count) => count - 1))
      : next(HERO_CLEAR_MS, () => {
          setQueryIndex((index) => (index + 1) % queries.length);
          setFocusIndex(NO_ROW);
          setPhase("typing");
        });
  }, [
    phase,
    charCount,
    focusIndex,
    pointer.isHeld,
    queries.length,
    shouldReduceMotion,
    query,
  ]);

  return {
    activeIndex:
      pointer.hoverIndex === NO_ROW ? focusIndex : pointer.hoverIndex,
    onHoverRow: pointer.onHoverRow,
    onPointerEnter: pointer.onPointerEnter,
    onPointerLeave: pointer.onPointerLeave,
    phase,
    query,
    typed: query.term.slice(0, charCount),
  };
}
