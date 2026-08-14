import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { CURRICULUM } from "@/config/curriculum";
import { getProgramFacts } from "@/lib/curriculum/credits";

const PROGRAM_FACTS = getProgramFacts(CURRICULUM);

export function ProgramGlanceSection() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="font-head text-2xl sm:text-3xl">
            The program at a glance
          </h2>
          <p className="text-muted-foreground text-sm">
            Two years of coursework, mapped out by semester.
          </p>
        </div>
        <Link
          className="inline-flex items-center gap-1.5 font-head text-sm underline underline-offset-2 hover:text-primary"
          to="/plan-of-study"
        >
          View full plan of study
          <ArrowRightIcon className="size-3.5" />
        </Link>
      </div>

      <motion.dl
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        initial={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.4 }}
      >
        {PROGRAM_FACTS.map((fact) => (
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
    </section>
  );
}
