import type { ReactNode } from "react";
import { HERO_BEZEL_STYLE, HERO_CASE_STYLE } from "@/config/hero-radio";

interface HeroMonitorProps {
  children: ReactNode;
  /** Rendered under the glass, on the front of the case. */
  chin: ReactNode;
}

export function HeroMonitor({ children, chin }: HeroMonitorProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full rounded-2xl border-2 border-black p-3"
        style={HERO_CASE_STYLE}
      >
        <div className="rounded-xl p-2" style={HERO_BEZEL_STYLE}>
          {children}
        </div>
        {chin}
      </div>
      <span
        aria-hidden="true"
        className="h-3 w-20 border-black border-x-2"
        style={{ backgroundColor: HERO_BEZEL_STYLE.backgroundColor }}
      />
      <span
        aria-hidden="true"
        className="h-2.5 w-44 rounded-t-md border-2 border-black border-b-0"
        style={{ backgroundColor: HERO_CASE_STYLE.backgroundColor }}
      />
    </div>
  );
}
