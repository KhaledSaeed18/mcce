import { m, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";
import {
  HAND_DRAWN_STROKE_SECONDS,
  HAND_DRAWN_STROKE_STAGGER,
} from "@/config/motion";
import { cn } from "@/lib/utils";

interface HandDrawnStrokeProps {
  className: string;
  color: string;
  order: number;
  path: string;
  style?: CSSProperties;
  viewBox: string;
}

/** A hand-drawn mark that draws itself in once it scrolls into view, the way a pen would. */
export function HandDrawnStroke({
  className,
  color,
  order,
  path,
  style,
  viewBox,
}: HandDrawnStrokeProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute overflow-visible", className)}
      fill="none"
      preserveAspectRatio="none"
      style={style}
      viewBox={viewBox}
    >
      <m.path
        d={path}
        initial={shouldReduceMotion ? false : { pathLength: 0 }}
        stroke={color}
        strokeLinecap="round"
        strokeWidth="2"
        transition={{
          delay: order * HAND_DRAWN_STROKE_STAGGER,
          duration: HAND_DRAWN_STROKE_SECONDS,
          ease: "easeInOut",
        }}
        viewport={{ once: true }}
        whileInView={{ pathLength: 1 }}
      />
    </svg>
  );
}
