import { motion } from "motion/react";
import { useCallback } from "react";
import { KindIcon } from "@/components/drive/kind-icon";
import type { HeroSearchResult } from "@/components/marketing/types";
import {
  HERO_DIMMED_ROW_OPACITY,
  HERO_ROW_DURATION_SECONDS,
  HERO_SEARCH_FALLBACK_COLOR,
  HERO_SEARCH_KIND_COLOR,
} from "@/config/hero-search";

const ROW_VARIANTS = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

const LIFT_PX = -3;

interface HeroSearchResultRowProps {
  index: number;
  isActive: boolean;
  isDimmed: boolean;
  onHover: (index: number) => void;
  result: HeroSearchResult;
}

export function HeroSearchResultRow({
  index,
  isActive,
  isDimmed,
  onHover,
  result,
}: HeroSearchResultRowProps) {
  const color =
    HERO_SEARCH_KIND_COLOR[result.kind] ?? HERO_SEARCH_FALLBACK_COLOR;
  const handlePointerEnter = useCallback(
    () => onHover(index),
    [onHover, index]
  );

  return (
    <motion.li
      animate={{
        opacity: isDimmed ? HERO_DIMMED_ROW_OPACITY : 1,
        x: isActive ? LIFT_PX : 0,
        y: isActive ? LIFT_PX : 0,
      }}
      className="flex items-center gap-2.5 rounded border-2 bg-background px-2 py-1.5"
      onPointerEnter={handlePointerEnter}
      style={{
        boxShadow: isActive
          ? "4px 4px 0 0 var(--border)"
          : "2px 2px 0 0 var(--border)",
      }}
      transition={{ duration: HERO_ROW_DURATION_SECONDS }}
      variants={ROW_VARIANTS}
    >
      <span
        className="flex size-7 shrink-0 items-center justify-center rounded border-2"
        style={{ backgroundColor: `var(--${color})` }}
      >
        <KindIcon className="size-3.5 text-black" kind={result.kind} />
      </span>

      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate font-head text-[11px] leading-tight">
          {result.name}
        </span>
        <span className="truncate text-[9px] text-muted-foreground leading-tight">
          {result.courseCode} · {result.materialType}
        </span>
      </span>

      <motion.span
        animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.2 }}
        aria-hidden="true"
        className="h-6 w-1 shrink-0 rounded-full bg-primary"
        transition={{ duration: HERO_ROW_DURATION_SECONDS }}
      />
    </motion.li>
  );
}
