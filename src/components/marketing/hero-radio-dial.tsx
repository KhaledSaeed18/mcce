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
      className="bg-background focus-visible:ring-primary focus-visible:ring-offset-card relative h-16 cursor-ew-resize touch-none rounded border-2 border-black outline-none select-none focus-visible:ring-2 focus-visible:ring-offset-2"
      role="slider"
      tabIndex={0}
      {...handlers}
    >
      {minorTicks.map((left) => (
        <span
          className="bg-foreground/30 absolute bottom-2 h-1.5 w-px"
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
          <span className="bg-foreground h-3 w-0.5" />
        </span>
      ))}
      <m.span
        aria-hidden="true"
        className="bg-chart-2 pointer-events-none absolute inset-y-1 w-0.5 -translate-x-1/2 shadow-[0_0_0_1px_var(--background)]"
        style={{ left: needleLeft }}
      >
        <span className="bg-chart-2 absolute -top-1 left-1/2 size-2 -translate-x-1/2 rotate-45" />
      </m.span>
    </div>
  );
}
