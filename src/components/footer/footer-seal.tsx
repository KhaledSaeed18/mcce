import { motion, useReducedMotion } from "motion/react";

interface FooterSealProps {
  className?: string;
}

const PIN_SEQUENCE = [
  { id: "top-1", x1: 47, x2: 47, y1: 34, y2: 22 },
  { id: "top-2", x1: 60, x2: 60, y1: 34, y2: 22 },
  { id: "top-3", x1: 73, x2: 73, y1: 34, y2: 22 },
  { id: "right-1", x1: 86, x2: 98, y1: 47, y2: 47 },
  { id: "right-2", x1: 86, x2: 98, y1: 60, y2: 60 },
  { id: "right-3", x1: 86, x2: 98, y1: 73, y2: 73 },
  { id: "bottom-1", x1: 73, x2: 73, y1: 86, y2: 98 },
  { id: "bottom-2", x1: 60, x2: 60, y1: 86, y2: 98 },
  { id: "bottom-3", x1: 47, x2: 47, y1: 86, y2: 98 },
  { id: "left-1", x1: 34, x2: 22, y1: 73, y2: 73 },
  { id: "left-2", x1: 34, x2: 22, y1: 60, y2: 60 },
  { id: "left-3", x1: 34, x2: 22, y1: 47, y2: 47 },
] as const;

const PIN_PULSE_COLOR = "var(--primary)";
const PULSE_STEP_SECONDS = 0.1;
const PULSE_DURATION_SECONDS = 0.6;
const PULSE_PAUSE_SECONDS = 1;

export function FooterSeal({ className }: FooterSealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={60}
        cy={60}
        fill="var(--card)"
        r={54}
        stroke="var(--border)"
        strokeWidth={5}
      />

      {/* Static so the theme color stays live; Motion bakes CSS vars to a fixed value once animated. */}
      <g stroke="var(--border)" strokeLinecap="square" strokeWidth={5}>
        {PIN_SEQUENCE.map((pin) => (
          <line key={pin.id} x1={pin.x1} x2={pin.x2} y1={pin.y1} y2={pin.y2} />
        ))}
      </g>

      <g stroke={PIN_PULSE_COLOR} strokeLinecap="square" strokeWidth={5}>
        {PIN_SEQUENCE.map((pin, index) => (
          <motion.line
            animate={shouldReduceMotion ? undefined : { opacity: [0, 1, 0] }}
            key={pin.id}
            opacity={0}
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
            x1={pin.x1}
            x2={pin.x2}
            y1={pin.y1}
            y2={pin.y2}
          />
        ))}
      </g>

      <rect
        fill="var(--primary)"
        height={52}
        rx={5}
        stroke="var(--border)"
        strokeWidth={6}
        width={52}
        x={34}
        y={34}
      />
      <rect
        fill="var(--card)"
        height={28}
        rx={2}
        stroke="var(--border)"
        strokeWidth={4}
        width={28}
        x={46}
        y={46}
      />
    </svg>
  );
}
