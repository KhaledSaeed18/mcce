import { GpaContributionCard } from "@/components/gpa/gpa-contribution-card";
import { GpaProjection } from "@/components/gpa/gpa-projection";
import { GpaTargetPanel } from "@/components/gpa/gpa-target-panel";
import { GpaTrendCard } from "@/components/gpa/gpa-trend-card";
import type { GpaResults } from "@/hooks/use-gpa-results";

interface GpaInsightGridProps {
  onTargetChange: (targetGpa: number) => void;
  results: GpaResults;
  targetGpa: number;
}

export function GpaInsightGrid({
  onTargetChange,
  results,
  targetGpa,
}: GpaInsightGridProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <GpaTrendCard points={results.trendPoints} />
      <GpaContributionCard contributions={results.contributions} />
      <GpaProjection
        cumulativeGpa={results.cumulative.gpa}
        projection={results.projection}
      />
      <GpaTargetPanel
        onTargetChange={onTargetChange}
        outcome={results.target}
        targetGpa={targetGpa}
      />
    </div>
  );
}
