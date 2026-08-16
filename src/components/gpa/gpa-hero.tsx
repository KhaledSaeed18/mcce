import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { MCCE_DEGREE_CREDITS } from "@/config/gpa";

export function GpaHero() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.4 }}
    >
      <Badge className="w-fit gap-1.5" variant="outline">
        <span className="size-1.5 rounded-full bg-primary" />
        GPA CALCULATOR
      </Badge>

      <h1 className="max-w-3xl font-head text-3xl leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
        Your grades,
        <br />
        <span className="text-primary">and where they land you.</span>
      </h1>

      <p className="max-w-3xl text-base text-muted-foreground sm:text-lg">
        Type a course average and everything else follows: semester GPA,
        cumulative GPA, academic standing, and the highest final GPA still
        within reach across all {MCCE_DEGREE_CREDITS} credits. Grades stay on
        this device.
      </p>
    </motion.div>
  );
}
