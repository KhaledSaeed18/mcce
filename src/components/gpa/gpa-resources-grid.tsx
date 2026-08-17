import { GpaExportCard } from "@/components/gpa/gpa-export-card";
import { GpaScaleTable } from "@/components/gpa/gpa-scale-table";
import { GpaStorageNote } from "@/components/gpa/gpa-storage-note";
import type { GpaTrendPoint } from "@/lib/gpa/chart";
import type { GpaSemester } from "@/lib/gpa/entries";
import type { GpaTotals, Projection, TargetOutcome } from "@/lib/gpa/types";

interface GpaResourcesGridProps {
  cumulative: GpaTotals;
  projection: Projection | null;
  semesters: GpaSemester[];
  target: TargetOutcome | null;
  targetGpa: number;
  trendPoints: GpaTrendPoint[];
}

export function GpaResourcesGrid({
  cumulative,
  projection,
  semesters,
  target,
  targetGpa,
  trendPoints,
}: GpaResourcesGridProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <GpaExportCard
        cumulative={cumulative}
        projection={projection}
        semesters={semesters}
        target={target}
        targetGpa={targetGpa}
        trend={trendPoints}
      />
      <div className="flex flex-col gap-4">
        <GpaScaleTable />
        <GpaStorageNote />
      </div>
    </div>
  );
}
