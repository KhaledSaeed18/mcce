import { m } from "motion/react";
import { FactCard } from "@/components/fact-card";
import { useEntrance } from "@/hooks/use-entrance";
import { getProgramFacts } from "@/lib/curriculum/credits";
import type { CurriculumYear } from "@/lib/curriculum/types";

interface CurriculumOverviewProps {
  years: CurriculumYear[];
}

export function CurriculumOverview({ years }: CurriculumOverviewProps) {
  const entrance = useEntrance(0.1);
  const facts = getProgramFacts(years);

  return (
    <m.dl className="grid grid-cols-2 gap-3 sm:grid-cols-4" {...entrance}>
      {facts.map((fact) => (
        <FactCard key={fact.label} label={fact.label} value={fact.value} />
      ))}
    </m.dl>
  );
}
