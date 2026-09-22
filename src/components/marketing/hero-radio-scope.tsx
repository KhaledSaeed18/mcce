import type { MotionValue } from "motion/react";
import { useMemo } from "react";
import {
  HERO_SCOPE_GRID_COLUMNS,
  HERO_SCOPE_GRID_ROWS,
  HERO_SCOPE_HEIGHT,
  HERO_SCOPE_WIDTH,
} from "@/config/hero-radio";
import { useHeroScopeWave } from "@/hooks/use-hero-scope-wave";
import {
  buildWavePath,
  silentNoise,
  waveCycles,
} from "@/lib/drive/hero-scope-wave";

const COLUMN_LINES = Array.from(
  { length: HERO_SCOPE_GRID_COLUMNS - 1 },
  (_, index) => ((index + 1) / HERO_SCOPE_GRID_COLUMNS) * HERO_SCOPE_WIDTH
);
const ROW_LINES = Array.from(
  { length: HERO_SCOPE_GRID_ROWS - 1 },
  (_, index) => ((index + 1) / HERO_SCOPE_GRID_ROWS) * HERO_SCOPE_HEIGHT
);

interface HeroRadioScopeProps {
  fileCounts: number[];
  position: MotionValue<number>;
}

export function HeroRadioScope({ fileCounts, position }: HeroRadioScopeProps) {
  const { glowRef, traceRef } = useHeroScopeWave(position, fileCounts);
  /** The server has no frames to draw, so it ships the first station's clean wave. */
  const initialPath = useMemo(
    () =>
      buildWavePath({
        cycles: waveCycles(fileCounts[0] ?? 0),
        noise: silentNoise,
        phase: 0,
        strength: 1,
      }),
    [fileCounts]
  );

  return (
    <svg
      aria-hidden="true"
      className="h-auto w-full overflow-visible"
      viewBox={`0 0 ${HERO_SCOPE_WIDTH} ${HERO_SCOPE_HEIGHT}`}
    >
      <g className="stroke-white/10" strokeWidth={1}>
        {COLUMN_LINES.map((x) => (
          <line key={x} x1={x} x2={x} y1={0} y2={HERO_SCOPE_HEIGHT} />
        ))}
        {ROW_LINES.map((y) => (
          <line key={y} x1={0} x2={HERO_SCOPE_WIDTH} y1={y} y2={y} />
        ))}
      </g>
      <path
        className="fill-none stroke-chart-4 opacity-30"
        d={initialPath}
        ref={glowRef}
        strokeWidth={4}
      />
      <path
        className="fill-none stroke-chart-4 [filter:drop-shadow(0_0_3px_var(--chart-4))]"
        d={initialPath}
        ref={traceRef}
        strokeLinejoin="round"
        strokeWidth={1.75}
      />
    </svg>
  );
}
