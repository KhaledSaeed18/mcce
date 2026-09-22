import { m, useReducedMotion } from "motion/react";
import {
  EDITOR_PREVIEW_STROKE_SECONDS,
  EDITOR_PREVIEW_STROKE_STAGGER,
} from "@/config/features";
import { cn } from "@/lib/utils";

interface EditorPreviewStrokeProps {
  className: string;
  color: string;
  order: number;
  path: string;
  viewBox: string;
}

/** A hand-drawn mark that draws itself in once the tile scrolls into view. */
export function EditorPreviewStroke({
  className,
  color,
  order,
  path,
  viewBox,
}: EditorPreviewStrokeProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute overflow-visible", className)}
      fill="none"
      preserveAspectRatio="none"
      viewBox={viewBox}
    >
      <m.path
        d={path}
        initial={shouldReduceMotion ? false : { pathLength: 0 }}
        stroke={color}
        strokeLinecap="round"
        strokeWidth="2"
        transition={{
          delay: order * EDITOR_PREVIEW_STROKE_STAGGER,
          duration: EDITOR_PREVIEW_STROKE_SECONDS,
          ease: "easeInOut",
        }}
        viewport={{ once: true }}
        whileInView={{ pathLength: 1 }}
      />
    </svg>
  );
}
