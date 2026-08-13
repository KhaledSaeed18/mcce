import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { getProgramCredits } from "@/lib/curriculum/credits";
import { flattenCourses } from "@/lib/curriculum/lookup";
import type { CurriculumYear } from "@/lib/curriculum/types";

interface CurriculumOverviewProps {
  years: CurriculumYear[];
}

export function CurriculumOverview({ years }: CurriculumOverviewProps) {
  const courses = flattenCourses(years);
  const labCount = courses.filter((course) => course.kind === "lab").length;

  const facts: Array<{ label: string; value: string }> = [
    { label: "Years", value: String(years.length) },
    { label: "Credits so far", value: String(getProgramCredits(years)) },
    { label: "Courses", value: String(courses.length - labCount) },
    { label: "Labs", value: String(labCount) },
  ];

  return (
    <motion.dl
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      initial={{ opacity: 0, y: 12 }}
      transition={{ delay: 0.1, duration: 0.4 }}
    >
      {facts.map((fact) => (
        <Card key={fact.label} size="sm">
          <CardContent>
            <dt className="text-muted-foreground text-xs uppercase tracking-wide">
              {fact.label}
            </dt>
            <dd className="font-head text-2xl">{fact.value}</dd>
          </CardContent>
        </Card>
      ))}
    </motion.dl>
  );
}
