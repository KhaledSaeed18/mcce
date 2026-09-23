import type { ReactNode } from "react";
import { HERO_GLASS_VIGNETTE, HERO_SCOPE_SCANLINES } from "@/config/hero-radio";

interface HeroCrtGlassProps {
  children: ReactNode;
}

export function HeroCrtGlass({ children }: HeroCrtGlassProps) {
  return (
    <div
      // isolate plus a compositor layer keeps Chrome clipping animated
      // children to the rounded edge instead of a square box.
      className="relative isolate overflow-hidden rounded-[18px] border-2 border-black bg-neutral-950 p-3.5 [transform:translateZ(0)]"
      style={HERO_SCOPE_SCANLINES}
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={HERO_GLASS_VIGNETTE}
      />
    </div>
  );
}
