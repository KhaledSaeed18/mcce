import { motion } from "motion/react";
import { FactCard } from "@/components/fact-card";
import { getProgramFacts } from "@/lib/curriculum/credits";
import type { CurriculumYear } from "@/lib/curriculum/types";

interface CurriculumOverviewProps {
  years: CurriculumYear[];
}

export function CurriculumOverview({ years }: CurriculumOverviewProps) {
  const facts = getProgramFacts(years);

  return (
    <motion.dl
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      initial={{ opacity: 0, y: 12 }}
      transition={{ delay: 0.1, duration: 0.4 }}
    >
      {facts.map((fact) => (
        <FactCard key={fact.label} label={fact.label} value={fact.value} />
      ))}
    </motion.dl>
  );
}
