import { motion, useReducedMotion } from "motion/react";
import { ACCENT_COLORS } from "@/config/colors";
import { cn } from "@/lib/utils";

const SATELLITES = [
  { color: ACCENT_COLORS[0], x: 221, y: 71 },
  { color: ACCENT_COLORS[1], x: 371, y: 221 },
  { color: ACCENT_COLORS[2], x: 221, y: 371 },
  { color: ACCENT_COLORS[3], x: 71, y: 221 },
] as const;

const PULSE_STEP_SECONDS = 0.15;
const PULSE_DURATION_SECONDS = 0.5;
const PULSE_PAUSE_SECONDS = 0.35;
const HUB_BREATH_SECONDS = 3;

interface LoadingMarkProps {
  className?: string;
}

export function LoadingMark({ className }: LoadingMarkProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      className={cn("size-7", className)}
      viewBox="52 52 408 408"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="var(--border)" strokeLinecap="square" strokeWidth={16}>
        <line x1={256} x2={256} y1={256} y2={106} />
        <line x1={256} x2={406} y1={256} y2={256} />
        <line x1={256} x2={256} y1={256} y2={406} />
        <line x1={256} x2={106} y1={256} y2={256} />
      </g>

      {SATELLITES.map((node, index) => (
        <motion.rect
          animate={
            shouldReduceMotion
              ? undefined
              : { opacity: [0.35, 1, 0.35], scale: [1, 1.3, 1] }
          }
          fill={node.color}
          height={70}
          key={node.color}
          rx={14}
          stroke="var(--border)"
          strokeWidth={12}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  delay: index * PULSE_STEP_SECONDS,
                  duration: PULSE_DURATION_SECONDS,
                  ease: "easeInOut",
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: PULSE_PAUSE_SECONDS,
                }
          }
          width={70}
          x={node.x}
          y={node.y}
        />
      ))}

      <motion.rect
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.06, 1] }}
        fill="#ff9f1c"
        height={100}
        rx={18}
        stroke="var(--border)"
        strokeWidth={14}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: HUB_BREATH_SECONDS,
                ease: "easeInOut",
                repeat: Number.POSITIVE_INFINITY,
              }
        }
        width={100}
        x={206}
        y={206}
      />
    </svg>
  );
}
