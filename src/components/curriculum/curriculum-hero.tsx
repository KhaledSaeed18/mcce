import type { MotionProps } from "motion/react";
import { motion } from "motion/react";
import { CurriculumClipboard } from "@/components/curriculum/curriculum-clipboard";
import { CurriculumClipboardDark } from "@/components/curriculum/curriculum-clipboard-dark";
import { Badge } from "@/components/ui/badge";

const LEAF_DRIFT: MotionProps = {
  animate: { rotate: [0, 5, -3, 0], y: [0, -8, 0] },
  transition: {
    duration: 7,
    ease: "easeInOut",
    repeat: Number.POSITIVE_INFINITY,
  },
};

export function CurriculumHero() {
  return (
    <div className="relative">
      <motion.div
        {...LEAF_DRIFT}
        className="absolute -top-4 right-6 hidden w-40 lg:block dark:hidden"
      >
        <CurriculumClipboard />
      </motion.div>
      <motion.div
        {...LEAF_DRIFT}
        className="absolute -top-4 right-6 hidden w-40 lg:dark:block"
      >
        <CurriculumClipboardDark />
      </motion.div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.4 }}
      >
        <Badge className="w-fit gap-1.5" variant="outline">
          <span className="size-1.5 rounded-full bg-primary" />
          PLAN OF STUDY
        </Badge>

        <h1 className="max-w-3xl font-head text-3xl leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
          The full curriculum,
          <br />
          <span className="text-primary">semester by semester.</span>
        </h1>

        <p className="max-w-3xl text-base text-muted-foreground sm:text-lg">
          Every course in the MCCE program: description, objectives, credits,
          and how each one connects to the next through prerequisites and
          corequisites. Open a course to see the details, or jump straight to
          its indexed materials.
        </p>
      </motion.div>
    </div>
  );
}
