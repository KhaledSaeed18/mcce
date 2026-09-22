import type { ReactNode } from "react";
import { HERO_CASE_STYLE } from "@/config/hero-radio";

interface HeroBaseUnitProps {
  children: ReactNode;
}

/** The desktop box the monitor stands on, with the tuner on its front panel. */
export function HeroBaseUnit({ children }: HeroBaseUnitProps) {
  return (
    <div
      className="flex flex-col gap-3 rounded-lg border-2 border-black p-3"
      style={HERO_CASE_STYLE}
    >
      <div aria-hidden="true" className="flex items-center gap-2">
        <span className="font-mono text-[9px] text-black/55">A:</span>
        <span className="relative h-2.5 w-28 rounded-sm border-2 border-black bg-neutral-900">
          <span className="absolute top-1/2 right-1 h-0.5 w-3 -translate-y-1/2 bg-white/30" />
        </span>
        <span className="size-2.5 rounded-sm border-2 border-black bg-black/15" />
        <span className="ml-auto size-2 rounded-full border border-black bg-primary" />
        <span className="font-mono text-[8px] text-black/55">HDD</span>
      </div>
      {children}
    </div>
  );
}
