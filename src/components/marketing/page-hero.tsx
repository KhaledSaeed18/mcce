import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

interface PageHeroProps {
  badge: string;
  /** Anything that belongs under the description, such as a jump row. */
  children?: ReactNode;
  /** An illustration to sit top-right, from `PageHeroDecoration`. */
  decoration?: ReactNode;
  description: string;
  /** The tail of the title, carried in the primary colour. */
  highlight: string;
  title: string;
}

export function PageHero({
  badge,
  children,
  decoration,
  description,
  highlight,
  title,
}: PageHeroProps) {
  return (
    <div className="relative">
      {decoration}

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 12 }}
        transition={{ duration: 0.4 }}
      >
        <Badge className="w-fit gap-1.5" variant="outline">
          <span className="size-1.5 rounded-full bg-primary" />
          {badge}
        </Badge>

        <h1 className="max-w-3xl font-head text-3xl leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
          {title}
          <br />
          <span className="text-primary">{highlight}</span>
        </h1>

        <p className="max-w-3xl text-base text-muted-foreground sm:text-lg">
          {description}
        </p>

        {children}
      </motion.div>
    </div>
  );
}
