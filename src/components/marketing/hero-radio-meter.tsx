import { type MotionValue, useTransform } from "motion/react";
import { HeroRadioMeterBar } from "@/components/marketing/hero-radio-meter-bar";
import { HERO_RADIO_METER_BARS } from "@/config/hero-radio";
import { signalStrength } from "@/lib/drive/hero-radio-signal";

const BARS = Array.from({ length: HERO_RADIO_METER_BARS }, (_, index) => ({
  heightPercent: ((index + 1) / HERO_RADIO_METER_BARS) * 100,
  threshold: (index + 1) / (HERO_RADIO_METER_BARS + 1),
}));

interface HeroRadioMeterProps {
  position: MotionValue<number>;
}

export function HeroRadioMeter({ position }: HeroRadioMeterProps) {
  const strength = useTransform(position, signalStrength);

  return (
    <span aria-hidden="true" className="flex h-3 items-end gap-0.5">
      {BARS.map((bar) => (
        <HeroRadioMeterBar
          heightPercent={bar.heightPercent}
          key={bar.threshold}
          strength={strength}
          threshold={bar.threshold}
        />
      ))}
    </span>
  );
}
