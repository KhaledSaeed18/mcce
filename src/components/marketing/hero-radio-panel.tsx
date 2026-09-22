import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { useMemo } from "react";
import { HeroBaseUnit } from "@/components/marketing/hero-base-unit";
import { HeroCrtGlass } from "@/components/marketing/hero-crt-glass";
import { HeroMonitor } from "@/components/marketing/hero-monitor";
import { HeroMonitorChin } from "@/components/marketing/hero-monitor-chin";
import { HeroRadioDial } from "@/components/marketing/hero-radio-dial";
import { HeroRadioGrille } from "@/components/marketing/hero-radio-grille";
import { HeroRadioScreen } from "@/components/marketing/hero-radio-screen";
import type { HeroStation } from "@/components/marketing/types";
import { useHeroRadioDial } from "@/hooks/use-hero-radio-dial";
import { useHeroRadioSeek } from "@/hooks/use-hero-radio-seek";
import { useHeroRadioTuning } from "@/hooks/use-hero-radio-tuning";

interface HeroRadioPanelProps {
  stations: HeroStation[];
}

export function HeroRadioPanel({ stations }: HeroRadioPanelProps) {
  const count = stations.length;
  const { isLocked, position, stationIndex, tuneTo } =
    useHeroRadioTuning(count);
  const { handlers, isHeld } = useHeroRadioDial({
    count,
    position,
    stationIndex,
    tuneTo,
  });
  useHeroRadioSeek(position, count, isHeld);
  const fileCounts = useMemo(
    () => stations.map((item) => item.fileCount),
    [stations]
  );
  const station = stations[stationIndex];

  if (!station) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <HeroMonitor
        chin={
          <HeroMonitorChin
            isLocked={isLocked}
            position={position}
            stationCount={count}
          />
        }
      >
        <HeroCrtGlass>
          <HeroRadioScreen
            fileCounts={fileCounts}
            isLocked={isLocked}
            position={position}
            station={station}
            stations={stations}
          />
        </HeroCrtGlass>
      </HeroMonitor>

      <HeroBaseUnit>
        <HeroRadioDial
          handlers={handlers}
          position={position}
          stationIndex={stationIndex}
          stations={stations}
        />
        <div className="flex items-center gap-3">
          <HeroRadioGrille />
          <Link
            className="flex h-10 shrink-0 items-center gap-1.5 rounded border-2 border-black bg-primary px-3 font-head text-black text-xs shadow-[3px_3px_0_0_rgb(0_0_0)] transition-transform hover:-translate-y-0.5"
            params={{ code: station.code }}
            to="/course/$code"
          >
            Tune in to {station.code}
            <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>
      </HeroBaseUnit>
    </div>
  );
}
