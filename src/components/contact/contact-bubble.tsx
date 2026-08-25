import { type MotionValue, motion, useTransform } from "motion/react";
import {
  CONTACT_BUBBLE_ENTRY_SCALE,
  CONTACT_BUBBLE_RISE,
  CONTACT_BUBBLES,
  CONTACT_MARK_STROKE,
  CONTACT_SHADOW_OFFSET,
} from "@/config/contact-mark";

interface ContactBubbleProps {
  index: number;
  progress: MotionValue<number>;
}

export function ContactBubble({ index, progress }: ContactBubbleProps) {
  const bubble = CONTACT_BUBBLES[index];
  const range = [...bubble.range];
  const opacity = useTransform(progress, range, [0, 1]);
  const scale = useTransform(progress, range, [CONTACT_BUBBLE_ENTRY_SCALE, 1]);
  const y = useTransform(progress, range, [CONTACT_BUBBLE_RISE, 0]);

  return (
    <motion.g
      style={{
        opacity,
        // Motion forces transform-box: fill-box on SVG and overwrites
        // transformOrigin, so the origin has to come through originX/originY.
        // 1 is the bottom of the bubble, so it pops up off its own tail.
        originX: 0.5,
        originY: 1,
        scale,
        y,
      }}
    >
      <rect
        fill="var(--border)"
        height={bubble.height}
        rx={bubble.rx}
        width={bubble.width}
        x={bubble.x + CONTACT_SHADOW_OFFSET}
        y={bubble.y + CONTACT_SHADOW_OFFSET}
      />
      <path
        d={bubble.tail}
        fill="var(--border)"
        transform={`translate(${CONTACT_SHADOW_OFFSET}, ${CONTACT_SHADOW_OFFSET})`}
      />

      <path
        d={bubble.tail}
        fill={bubble.fill}
        stroke="var(--border)"
        strokeLinejoin="round"
        strokeWidth={CONTACT_MARK_STROKE}
      />
      <rect
        fill={bubble.fill}
        height={bubble.height}
        rx={bubble.rx}
        stroke="var(--border)"
        strokeWidth={CONTACT_MARK_STROKE}
        width={bubble.width}
        x={bubble.x}
        y={bubble.y}
      />
    </motion.g>
  );
}
