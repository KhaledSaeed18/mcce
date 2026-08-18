import { motion } from "motion/react";
import { FactCard } from "@/components/fact-card";
import {
  PROGRAM_DEPARTMENT,
  PROGRAM_DURATION_LABEL,
  PROGRAM_NAME,
  PROGRAM_OFFICIAL_URL,
  PROGRAM_UNIVERSITY,
  PROGRAM_UNIVERSITY_SHORT,
} from "@/config/site";

const FACTS: Array<{ label: string; value: string }> = [
  { label: "Program", value: `${PROGRAM_NAME} (MCCE)` },
  { label: "Department", value: PROGRAM_DEPARTMENT },
  {
    label: "University",
    value: `${PROGRAM_UNIVERSITY} (${PROGRAM_UNIVERSITY_SHORT})`,
  },
  {
    label: "Duration",
    value: `${PROGRAM_DURATION_LABEL}, coursework and a research project`,
  },
];

export function AboutInfo() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 12 }}
      transition={{ delay: 0.1, duration: 0.4 }}
    >
      <h2 className="font-head text-xl sm:text-2xl">The program</h2>

      <p className="text-sm sm:text-base">
        MCCE is the {PROGRAM_NAME}, a graduate program in the{" "}
        {PROGRAM_DEPARTMENT} at {PROGRAM_UNIVERSITY} ({PROGRAM_UNIVERSITY_SHORT}
        ). It focuses on modern communications networks and systems:
        telecommunications, data communications, network architecture, wireless
        systems, and optical networking, built on a foundation of science and
        mathematics.
      </p>

      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {FACTS.map((fact) => (
          <FactCard
            key={fact.label}
            label={fact.label}
            value={fact.value}
            valueClassName="font-medium font-sans text-sm"
          />
        ))}
      </dl>

      <p className="text-muted-foreground text-xs sm:text-sm">
        This site is an independent materials browser for the program and is not
        affiliated with or an official page of {PROGRAM_UNIVERSITY_SHORT}. See
        the{" "}
        <a
          className="underline underline-offset-2 hover:text-foreground"
          href={PROGRAM_OFFICIAL_URL}
          rel="noopener"
          target="_blank"
        >
          official program page
        </a>{" "}
        for admissions and curriculum details.
      </p>
    </motion.div>
  );
}
