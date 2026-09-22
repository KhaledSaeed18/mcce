import type { MotionValue } from "motion/react";
import { HeroRadioKnob } from "@/components/marketing/hero-radio-knob";
import { HERO_MONITOR_MODEL } from "@/config/hero-radio";
import { cn } from "@/lib/utils";

const VENT_SLOTS = ["a", "b", "c", "d"];

interface HeroMonitorChinProps {
  isLocked: boolean;
  position: MotionValue<number>;
  stationCount: number;
}

export function HeroMonitorChin({
  isLocked,
  position,
  stationCount,
}: HeroMonitorChinProps) {
  return (
    <div className="flex items-center gap-3 px-1 pt-3 text-black">
      <span className="flex flex-col leading-none">
        <span className="font-head text-[11px] tracking-tight">
          {HERO_MONITOR_MODEL}
        </span>
        <span className="font-mono text-[9px] text-black/55">
          {stationCount} ch · color
        </span>
      </span>

      <span aria-hidden="true" className="flex gap-0.5">
        {VENT_SLOTS.map((slot) => (
          <span className="h-4 w-1 rounded-full bg-black/20" key={slot} />
        ))}
      </span>

      <span className="ml-auto flex items-center gap-2 font-mono text-[8px] text-black/55">
        <span className="flex items-center gap-1">
          <span className="size-2 rounded-full border border-black bg-chart-4" />
          PWR
        </span>
        <span className="flex items-center gap-1">
          <span
            className={cn(
              "size-2 rounded-full border border-black transition-colors",
              isLocked ? "bg-chart-4" : "bg-chart-2"
            )}
          />
          SIG
        </span>
      </span>

      <HeroRadioKnob position={position} />
    </div>
  );
}
