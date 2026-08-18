import { type MotionProps, motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const MotionCard = motion.create(Card);

interface FactCardProps extends MotionProps {
  label: string;
  value: string;
  valueClassName?: string;
}

/** Renders a single element so it stays a valid direct child of a <dl>. */
export function FactCard({
  label,
  value,
  valueClassName,
  ...motionProps
}: FactCardProps) {
  return (
    <MotionCard
      className="gap-0 px-(--card-spacing)"
      size="sm"
      {...motionProps}
    >
      <dt className="text-muted-foreground text-xs uppercase tracking-wide">
        {label}
      </dt>
      <dd className={cn("font-head text-2xl", valueClassName)}>{value}</dd>
    </MotionCard>
  );
}
