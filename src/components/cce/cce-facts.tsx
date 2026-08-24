import { motion } from "motion/react";
import { FactCard } from "@/components/fact-card";
import { CCE_PROGRAMS, CENG_PROGRAM } from "@/config/cce/programs";
import { getCceCourseCount } from "@/lib/cce/credits";

const FACTS = [
  { label: "Credits", value: String(CENG_PROGRAM.credits) },
  { label: "Years", value: String(CENG_PROGRAM.years) },
  { label: "Tracks", value: String(CCE_PROGRAMS.length) },
  { label: "Courses", value: String(getCceCourseCount(CENG_PROGRAM)) },
];

export function CceFacts() {
  return (
    <motion.dl
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      initial={{ opacity: 0, y: 12 }}
      transition={{ delay: 0.1, duration: 0.4 }}
    >
      {FACTS.map((fact) => (
        <FactCard key={fact.label} label={fact.label} value={fact.value} />
      ))}
    </motion.dl>
  );
}
