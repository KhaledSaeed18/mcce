import { motion, useReducedMotion } from "motion/react";
import { MARQUEE_ITEMS } from "@/config/marquee";

const TRACK_DURATION_SECONDS = 28;
const TRACK_ITEMS = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

function MarqueeCell({ text }: { text: string }) {
  return (
    <div className="flex shrink-0 items-center gap-8">
      <span className="whitespace-nowrap font-head text-xs tracking-wide sm:text-sm">
        {text}
      </span>
      <span
        aria-hidden="true"
        className="size-2 shrink-0 rotate-45 border-2 bg-primary"
      />
    </div>
  );
}

export function SectionDivider() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-10 sm:py-14"
    >
      <div className="w-[110vw] -translate-x-[5vw] -rotate-2 border-y-2 bg-secondary text-secondary-foreground">
        <div className="overflow-hidden py-3">
          <motion.div
            animate={shouldReduceMotion ? undefined : { x: "-50%" }}
            className="flex w-max items-center gap-8"
            transition={{
              duration: TRACK_DURATION_SECONDS,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            {TRACK_ITEMS.map((text, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: TRACK_ITEMS is a static, never-reordered duplication of MARQUEE_ITEMS
              <MarqueeCell key={`${text}-${index}`} text={text} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
