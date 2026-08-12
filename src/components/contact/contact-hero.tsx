import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

export function ContactHero() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.4 }}
    >
      <Badge className="w-fit gap-1.5" variant="outline">
        <span className="size-1.5 rounded-full bg-primary" />
        GET IN TOUCH
      </Badge>

      <h1 className="max-w-xl font-head text-3xl leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
        One person.
        <br />
        <span className="text-primary">One inbox.</span>
      </h1>

      <p className="max-w-lg text-base text-muted-foreground sm:text-lg">
        MCCE is maintained solo, outside class hours. Email gets straight
        through.
      </p>
    </motion.div>
  );
}
