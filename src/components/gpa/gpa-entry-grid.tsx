import { GpaClearDialog } from "@/components/gpa/gpa-clear-dialog";
import { GpaSemesterCard } from "@/components/gpa/gpa-semester-card";
import type { GpaSemester } from "@/lib/gpa/entries";
import type { GpaTotals } from "@/lib/gpa/types";

interface GpaEntryGridProps {
  onAverageChange: (code: string, average: number | null) => void;
  onReset: () => void;
  semesters: GpaSemester[];
  totals: GpaTotals[];
}

export function GpaEntryGrid({
  onAverageChange,
  onReset,
  semesters,
  totals,
}: GpaEntryGridProps) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-head text-lg sm:text-xl">Course averages</h2>
        <GpaClearDialog onConfirm={onReset} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {semesters.map((semester, index) => (
          <GpaSemesterCard
            key={semester.id}
            onAverageChange={onAverageChange}
            semester={semester}
            totals={totals[index]}
          />
        ))}
      </div>
    </section>
  );
}
