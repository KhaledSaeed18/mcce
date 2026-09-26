import { type MotionValue, m, useTransform } from "motion/react";
import type { HeroStation } from "@/components/marketing/types";
import { formatSemesterLabel } from "@/lib/drive/format";
import { frequencyAt } from "@/lib/drive/hero-radio-signal";
import { cn } from "@/lib/utils";

const COURSE_PREFIX_PATTERN = /^[A-Z]+/;

interface HeroRadioReadoutProps {
  frequencies: number[];
  isLocked: boolean;
  position: MotionValue<number>;
  station: HeroStation;
}

export function HeroRadioReadout({
  frequencies,
  isLocked,
  position,
  station,
}: HeroRadioReadoutProps) {
  const frequency = useTransform(position, (value) =>
    frequencyAt(value, frequencies).toFixed(1)
  );
  const prefix = station.code.match(COURSE_PREFIX_PATTERN)?.[0] ?? "";

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-2 font-head text-white">
        <span
          className={cn(
            "text-xs transition-opacity duration-150",
            isLocked ? "opacity-100" : "opacity-0"
          )}
        >
          {prefix}
        </span>
        <m.span className="text-3xl tabular-nums leading-none tracking-tight">
          {frequency}
        </m.span>
        <span className="ml-auto text-[10px] text-white/50">
          {formatSemesterLabel(station.semester)}
        </span>
      </div>
      <p
        className={cn(
          "truncate font-head text-sm transition-colors duration-150",
          isLocked ? "text-white" : "text-white/35"
        )}
      >
        {isLocked ? station.name : "Searching the band"}
      </p>
      <p className="truncate text-[10px] text-white/55 tabular-nums">
        {isLocked
          ? [
              `${station.fileCount} files`,
              ...station.materials.map(
                (material) => `${material.count} ${material.type}`
              ),
            ].join("  /  ")
          : "no signal"}
      </p>
    </div>
  );
}
