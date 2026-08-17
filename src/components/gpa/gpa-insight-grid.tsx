import { GpaContributionCard } from "@/components/gpa/gpa-contribution-card";
import { GpaProjection } from "@/components/gpa/gpa-projection";
import { GpaTargetPanel } from "@/components/gpa/gpa-target-panel";
import { GpaTrendCard } from "@/components/gpa/gpa-trend-card";
import type { GpaTrendPoint } from "@/lib/gpa/chart";
import type { CourseContribution } from "@/lib/gpa/contribution";
import type { Projection, TargetOutcome } from "@/lib/gpa/types";

interface GpaInsightGridProps {
  contributions: CourseContribution[];
  cumulativeGpa: number | null;
  onTargetChange: (targetGpa: number) => void;
  projection: Projection | null;
  target: TargetOutcome | null;
  targetGpa: number;
  trendPoints: GpaTrendPoint[];
}

export function GpaInsightGrid({
  contributions,
  cumulativeGpa,
  onTargetChange,
  projection,
  target,
  targetGpa,
  trendPoints,
}: GpaInsightGridProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <GpaTrendCard points={trendPoints} />
      <GpaContributionCard contributions={contributions} />
      <GpaProjection cumulativeGpa={cumulativeGpa} projection={projection} />
      <GpaTargetPanel
        onTargetChange={onTargetChange}
        outcome={target}
        targetGpa={targetGpa}
      />
    </div>
  );
}
