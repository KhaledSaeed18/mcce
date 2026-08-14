import type { MotionProps } from "motion/react";
import { motion } from "motion/react";
import { AboutCap } from "@/components/about/about-cap";
import { AboutCapDark } from "@/components/about/about-cap-dark";
import { Badge } from "@/components/ui/badge";

const LEAF_DRIFT: MotionProps = {
  animate: { rotate: [0, 5, -3, 0], y: [0, -8, 0] },
  transition: {
    duration: 7,
    ease: "easeInOut",
    repeat: Number.POSITIVE_INFINITY,
  },
};

export function AboutHero() {
  return (
    <div className="relative">
      <motion.div
        {...LEAF_DRIFT}
        className="absolute -top-4 right-6 hidden w-40 lg:block dark:hidden"
      >
        <AboutCap />
      </motion.div>
      <motion.div
        {...LEAF_DRIFT}
        className="absolute -top-4 right-6 hidden w-40 lg:dark:block"
      >
        <AboutCapDark />
      </motion.div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.4 }}
      >
        <Badge className="w-fit gap-1.5" variant="outline">
          <span className="size-1.5 rounded-full bg-primary" />
          ABOUT MCCE
        </Badge>

        <h1 className="max-w-3xl font-head text-3xl leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
          A graduate program,
          <br />
          <span className="text-primary">indexed independently.</span>
        </h1>

        <p className="max-w-3xl text-base text-muted-foreground sm:text-lg">
          What MCCE covers, and why this site exists outside the official page.
        </p>
      </motion.div>
    </div>
  );
}
