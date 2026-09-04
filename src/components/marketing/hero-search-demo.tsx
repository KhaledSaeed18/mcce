import { motion } from "motion/react";
import { HeroSearchBar } from "@/components/marketing/hero-search-bar";
import { HeroSearchResultRow } from "@/components/marketing/hero-search-result";
import { HeroSearchSkeleton } from "@/components/marketing/hero-search-skeleton";
import type { HeroSearchQuery } from "@/components/marketing/types";
import { HERO_ROW_STAGGER_SECONDS } from "@/config/hero-search";
import { DOT_GRID_BACKGROUND } from "@/config/patterns";
import { useHeroSearchDemo } from "@/hooks/use-hero-search-demo";
import { cn } from "@/lib/utils";

const LIST_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: HERO_ROW_STAGGER_SECONDS } },
};

function materialTypesOf(query: HeroSearchQuery): string[] {
  return [...new Set(query.results.map((result) => result.materialType))];
}

interface HeroSearchDemoProps {
  queries: HeroSearchQuery[];
}

export function HeroSearchDemo({ queries }: HeroSearchDemoProps) {
  const {
    activeIndex,
    onHoverRow,
    onPointerEnter,
    onPointerLeave,
    phase,
    query,
    typed,
  } = useHeroSearchDemo(queries);

  const hasResults = phase === "results" || phase === "clearing";
  const activeType = query.results[activeIndex]?.materialType;

  return (
    <div
      className="relative aspect-square w-full overflow-hidden"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={DOT_GRID_BACKGROUND}
      />

      <div className="relative flex h-full flex-col gap-3 p-4">
        <HeroSearchBar phase={phase} typed={typed} />

        <div className="flex items-center justify-between font-head text-[10px] text-muted-foreground">
          <span className="tabular-nums">
            {hasResults ? `${query.total} matches` : "Searching the index"}
          </span>
          <span className="tabular-nums">
            {hasResults ? `top ${query.results.length}` : ""}
          </span>
        </div>

        <div className="flex-1">
          {hasResults ? (
            <motion.ul
              animate={phase === "clearing" ? "hidden" : "visible"}
              className="flex flex-col gap-2"
              initial="hidden"
              key={query.term}
              variants={LIST_VARIANTS}
            >
              {query.results.map((result, index) => (
                <HeroSearchResultRow
                  index={index}
                  isActive={index === activeIndex}
                  isDimmed={activeIndex >= 0 && index !== activeIndex}
                  key={`${result.courseCode}-${result.name}`}
                  onHover={onHoverRow}
                  result={result}
                />
              ))}
            </motion.ul>
          ) : (
            <HeroSearchSkeleton />
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {materialTypesOf(query).map((type) => (
            <span
              className={cn(
                "rounded border px-1.5 py-0.5 font-head text-[9px] transition-colors duration-200",
                type === activeType
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
              key={type}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
