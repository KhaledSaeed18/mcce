import type { MotionValue } from "motion/react";
import { useMemo } from "react";
import { HeroRadioMeter } from "@/components/marketing/hero-radio-meter";
import { HeroRadioReadout } from "@/components/marketing/hero-radio-readout";
import { HeroRadioScope } from "@/components/marketing/hero-radio-scope";
import { HeroTerminalPrompt } from "@/components/marketing/hero-terminal-prompt";
import type { HeroStation } from "@/components/marketing/types";
import { cn } from "@/lib/utils";

interface HeroRadioScreenProps {
  fileCounts: number[];
  isLocked: boolean;
  position: MotionValue<number>;
  station: HeroStation;
  stations: HeroStation[];
}

export function HeroRadioScreen({
  fileCounts,
  isLocked,
  position,
  station,
  stations,
}: HeroRadioScreenProps) {
  const frequencies = useMemo(
    () => stations.map((item) => item.frequency),
    [stations]
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between font-head text-[9px] tracking-widest">
        <span className="flex items-center gap-2 text-white/50">
          <HeroRadioMeter position={position} />
          SIGNAL
        </span>
        <span
          className={cn(
            "rounded-sm px-1.5 py-0.5 transition-colors",
            isLocked ? "bg-chart-4 text-black" : "bg-chart-2 text-black"
          )}
        >
          {isLocked ? "LOCKED" : "STATIC"}
        </span>
      </div>
      <HeroRadioScope fileCounts={fileCounts} position={position} />
      <HeroRadioReadout
        frequencies={frequencies}
        isLocked={isLocked}
        position={position}
        station={station}
      />
      <HeroTerminalPrompt code={station.code} isLocked={isLocked} />
    </div>
  );
}
