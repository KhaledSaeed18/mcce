import { m } from "motion/react";
import { HeroActions } from "@/components/marketing/hero-actions";
import { HeroQuickLinks } from "@/components/marketing/hero-quick-links";
import { HeroRadioPanel } from "@/components/marketing/hero-radio-panel";
import { HeroStats } from "@/components/marketing/hero-stats";
import type { HeroStation } from "@/components/marketing/types";
import { Badge } from "@/components/ui/badge";
import { ENTRANCE_TRANSITION } from "@/config/motion";
import { PROGRAM_UNIVERSITY_SHORT } from "@/config/site";
import { useEntrance } from "@/hooks/use-entrance";
import { useIsServerRendered } from "@/hooks/use-is-server-rendered";
import type { DriveIndexStats } from "@/lib/drive/types";

interface HeroSectionProps {
  stations: HeroStation[];
  stats: DriveIndexStats;
}

export function HeroSection({ stations, stats }: HeroSectionProps) {
  const entrance = useEntrance();
  const isServerRendered = useIsServerRendered();

  return (
    <section className="grid grid-cols-1 items-center gap-10 py-8 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-12">
      <m.div className="flex flex-col gap-6" {...entrance}>
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
          top of the files: search across every name, a PDF editor to mark them
          up, the plan of study, GPA and tuition calculators, and a directory of
          tools for the coursework and the thesis.
        </p>

        <HeroActions />
        <HeroQuickLinks />
        <HeroStats stats={stats} />
      </m.div>

      <m.div
        animate={{ opacity: 1, scale: 1 }}
        initial={isServerRendered ? false : { opacity: 0, scale: 0.96 }}
        transition={{ ...ENTRANCE_TRANSITION, delay: 0.1 }}
      >
        <HeroRadioPanel stations={stations} />
      </m.div>
    </section>
  );
}
