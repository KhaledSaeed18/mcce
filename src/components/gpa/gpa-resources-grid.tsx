import { GpaExportCard } from "@/components/gpa/gpa-export-card";
import { GpaScaleTable } from "@/components/gpa/gpa-scale-table";
import { GpaStorageNote } from "@/components/gpa/gpa-storage-note";
import type { GpaResults } from "@/hooks/use-gpa-results";

interface GpaResourcesGridProps {
  results: GpaResults;
  targetGpa: number;
}

export function GpaResourcesGrid({
  results,
  targetGpa,
}: GpaResourcesGridProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <GpaExportCard
        contributions={results.contributions}
        cumulative={results.cumulative}
        projection={results.projection}
        semesters={results.semesters}
        target={results.target}
        targetGpa={targetGpa}
        trend={results.trendPoints}
      />
      <div className="flex flex-col gap-4">
        <GpaScaleTable />
        <GpaStorageNote />
      </div>
    </div>
  );
}
