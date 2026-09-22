import { type MotionValue, m, useTransform } from "motion/react";
import type { HeroStation } from "@/components/marketing/types";
import type { HeroRadioDial as HeroRadioDialState } from "@/hooks/use-hero-radio-dial";
import { dialPercent } from "@/lib/drive/hero-radio-signal";
import { cn } from "@/lib/utils";

const MINOR_TICKS_PER_STATION = 3;

interface HeroRadioDialProps {
  handlers: HeroRadioDialState["handlers"];
  position: MotionValue<number>;
  stationIndex: number;
  stations: HeroStation[];
}

export function HeroRadioDial({
  handlers,
  position,
  stationIndex,
  stations,
}: HeroRadioDialProps) {
  const count = stations.length;
  const needleLeft = useTransform(
    position,
    (value) => `${dialPercent(value, count)}%`
  );
  const minorTicks = Array.from(
    { length: (count - 1) * MINOR_TICKS_PER_STATION },
    (_, index) => dialPercent((index + 1) / MINOR_TICKS_PER_STATION, count)
  );
  const station = stations[stationIndex];

  return (
    <div
      aria-label="Course tuner"
      aria-valuemax={count - 1}
      aria-valuemin={0}
      aria-valuenow={stationIndex}
      aria-valuetext={`${station.code}, ${station.name}`}
      className="relative h-16 cursor-ew-resize touch-none select-none rounded border-2 border-black bg-background outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card"
      role="slider"
      tabIndex={0}
      {...handlers}
    >
      {minorTicks.map((left) => (
        <span
          className="absolute bottom-2 h-1.5 w-px bg-foreground/30"
          key={left}
          style={{ left: `${left}%` }}
        />
      ))}
      {stations.map((item, index) => (
        <span
          className="absolute bottom-2 flex -translate-x-1/2 flex-col items-center gap-1"
          key={item.code}
          style={{ left: `${dialPercent(index, count)}%` }}
        >
          <span
            className={cn(
              "font-head text-[9px] tabular-nums transition-colors",
              index === stationIndex ? "text-primary" : "text-muted-foreground",
              index % 2 === 1 && "-translate-y-3.5"
            )}
          >
            {item.label}
          </span>
          <span className="h-3 w-0.5 bg-foreground" />
        </span>
      ))}
      <m.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-1 w-0.5 -translate-x-1/2 bg-chart-2 shadow-[0_0_0_1px_var(--background)]"
        style={{ left: needleLeft }}
      >
        <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-chart-2" />
      </m.span>
    </div>
  );
}
