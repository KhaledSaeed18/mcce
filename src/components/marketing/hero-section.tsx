import { motion } from "motion/react";
import { HeroActions } from "@/components/marketing/hero-actions";
import { HeroNetworkGraphic } from "@/components/marketing/hero-network-graphic";
import { HeroStats } from "@/components/marketing/hero-stats";
import type { HeroStatsData } from "@/components/marketing/types";
import { Badge } from "@/components/ui/badge";
import { PROGRAM_UNIVERSITY_SHORT } from "@/config/site";

interface HeroSectionProps {
  stats: HeroStatsData;
}

export function HeroSection({ stats }: HeroSectionProps) {
  return (
    <section className="grid grid-cols-1 items-center gap-10 py-8 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-12">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6"
        initial={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.4 }}
      >
        <Badge className="w-fit gap-1.5" variant="outline">
          <span className="size-1.5 rounded-full bg-primary" />
          {PROGRAM_UNIVERSITY_SHORT} · MCCE
        </Badge>

        <h1 className="max-w-xl font-head text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          Stop digging through{" "}
          <span className="text-primary">Drive folders</span>.
        </h1>

        <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
          MCCE indexes every lecture, exam, and slide deck from both years of
          the program. Browse by semester, jump to a course, or search a file by
          name.
        </p>

        <HeroActions />
        <HeroStats stats={stats} />
      </motion.div>

      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.96 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <HeroNetworkGraphic />
      </motion.div>
    </section>
  );
}
