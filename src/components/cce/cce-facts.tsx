import { m } from "motion/react";
import { FactCard } from "@/components/fact-card";
import { CCE_PROGRAMS, CENG_PROGRAM } from "@/config/cce/programs";
import { useEntrance } from "@/hooks/use-entrance";
import { getCceCourseCount } from "@/lib/cce/credits";

const FACTS = [
  { label: "Credits", value: String(CENG_PROGRAM.credits) },
  { label: "Years", value: String(CENG_PROGRAM.years) },
  { label: "Tracks", value: String(CCE_PROGRAMS.length) },
  { label: "Courses", value: String(getCceCourseCount(CENG_PROGRAM)) },
];

export function CceFacts() {
  const entrance = useEntrance(0.1);

  return (
    <m.dl className="grid grid-cols-2 gap-3 sm:grid-cols-4" {...entrance}>
      {FACTS.map((fact) => (
        <FactCard key={fact.label} label={fact.label} value={fact.value} />
      ))}
    </m.dl>
  );
}
