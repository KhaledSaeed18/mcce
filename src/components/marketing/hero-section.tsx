import { motion } from "motion/react";
import { HeroActions } from "@/components/marketing/hero-actions";
import { HeroPanel } from "@/components/marketing/hero-panel";
import { HeroQuickLinks } from "@/components/marketing/hero-quick-links";
import { HeroStats } from "@/components/marketing/hero-stats";
import type { HeroSearchQuery } from "@/components/marketing/types";
import { Badge } from "@/components/ui/badge";
import { PROGRAM_UNIVERSITY_SHORT } from "@/config/site";
import type { DriveIndexStats } from "@/lib/drive/types";

interface HeroSectionProps {
  queries: HeroSearchQuery[];
  stats: DriveIndexStats;
}

export function HeroSection({ queries, stats }: HeroSectionProps) {
  return (
    <section className="grid grid-cols-1 items-center gap-10 py-8 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-12">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6"
        initial={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="w-fit gap-1.5" variant="outline">
            <span className="size-1.5 rounded-full bg-primary" />
            {PROGRAM_UNIVERSITY_SHORT} · MCCE
          </Badge>
        </div>

        <h1 className="max-w-xl font-head text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          The whole program, <span className="text-primary">indexed</span>.
        </h1>

        <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
          Slides, past exams, problem sets, and recordings from both years of
          MCCE, pulled straight from the program's Drive and kept in sync. On
          top of the files: search across every name, the plan of study with its
          prerequisites, and a GPA calculator on the program's scale.
        </p>

        <HeroActions />
        <HeroQuickLinks />
        <HeroStats stats={stats} />
      </motion.div>

      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.96 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <HeroPanel queries={queries} />
      </motion.div>
    </section>
  );
}
