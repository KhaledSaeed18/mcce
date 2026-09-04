import { motion, useReducedMotion } from "motion/react";
import { SYNC_STEPS } from "@/config/features";
import { DOT_GRID_BACKGROUND } from "@/config/patterns";
import { useReveal } from "@/hooks/use-reveal";
import { formatDateTime } from "@/lib/drive/format";
import type { DriveIndexStats } from "@/lib/drive/types";
import { SyncDiagram } from "./sync-diagram";

const PULSE_SECONDS = 2.4;

interface SyncSectionProps {
  stats: DriveIndexStats;
}

export function SyncSection({ stats }: SyncSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const reveal = useReveal();

  return (
    <section className="flex flex-col gap-6">
      <motion.div className="flex flex-col gap-1" {...reveal.single}>
        <h2 className="font-head text-2xl sm:text-3xl">
          Where the files come from
        </h2>
        <p className="text-muted-foreground text-sm">
          Nothing is re-hosted here. The site is an index over the program's own
          Drive.
        </p>
      </motion.div>

      <motion.div
        className="relative overflow-hidden rounded border-2 bg-card shadow-md"
        {...reveal.single}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={DOT_GRID_BACKGROUND}
        />

        <div className="relative">
          <SyncDiagram />
        </div>

        <motion.ol
          className="relative grid gap-6 p-5 sm:grid-cols-3 sm:p-6"
          {...reveal.group}
        >
          {SYNC_STEPS.map((step, index) => (
            <motion.li
              className="flex flex-col gap-2"
              key={step.title}
              {...reveal.item}
            >
              <span className="flex size-9 items-center justify-center rounded border-2 bg-primary font-head text-primary-foreground text-sm shadow-sm">
                {index + 1}
              </span>
              <h3 className="font-head text-base">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.body}</p>
            </motion.li>
          ))}
        </motion.ol>

        <div className="relative flex flex-wrap items-center gap-x-2 gap-y-1 border-t-2 bg-muted/50 px-5 py-3 text-muted-foreground text-xs sm:px-6">
          <motion.span
            animate={shouldReduceMotion ? undefined : { opacity: [1, 0.3, 1] }}
            aria-hidden="true"
            className="size-2 shrink-0 rounded-full bg-primary"
            transition={{
              duration: PULSE_SECONDS,
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
          <span className="tabular-nums">
            Last sync {formatDateTime(stats.generatedAt)} UTC
          </span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">
            {stats.fileCount} files across {stats.sourceCount} drive folders
          </span>
        </div>
      </motion.div>
    </section>
  );
}
