import { motion } from "motion/react";
import { FaqLeaf } from "@/components/faq/faq-leaf";
import { Badge } from "@/components/ui/badge";

export function FaqHero() {
  return (
    <div className="relative">
      <FaqLeaf className="absolute -top-4 -right-4 hidden w-24 -rotate-12 lg:block" />

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.4 }}
      >
        <Badge className="w-fit gap-1.5" variant="outline">
          <span className="size-1.5 rounded-full bg-primary" />
          FAQ
        </Badge>

        <h1 className="max-w-2xl font-head text-3xl leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
          Questions, <span className="text-primary">answered.</span>
        </h1>

        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          What the program covers, and how this materials index works.
        </p>
      </motion.div>
    </div>
  );
}
