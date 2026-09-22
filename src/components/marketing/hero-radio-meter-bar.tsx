import { type MotionValue, m, useTransform } from "motion/react";

const DIM_OPACITY = 0.18;

interface HeroRadioMeterBarProps {
  heightPercent: number;
  strength: MotionValue<number>;
  /** The strength at which this bar lights fully. */
  threshold: number;
}

export function HeroRadioMeterBar({
  heightPercent,
  strength,
  threshold,
}: HeroRadioMeterBarProps) {
  const opacity = useTransform(strength, (value) =>
    value >= threshold ? 1 : DIM_OPACITY
  );

  return (
    <m.span
      className="w-1 rounded-[1px] bg-chart-4"
      style={{ height: `${heightPercent}%`, opacity }}
    />
  );
}
