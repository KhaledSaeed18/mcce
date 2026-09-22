import { type MotionValue, m, useTransform } from "motion/react";
import { HERO_RADIO_KNOB_DEG_PER_STATION } from "@/config/hero-radio";

interface HeroRadioKnobProps {
  position: MotionValue<number>;
}

export function HeroRadioKnob({ position }: HeroRadioKnobProps) {
  const rotate = useTransform(
    position,
    (value) => value * HERO_RADIO_KNOB_DEG_PER_STATION
  );

  return (
    <m.span
      aria-hidden="true"
      className="relative flex size-9 shrink-0 items-start justify-center rounded-full border-2 border-black bg-neutral-800 shadow-[2px_2px_0_0_rgb(0_0_0/0.35)]"
      style={{ rotate }}
    >
      <span className="mt-0.5 h-2.5 w-1 rounded-full bg-primary" />
    </m.span>
  );
}
